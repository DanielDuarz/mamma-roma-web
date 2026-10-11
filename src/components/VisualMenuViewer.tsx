"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  MessageCircle,
  Eye,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X,
  FileText,
  Sparkles,
  BookOpen,
  ListFilter,
  Maximize2,
} from "lucide-react";
import { BrandData, VisualMenuPage } from "@/data/brandsData";

interface VisualMenuViewerProps {
  brand: BrandData;
  isMammaRoma: boolean;
}

const CATEGORY_SHORTCUTS = [
  { label: "Todas (17 págs)", page: 1 },
  { label: "Desayunos", page: 2 },
  { label: "Entradas", page: 3 },
  { label: "Carnes & Pescados", page: 4 },
  { label: "Pastas & Risottos", page: 6 },
  { label: "Pizzas", page: 9 },
  { label: "Panini & Burgers", page: 12 },
  { label: "Lunch Mamma Roma", page: 13 },
  { label: "Postres", page: 14 },
  { label: "Bebidas & Caffé", page: 15 },
  { label: "Promociones", page: 16 },
  { label: "Ubicaciones & QR", page: 17 },
];

export default function VisualMenuViewer({ brand, isMammaRoma }: VisualMenuViewerProps) {
  const visualMenu = brand.visualMenu;
  const pages = useMemo<VisualMenuPage[]>(() => {
    return visualMenu?.pages && visualMenu.pages.length > 0 ? visualMenu.pages : [];
  }, [visualMenu?.pages]);

  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"scroll" | "page">("scroll");
  const [lightboxPage, setLightboxPage] = useState<VisualMenuPage | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Smooth scroll to target page in scroll mode
  const scrollToPage = (pageNumber: number) => {
    const index = Math.max(0, Math.min(pages.length - 1, pageNumber - 1));
    if (viewMode === "scroll") {
      const el = pageRefs.current[index];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      setCurrentPageIndex(index);
    }
  };

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!lightboxPage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxPage(null);
        setZoomLevel(1);
      } else if (e.key === "ArrowRight") {
        const idx = pages.findIndex((p) => p.id === lightboxPage.id);
        if (idx < pages.length - 1) {
          setLightboxPage(pages[idx + 1]);
          setZoomLevel(1);
        }
      } else if (e.key === "ArrowLeft") {
        const idx = pages.findIndex((p) => p.id === lightboxPage.id);
        if (idx > 0) {
          setLightboxPage(pages[idx - 1]);
          setZoomLevel(1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxPage, pages]);

  const openLightbox = (page: VisualMenuPage) => {
    setLightboxPage(page);
    setZoomLevel(1);
  };

  const nextLightboxPage = () => {
    if (!lightboxPage) return;
    const idx = pages.findIndex((p) => p.id === lightboxPage.id);
    if (idx < pages.length - 1) {
      setLightboxPage(pages[idx + 1]);
      setZoomLevel(1);
    }
  };

  const prevLightboxPage = () => {
    if (!lightboxPage) return;
    const idx = pages.findIndex((p) => p.id === lightboxPage.id);
    if (idx > 0) {
      setLightboxPage(pages[idx - 1]);
      setZoomLevel(1);
    }
  };

  const orderWhatsAppUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
    `¡Hola ${brand.name}! 🍝 Deseo ordenar platillos del menú oficial. ¿Me podrían indicar los tiempos de entrega disponibles?`
  )}`;

  const pdfUrl = visualMenu?.pdfDownloadUrl || "/menu/mamma-roma-menu.pdf";

  return (
    <div className="w-full">
      {/* Visual Menu Sub-Header & Controls */}
      <div className="bg-[#171919] text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl border border-neutral-800">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-neutral-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-800 border border-neutral-700 text-[11px] font-bold text-[#d7a53b] uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d7a53b]" />
              <span>Menú Oficial en Alta Resolución • {pages.length} Páginas</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {visualMenu?.title || "Carta Oficial de Menú"}
            </h3>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-xl">
              {visualMenu?.subtitle ||
                "Explora cada página con recetas auténticas, ingredientes italianos y precios oficiales."}
            </p>
          </div>

          {/* Quick Actions (Download PDF + WhatsApp) */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={pdfUrl}
              download="Mamma-Roma-Menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-600 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
              title="Descargar versión completa en PDF"
            >
              <Download className="w-4 h-4 text-[#d7a53b]" />
              <span>Descargar PDF</span>
            </a>

            <a
              href={orderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full text-white text-xs font-bold transition flex items-center gap-2 shadow-lg"
              style={{
                backgroundColor: isMammaRoma ? "#006a34" : "#bf241e",
              }}
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Pedir por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* View Mode Switcher + Shortcuts Bar */}
        <div className="mt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Quick Jump Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs">
            <span className="text-neutral-400 font-bold uppercase text-[10px] tracking-wider pr-1 flex items-center gap-1 flex-shrink-0">
              <ListFilter className="w-3 h-3 text-[#d7a53b]" />
              <span>Ir a:</span>
            </span>
            {CATEGORY_SHORTCUTS.map((shortcut, idx) => {
              const isActive = activeCategoryIndex === idx;
              return (
                <button
                  key={shortcut.label}
                  onClick={() => {
                    setActiveCategoryIndex(idx);
                    scrollToPage(shortcut.page);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-[#d7a53b] text-[#171919] font-black shadow-sm"
                      : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white"
                  }`}
                >
                  {shortcut.label}
                </button>
              );
            })}
          </div>

          {/* Mode Switcher (Scroll vs Page-by-Page) */}
          <div className="inline-flex items-center rounded-full bg-neutral-900 p-1 border border-neutral-800 flex-shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode("scroll")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === "scroll"
                  ? "bg-neutral-700 text-white shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Continuo</span>
            </button>
            <button
              onClick={() => setViewMode("page")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                viewMode === "page"
                  ? "bg-neutral-700 text-white shadow"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Por Página</span>
            </button>
          </div>
        </div>
      </div>

      {/* CONTINUOUS SCROLL MODE */}
      {viewMode === "scroll" && (
        <div className="space-y-10 max-w-4xl mx-auto">
          {pages.map((page, idx) => (
            <div
              key={page.id}
              id={`menu-page-${page.pageNumber}`}
              ref={(el) => {
                pageRefs.current[idx] = el;
              }}
              className="group relative bg-[#121313] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl transition hover:border-[#d7a53b]/50"
            >
              {/* Header bar on each page */}
              <div className="px-5 py-3.5 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d7a53b]" />
                  <span className="text-xs font-black tracking-wider uppercase text-neutral-300">
                    Página {page.pageNumber} de {pages.length}
                  </span>
                  {page.title && (
                    <span className="hidden sm:inline text-xs text-neutral-400 font-medium">
                      • {page.title}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => openLightbox(page)}
                  className="px-3 py-1 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 transition shadow"
                >
                  <Eye className="w-3.5 h-3.5 text-[#d7a53b]" />
                  <span>Ampliar</span>
                </button>
              </div>

              {/* Page Image */}
              <div
                onClick={() => openLightbox(page)}
                className="relative cursor-pointer overflow-hidden bg-neutral-950 flex items-center justify-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={page.image}
                  alt={page.title || `Página ${page.pageNumber}`}
                  className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-[1.01]"
                  loading={idx < 2 ? "eager" : "lazy"}
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-xl">
                    <Maximize2 className="w-4 h-4 text-[#d7a53b]" />
                    <span>Hacé clic para ampliar en alta resolución</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SINGLE PAGE MODE (CAROUSEL / BOOK READER) */}
      {viewMode === "page" && pages.length > 0 && (
        <div className="max-w-4xl mx-auto">
          {/* Paginator Navigation Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <button
              onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentPageIndex === 0}
              className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-full text-white text-xs font-bold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            <div className="text-center">
              <span className="text-xs uppercase tracking-widest font-black text-neutral-800 dark:text-neutral-200">
                Página {currentPageIndex + 1} de {pages.length}
              </span>
              <p className="text-xs text-neutral-500 font-medium">
                {pages[currentPageIndex]?.title}
              </p>
            </div>

            <button
              onClick={() =>
                setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1))
              }
              disabled={currentPageIndex === pages.length - 1}
              className="px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-full text-white text-xs font-bold flex items-center gap-1 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-800 transition"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Current Page Display */}
          <div className="relative bg-[#121313] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl group">
            <div
              onClick={() => openLightbox(pages[currentPageIndex])}
              className="cursor-pointer bg-neutral-950 flex items-center justify-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={pages[currentPageIndex]?.image}
                alt={pages[currentPageIndex]?.title || `Página ${currentPageIndex + 1}`}
                className="w-full h-auto object-contain max-h-[85vh]"
              />

              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-xl">
                  <Maximize2 className="w-4 h-4 text-[#d7a53b]" />
                  <span>Hacé clic para ampliar en alta resolución</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnail Strip Below */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin">
            {pages.map((p, idx) => (
              <button
                key={p.id}
                onClick={() => setCurrentPageIndex(idx)}
                className={`relative flex-shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  currentPageIndex === idx
                    ? "border-[#d7a53b] scale-105 shadow-md"
                    : "border-neutral-700 opacity-60 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.title || `Página ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[9px] font-bold text-white text-center py-0.5">
                  {idx + 1}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxPage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6"
          >
            {/* Lightbox Top Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between pb-3 border-b border-neutral-800 text-white z-20">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-neutral-800 rounded-full text-xs font-bold text-[#d7a53b]">
                  Página {lightboxPage.pageNumber} de {pages.length}
                </span>
                <span className="text-sm font-semibold text-neutral-300 hidden sm:inline">
                  {lightboxPage.title}
                </span>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.min(2.5, z + 0.25))}
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition text-neutral-200"
                  title="Acercar (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => Math.max(1, z - 0.25))}
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition text-neutral-200"
                  title="Alejar (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel(1)}
                  className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 rounded-full text-[10px] font-bold text-neutral-300 transition"
                  title="Restablecer tamaño"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>

                <a
                  href={pdfUrl}
                  download="Mamma-Roma-Menu.pdf"
                  className="p-2 bg-neutral-800 hover:bg-neutral-700 rounded-full transition text-neutral-200 hidden sm:flex items-center justify-center"
                  title="Descargar PDF"
                >
                  <Download className="w-4 h-4 text-[#d7a53b]" />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setLightboxPage(null);
                    setZoomLevel(1);
                  }}
                  className="p-2 bg-red-600/80 hover:bg-red-600 rounded-full transition text-white ml-2"
                  title="Cerrar (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Center Content & Arrows */}
            <div className="relative flex-1 w-full max-w-6xl flex items-center justify-center overflow-auto my-2">
              {/* Prev Page Button */}
              {pages.findIndex((p) => p.id === lightboxPage.id) > 0 && (
                <button
                  type="button"
                  onClick={prevLightboxPage}
                  className="absolute left-2 sm:left-4 z-20 p-3 bg-neutral-900/80 hover:bg-[#d7a53b] hover:text-[#171919] text-white rounded-full transition shadow-xl"
                  title="Página anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Image with zoom */}
              <div
                className="transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxPage.image}
                  alt={lightboxPage.title || `Página ${lightboxPage.pageNumber}`}
                  className="max-h-[82vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
                />
              </div>

              {/* Next Page Button */}
              {pages.findIndex((p) => p.id === lightboxPage.id) < pages.length - 1 && (
                <button
                  type="button"
                  onClick={nextLightboxPage}
                  className="absolute right-2 sm:right-4 z-20 p-3 bg-neutral-900/80 hover:bg-[#d7a53b] hover:text-[#171919] text-white rounded-full transition shadow-xl"
                  title="Página siguiente"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Lightbox Footer Bar */}
            <div className="w-full max-w-6xl flex items-center justify-between pt-2 border-t border-neutral-800 text-xs text-neutral-400 z-20">
              <span className="hidden sm:inline">
                Usa las teclas de flecha izquierda/derecha para navegar • Esc para cerrar
              </span>
              <a
                href={orderWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-bold shadow"
                style={{ backgroundColor: isMammaRoma ? "#006a34" : "#bf241e" }}
              >
                <MessageCircle className="w-3.5 h-3.5 fill-white" />
                <span>Pedir este plato por WhatsApp</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
