"use client";

import React, { useEffect } from "react";
import { useBrand } from "@/context/BrandContext";
import { X, MessageCircle, ShieldCheck, Sparkles, Flame, Leaf } from "lucide-react";

export default function MenuLightbox() {
  const { lightboxItem, closeLightbox, orderViaWhatsApp, brandId } = useBrand();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    if (lightboxItem) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxItem, closeLightbox]);

  if (!lightboxItem) return null;

  const isMammaRoma = brandId === "mamma-roma";

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={closeLightbox}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border-2 border-[#171919] transition-all transform scale-100 animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
          aria-label="Cerrar ventana"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image */}
        <div className="relative w-full h-72 sm:h-80 bg-neutral-900 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxItem.image}
            alt={lightboxItem.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

          {/* Badges on image */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-[#171919] shadow">
              {lightboxItem.category}
            </span>
            {lightboxItem.badge && (
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow"
                style={{ backgroundColor: isMammaRoma ? "#e3252d" : "#bf241e" }}
              >
                {lightboxItem.badge}
              </span>
            )}
            {lightboxItem.isGlutenFree && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-600 text-white flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Sin Gluten
              </span>
            )}
            {lightboxItem.isVegetarian && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-green-700 text-white flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5" /> Vegetariano
              </span>
            )}
            {lightboxItem.isSpicy && (
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-600 text-white flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Picante
              </span>
            )}
          </div>
        </div>

        {/* Modal Details */}
        <div className="p-6 sm:p-8 space-y-4 bg-white text-[#171919]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171919]">
                {lightboxItem.name}
              </h3>
              <p className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mt-1">
                Receta e ingredientes seleccionados
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#171919]">
                Q{lightboxItem.price}
              </span>
              <span className="block text-[11px] text-neutral-500 font-medium">GTQ (Quetzales)</span>
            </div>
          </div>

          <p className="text-neutral-700 text-sm sm:text-base leading-relaxed border-t border-neutral-100 pt-3">
            {lightboxItem.description}
          </p>

          <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 flex items-center justify-between gap-4">
            <div className="text-xs text-neutral-600 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d7a53b]" />
              <span>Preparado al momento con ingredientes frescos.</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => {
                orderViaWhatsApp(lightboxItem.name, `Precio: Q${lightboxItem.price}`);
                closeLightbox();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-white shadow-lg transition-transform active:scale-95 text-sm uppercase tracking-wider"
              style={{
                backgroundColor: isMammaRoma ? "#006a34" : "#bf241e",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Pedir por WhatsApp ahora</span>
            </button>

            <button
              onClick={closeLightbox}
              className="px-6 py-3.5 rounded-full font-bold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors text-sm"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
