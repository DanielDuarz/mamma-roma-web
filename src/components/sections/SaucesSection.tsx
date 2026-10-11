"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { MessageCircle, CheckCircle2, Utensils, Sparkles, ShieldCheck } from "lucide-react";

export default function SaucesSection() {
  const { brand, orderViaWhatsApp } = useBrand();

  // Sauces are exclusive to Mamma Roma
  const sauces = brand.sauces || [];

  return (
    <section className="py-16 sm:py-24 bg-white text-[#171919]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Banner for Sauces (as in reference image 5) */}
        <div className="relative rounded-3xl overflow-hidden bg-[#171919] text-white p-8 sm:p-14 mb-20 shadow-2xl border-2 border-neutral-800">
          <div className="absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={brand.saucesBanner?.heroImage || "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=1600&q=80"}
              alt="Salsas Mamma Roma"
              className="w-full h-full object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
          </div>

          <div className="relative z-10 max-w-3xl space-y-5 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#006a34]/40 border border-[#006a34] text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{brand.saucesBanner?.badge || "Línea Exclusiva Mamma Roma"}</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              {brand.saucesBanner?.title || "Nuestra Salsa Es Un Viaje Directo Al Corazón De La Italia 🇮🇹"}
            </h2>

            <p className="text-base sm:text-xl text-neutral-300 font-light leading-relaxed max-w-2xl">
              {brand.saucesBanner?.description || "Tres salsas artesanales envasadas, un mismo compromiso: sabor 100% natural, sin preservantes, preparadas con recetas originales de la nonna."}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-bold text-neutral-300">
              {(brand.saucesBanner?.pill1 || "100% Natural") && (
                <span className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-[#006a34]" /> {brand.saucesBanner?.pill1 || "100% Natural"}
                </span>
              )}
              {(brand.saucesBanner?.pill2 || "Sin conservantes artificiales") && (
                <span className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-[#006a34]" /> {brand.saucesBanner?.pill2 || "Sin conservantes artificiales"}
                </span>
              )}
              {(brand.saucesBanner?.pill3 || "Tomates e ingredientes seleccionados") && (
                <span className="flex items-center gap-1.5 bg-neutral-900/80 px-3 py-1.5 rounded-full border border-neutral-700">
                  <CheckCircle2 className="w-4 h-4 text-[#006a34]" /> {brand.saucesBanner?.pill3 || "Tomates e ingredientes seleccionados"}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-black text-[#e3252d]">
            {brand.saucesBanner?.sectionBadge || "Llevá la experiencia Mamma Roma a tu hogar"}
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-[#171919] mt-2 mb-4">
            {brand.saucesBanner?.sectionTitle || "Los Tres Clásicos Inolvidables"}
          </h3>
          <p className="text-neutral-600 text-sm sm:text-base">
            {brand.saucesBanner?.sectionDescription || "Listas para calentar y servir sobre tus pastas favoritas, bases de pizza o antipastos caseros."}
          </p>
        </div>

        {/* Sauce Jars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sauces.map((sauce, idx) => (
            <motion.div
              key={sauce.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-2xl border-2 border-[#171919] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Image Preview with Jar presentation */}
              <div className="relative h-64 overflow-hidden bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={sauce.image}
                  alt={sauce.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute top-3 left-3 bg-[#171919] text-white px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow">
                  {sauce.netWeight}
                </div>

                <div className="absolute top-3 right-3 bg-[#e3252d] text-white px-3 py-1 rounded-full text-[11px] font-bold shadow">
                  Q{sauce.price}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-block bg-white/95 text-[#171919] text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-neutral-200">
                    {sauce.badge}
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-400">
                    {sauce.italianName}
                  </span>
                  <h4 className="text-xl font-black text-[#171919] leading-tight">
                    {sauce.name}
                  </h4>
                  <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                    {sauce.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs text-neutral-600">
                  <div className="flex items-start gap-1.5">
                    <Utensils className="w-3.5 h-3.5 text-[#006a34] flex-shrink-0 mt-0.5" />
                    <span><strong>Maridaje:</strong> {sauce.pairing}</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#d7a53b] flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2"><strong>Ingredientes:</strong> {sauce.ingredients}</span>
                  </div>
                </div>

                {/* Direct Order Button via WhatsApp */}
                <div className="pt-2">
                  <button
                    onClick={() =>
                      orderViaWhatsApp(
                        `Frasco Salsa: ${sauce.name} (${sauce.netWeight})`,
                        `Precio: Q${sauce.price}`
                      )
                    }
                    className="w-full py-3.5 px-4 rounded-full bg-[#006a34] hover:bg-[#00552a] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 group active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pedir / Más Información</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition Box */}
        <div className="mt-16 p-8 bg-neutral-50 rounded-2xl border-2 border-neutral-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <span className="font-black text-lg text-[#171919]">
              {brand.saucesBanner?.benefit1Title || "Envíos a Domicilio"}
            </span>
            <p className="text-xs text-neutral-500">
              {brand.saucesBanner?.benefit1Desc || "Llevamos tus frascos empacados con seguridad en toda la Ciudad de Guatemala."}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-black text-lg text-[#171919]">
              {brand.saucesBanner?.benefit2Title || "Presentación 400g"}
            </span>
            <p className="text-xs text-neutral-500">
              {brand.saucesBanner?.benefit2Desc || "Rinde de 3 a 4 porciones generosas de pasta italiana."}
            </p>
          </div>
          <div className="space-y-1">
            <span className="font-black text-lg text-[#171919]">
              {brand.saucesBanner?.benefit3Title || "Paquete Trilogía"}
            </span>
            <p className="text-xs text-neutral-500">
              {brand.saucesBanner?.benefit3Desc || "Pedí el combo con las tres salsas con precio promocional por WhatsApp."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
