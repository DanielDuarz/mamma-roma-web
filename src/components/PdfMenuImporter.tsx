"use client";

import React, { useState, useRef } from "react";
import { Upload, Trash2, Loader2, CheckCircle2, AlertCircle, Sparkles } from "lucide-react";
import { VisualMenuPage } from "@/data/brandsData";

interface PdfMenuImporterProps {
  brandId: string;
  brandName: string;
  onPagesGenerated: (newPages: VisualMenuPage[], pdfDownloadUrl: string) => void;
  onClearAllPages: () => void;
  hasPages: boolean;
}

interface PDFPageProxy {
  getViewport: (options: { scale: number }) => { width: number; height: number };
  render: (params: {
    canvasContext: CanvasRenderingContext2D;
    viewport: { width: number; height: number };
  }) => { promise: Promise<void> };
}

interface PDFDocumentProxy {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PDFPageProxy>;
}

interface PDFLib {
  getDocument: (options: { data: ArrayBuffer }) => { promise: Promise<PDFDocumentProxy> };
  GlobalWorkerOptions: { workerSrc: string };
}

async function loadPdfJs(): Promise<PDFLib> {
  if (typeof window === "undefined") {
    throw new Error("El procesamiento de PDF solo está disponible en el navegador.");
  }
  const win = window as unknown as { pdfjsLib?: PDFLib };
  if (win.pdfjsLib) {
    win.pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
    return win.pdfjsLib;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "/pdf.min.js";
    script.onload = () => {
      const lib = (window as unknown as { pdfjsLib?: PDFLib }).pdfjsLib;
      if (lib) {
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        resolve(lib);
      } else {
        reject(new Error("No se pudo inicializar el motor de lectura PDF."));
      }
    };
    script.onerror = () => reject(new Error("Error al cargar /pdf.min.js"));
    document.head.appendChild(script);
  });
}

export default function PdfMenuImporter({
  brandId,
  brandName,
  onPagesGenerated,
  onClearAllPages,
  hasPages,
}: PdfMenuImporterProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressText, setProgressText] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePdfSelected = async (file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      setErrorMessage("Por favor selecciona un archivo PDF válido.");
      return;
    }

    const confirmReplace = window.confirm(
      `¿Deseas procesar el archivo "${file.name}" para ${brandName}?\n\nEsto procesará automáticamente cada página, las optimizará en alta resolución y las distribuirá como la nueva carta oficial.`
    );
    if (!confirmReplace) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");
    setSuccessMessage("");
    setProgressPercent(5);
    setProgressText("Subiendo archivo PDF...");

    try {
      // 1. Upload the raw PDF to get downloadable link
      const pdfFormData = new FormData();
      pdfFormData.append("file", file);

      const pdfUploadRes = await fetch("/api/upload", {
        method: "POST",
        body: pdfFormData,
      });

      const pdfUploadData = await pdfUploadRes.json();
      const pdfDownloadUrl = pdfUploadData.url || `/menu/${brandId}-menu.pdf`;

      setProgressPercent(15);
      setProgressText("Cargando motor de lectura PDF...");

      // 2. Load pdfjs-dist via browser script
      const pdfjsLib = await loadPdfJs();

      const fileData = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: fileData });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      if (numPages === 0) {
        throw new Error("El archivo PDF no contiene ninguna página legible.");
      }

      const generatedPages: VisualMenuPage[] = [];

      // 3. Process each page sequentially
      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const percent = Math.round(15 + ((pageNum - 1) / numPages) * 80);
        setProgressPercent(percent);
        setProgressText(`Optimizando página ${pageNum} de ${numPages}...`);

        const page = await pdfDoc.getPage(pageNum);
        // Scale 2.0 for retina clarity
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement("canvas");
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          throw new Error("No se pudo inicializar el lienzo gráfico en el navegador.");
        }

        // Render PDF page to canvas
        await page.render({ canvasContext: ctx, viewport }).promise;

        // Convert canvas to WebP Blob (quality 0.90)
        const blob: Blob | null = await new Promise((resolve) =>
          canvas.toBlob(resolve, "image/webp", 0.9)
        );

        if (!blob) {
          throw new Error(`Error al procesar la imagen de la página ${pageNum}.`);
        }

        const pageFile = new File([blob], `${brandId}_page_${pageNum}_${Date.now()}.webp`, {
          type: "image/webp",
        });

        const pageFormData = new FormData();
        pageFormData.append("file", pageFile);

        const pageUploadRes = await fetch("/api/upload", {
          method: "POST",
          body: pageFormData,
        });

        const pageUploadData = await pageUploadRes.json();

        if (!pageUploadRes.ok || !pageUploadData.url) {
          throw new Error(`Error al guardar la página ${pageNum}: ${pageUploadData.error || ""}`);
        }

        generatedPages.push({
          id: `page-${brandId}-${pageNum}-${Date.now()}`,
          pageNumber: pageNum,
          title: pageNum === 1 ? "Portada del Menú" : `Página ${pageNum}`,
          category: pageNum === 1 ? "Portada" : "General",
          image: pageUploadData.url,
        });
      }

      setProgressPercent(100);
      setProgressText("¡Optimización completada!");

      onPagesGenerated(generatedPages, pdfDownloadUrl);
      setSuccessMessage(
        `¡Éxito! Se generaron y optimizaron automáticamente ${generatedPages.length} páginas para ${brandName}.`
      );

      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    } catch (err) {
      console.error(err);
      setErrorMessage(
        err instanceof Error ? err.message : "Error inesperado al procesar el archivo PDF."
      );
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleClearAll = () => {
    const confirmClear = window.confirm(
      `¿Estás seguro de que deseas borrar todas las páginas de la carta de ${brandName}?`
    );
    if (confirmClear) {
      onClearAllPages();
      setSuccessMessage(`Se han borrado todas las páginas de ${brandName}.`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    }
  };

  return (
    <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d7a53b]" />
            <span>Procesador Automático de PDF ({brandName})</span>
          </h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Sube un nuevo PDF y el sistema extraerá, optimizará y distribuirá todas las páginas en alta resolución automáticamente.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handlePdfSelected(e.target.files[0]);
              }
            }}
          />

          {/* Button to Upload New PDF */}
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-[#d7a53b] hover:bg-[#c4932d] text-[#171919] font-black text-xs rounded-xl transition shadow flex items-center gap-2 disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Procesando PDF...</span>
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                <span>Subir Nuevo PDF Completo</span>
              </>
            )}
          </button>

          {/* Button to Clear All Pages */}
          {hasPages && (
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleClearAll}
              className="px-3 py-2 bg-neutral-900 hover:bg-red-950 text-neutral-300 hover:text-red-400 border border-neutral-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 disabled:opacity-50"
              title="Borrar todas las páginas actuales"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Borrar Todo</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Processing Progress Bar */}
      {isProcessing && (
        <div className="space-y-2 p-4 bg-neutral-900 border border-neutral-800 rounded-xl animate-fade-in">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#d7a53b] flex items-center gap-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>{progressText}</span>
            </span>
            <span className="font-mono text-neutral-400">{progressPercent}%</span>
          </div>

          <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-[#d7a53b] to-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Notification */}
      {successMessage && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Error Notification */}
      {errorMessage && (
        <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-red-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
}
