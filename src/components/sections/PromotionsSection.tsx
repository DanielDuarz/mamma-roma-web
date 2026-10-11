"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { Tag, Clock, MessageCircle, Sparkles, ArrowRight, Calendar, CheckCircle2 } from "lucide-react";
import { PromotionItem } from "@/data/brandsData";

export default function PromotionsSection() {
  const { brandId, brand, setActiveTab, openLightbox } = useBrand();
  const isMammaRoma = brandId === "mamma-roma";

  const promotions = (brand.promotions || []).filter((p) => p.active !== false);

  const handleOrderPromo = (promo: PromotionItem) => {
    const text =
      promo.ctaWhatsAppMessage ||
      `¡Hola ${brand.name}! 👋 Deseo aprovechar la promoción: *${promo.title}*. ¿Me podrían brindar más información?`;
    const url = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-[#171919] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="relative rounded-3xl overflow-hidden bg-[#171919] text-white p-8 sm:p-14 mb-16 shadow-2xl border-2 border-neutral-800">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.promotionsBanner?.heroImage || brand.hero.heroImage}
              alt={brand.name}
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-4 text-left">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
              style={{ backgroundColor: isMammaRoma ? "#e3252d" : "#bf241e" }}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>{brand.promotionsBanner?.badge || "Ofertas & Novedades Exclusivas"}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white uppercase"
            >
              {brand.promotionsBanner?.title || `Promociones del Mes en ${brand.name}`}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl"
            >
              {brand.promotionsBanner?.description || (isMammaRoma
                ? "Celebra los auténticos sabores de Roma con nuestras promociones especiales: días de pasta & vino, banquetes familiares y lanzamientos culinarios exclusivos."
                : "Disfruta el auténtico fuego y la masa madre viva con nuestros 2x1 en pizzas seleccionadas, lanzamientos de autor y combos especiales de horno de leña.")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-4 text-xs text-neutral-300 font-semibold"
            >
              {(brand.promotionsBanner?.pill1 || "Disponibles para comedor & a domicilio") && (
                <span className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1 rounded-full border border-neutral-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006a34]" /> {brand.promotionsBanner?.pill1 || "Disponibles para comedor & a domicilio"}
                </span>
              )}
              {(brand.promotionsBanner?.pill2 || "Ingredientes italianos 100% auténticos") && (
                <span className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1 rounded-full border border-neutral-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#d7a53b]" /> {brand.promotionsBanner?.pill2 || "Ingredientes italianos 100% auténticos"}
                </span>
              )}
            </motion.div>
          </div>
        </div>

        {/* Promotions Grid */}
        {promotions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {promotions.map((promo, index) => (
              <motion.div
                key={promo.id || `promo-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-3xl border-2 border-neutral-800 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image Banner */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={promo.image}
                    alt={promo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                    onClick={() =>
                      openLightbox({
                        id: promo.id,
                        name: promo.title,
                        category: "Promociones",
                        description: promo.description,
                        price: 0,
                        image: promo.image,
                      })
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  {/* Top Badge */}
                  {promo.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className="px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white shadow-lg flex items-center gap-1.5"
                        style={{
                          backgroundColor: isMammaRoma ? "#e3252d" : "#bf241e",
                        }}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                        {promo.badge}
                      </span>
                    </div>
                  )}

                  {/* Validity pill */}
                  {promo.validUntil && (
                    <div className="absolute bottom-4 left-4 z-10">
                      <span className="bg-black/80 backdrop-blur-md text-neutral-200 text-xs font-medium px-3 py-1 rounded-full border border-white/20 flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-[#d7a53b]" />
                        {promo.validUntil}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    {promo.subtitle && (
                      <span className="text-xs uppercase tracking-wider font-bold text-[#d7a53b]">
                        {promo.subtitle}
                      </span>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-black text-[#171919] leading-tight">
                      {promo.title}
                    </h3>
                    <p className="text-neutral-600 text-sm sm:text-base leading-relaxed pt-1">
                      {promo.description}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => handleOrderPromo(promo)}
                      className="w-full sm:flex-1 py-3.5 px-5 rounded-full font-black text-xs uppercase tracking-wider text-white shadow-md hover:shadow-xl hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: isMammaRoma ? "#006a34" : "#bf241e",
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{promo.ctaText || "Aprovechar Promoción"}</span>
                    </button>

                    <button
                      onClick={() => setActiveTab("menu")}
                      className="w-full sm:w-auto py-3.5 px-5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Ver Menú</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-neutral-50 rounded-3xl border-2 border-dashed border-neutral-300 p-8">
            <Calendar className="w-12 h-12 mx-auto text-neutral-400 mb-3" />
            <h3 className="text-xl font-bold text-neutral-800">
              Próximamente Nuevas Promociones
            </h3>
            <p className="text-neutral-500 text-sm max-w-md mx-auto mt-2">
              Estamos preparando exquisitas promociones y sorpresas de temporada. Consulta con nuestro equipo por WhatsApp para conocer las ofertas vigentes hoy.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`¡Hola ${brand.name}! Deseo consultar las promociones vigentes hoy.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-[#006a34] text-white text-xs font-bold uppercase tracking-wider shadow"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
