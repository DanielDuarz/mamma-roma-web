"use client";

import React, { useState, useRef, useEffect } from "react";
import { Upload, Check, AlertCircle, Loader2, Image as ImageIcon, X, RefreshCw } from "lucide-react";

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  previewHeight?: string;
}

async function optimizeImageForUpload(file: File): Promise<File> {
  // If SVG or GIF, keep as-is (SVGs are vector, GIFs are animated)
  if (file.type === "image/svg+xml" || file.type === "image/gif") {
    return file;
  }

  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const MAX_DIM = 1920;
      let { width, height } = img;
      if (width > MAX_DIM || height > MAX_DIM) {
        if (width > height) {
          height = Math.round((height * MAX_DIM) / width);
          width = MAX_DIM;
        } else {
          width = Math.round((width * MAX_DIM) / height);
          height = MAX_DIM;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return resolve(file);
      }
      ctx.drawImage(img, 0, 0, width, height);

      // Auto-compress to WebP (supported by 97%+ browsers, 85-95% smaller than raw PNG)
      canvas.toBlob(
        (blob) => {
          if (blob && (blob.size < file.size || file.type === "image/png")) {
            const cleanName = file.name.replace(/\.[^.]+$/, ".webp");
            const optimized = new File([blob], cleanName, {
              type: "image/webp",
              lastModified: Date.now(),
            });
            resolve(optimized);
          } else {
            resolve(file);
          }
        },
        "image/webp",
        0.82
      );
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(file);
    };
    img.src = url;
  });
}

export default function ImageUploader({
  label,
  value,
  onChange,
  helperText,
  previewHeight = "h-32",
}: ImageUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [imgLoadError, setImgLoadError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setImgLoadError(false);
  }, [value]);

  const handleFileChange = async (file: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Por favor selecciona un archivo de imagen válido (JPG, PNG, WebP, etc.)");
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError("La imagen no debe superar los 15MB");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadSuccess(false);
    setImgLoadError(false);

    try {
      const fileToUpload = await optimizeImageForUpload(file);
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.url) {
        throw new Error(data.error || "Error al subir la imagen");
      }

      onChange(data.url);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setUploadError(err instanceof Error ? err.message : "Error al subir la imagen");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300">
          {label}
        </label>
        {uploadSuccess && (
          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 animate-fade-in">
            <Check className="w-3.5 h-3.5" /> ¡Subida exitosa!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
        {/* Preview Box */}
        <div className="sm:col-span-4 relative group">
          <div
            className={`w-full ${previewHeight} rounded-xl bg-neutral-900 border-2 ${
              isDragging ? "border-emerald-500 bg-emerald-950/20" : "border-neutral-700"
            } overflow-hidden flex items-center justify-center relative transition-all`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            {value && !imgLoadError ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={value}
                  src={value}
                  alt={label}
                  className="w-full h-full object-cover"
                  onError={() => setImgLoadError(true)}
                />
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="absolute top-1.5 right-1.5 p-1 bg-black/80 hover:bg-red-600 text-white rounded-full transition opacity-0 group-hover:opacity-100 shadow"
                  title="Quitar imagen"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </>
            ) : value && imgLoadError ? (
              <div className="text-center p-2 text-amber-400 flex flex-col items-center">
                <AlertCircle className="w-5 h-5 mb-1 text-amber-400" />
                <span className="text-[10px] font-bold">Error al cargar vista</span>
                <button
                  type="button"
                  onClick={() => setImgLoadError(false)}
                  className="text-[9px] underline text-neutral-400 hover:text-white mt-1 flex items-center gap-1"
                >
                  <RefreshCw className="w-2.5 h-2.5" />
                  <span>Reintentar</span>
                </button>
              </div>
            ) : (
              <div className="text-center p-2 text-neutral-500 flex flex-col items-center">
                <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                <span className="text-[10px] font-medium">Sin imagen</span>
              </div>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center gap-2 text-white z-10">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
                <span className="text-[10px] font-semibold text-emerald-400">Subiendo...</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls & Input */}
        <div className="sm:col-span-8 space-y-2">
          {/* File Picker Button */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileChange(e.target.files[0]);
                }
              }}
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-2 px-3 bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-900 border border-neutral-600 text-neutral-100 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Subiendo y optimizando...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5 text-[#d7a53b]" />
                  <span>Subir imagen desde equipo</span>
                </>
              )}
            </button>
          </div>

          {/* Direct URL input fallback */}
          <div>
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              placeholder="o pega aquí la URL de la imagen..."
              className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded-lg text-neutral-300 text-xs font-mono focus:border-neutral-500 focus:outline-none transition"
            />
          </div>

          {helperText && (
            <p className="text-[11px] text-neutral-400 leading-normal">{helperText}</p>
          )}

          {uploadError && (
            <div className="p-2 bg-red-950/60 border border-red-800 rounded-lg text-red-300 text-xs flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{uploadError}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
