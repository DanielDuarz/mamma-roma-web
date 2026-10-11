"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { Award, Leaf, Flame, Clock } from "lucide-react";

export default function StorySection() {
  const { brandId, brand, setActiveTab } = useBrand();
  const isMammaRoma = brandId === "mamma-roma";

  const defaultStoryFallback = isMammaRoma
    ? "/images/heroes/mr-story.webp"
    : "/images/locations/sc-convenia.webp";

  const [storyImgSrc, setStoryImgSrc] = React.useState(brand.storyImage || defaultStoryFallback);

  React.useEffect(() => {
    setStoryImgSrc(brand.storyImage || defaultStoryFallback);
  }, [brand.storyImage, defaultStoryFallback]);

  const stats = isMammaRoma
    ? [
        { label: "Ingredientes Genuinos", value: "100%", icon: <Leaf className="w-5 h-5" /> },
        { label: "Sucursales Activas", value: String(brand.locations.length), icon: <Award className="w-5 h-5" /> },
        { label: "Años de Tradición", value: "15+", icon: <Clock className="w-5 h-5" /> },
        {
          label: "Conoce nuestro menú variado",
          value: "Menú Variado",
          icon: <Flame className="w-5 h-5" />,
          isLinkToMenu: true,
        },
      ]
    : [
        { label: "Fermentación Lenta", value: "72h", icon: <Clock className="w-5 h-5" /> },
        { label: "Sucursales Activas", value: String(brand.locations.length), icon: <Award className="w-5 h-5" /> },
        {
          label: "Conoce nuestro menú variado",
          value: "Menú Variado",
          icon: <Flame className="w-5 h-5" />,
          isLinkToMenu: true,
        },
        { label: "Temperatura del Horno", value: "450°C", icon: <Leaf className="w-5 h-5" /> },
      ];

  return (
    <section
      className={`py-20 border-t transition-colors duration-500 ${
        isMammaRoma
          ? "bg-white text-[#171919] border-neutral-200"
          : "bg-[#f7eedd] text-[#171919] border-[#774b1b]/30"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-neutral-100 ${
              isMammaRoma ? "border-2 border-[#171919]" : "border-2 border-[#774b1b]"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              key={storyImgSrc}
              src={storyImgSrc}
              alt={brand.storyTitle}
              width={600}
              height={450}
              loading="lazy"
              decoding="async"
              onError={() => {
                if (storyImgSrc !== defaultStoryFallback) {
                  setStoryImgSrc(defaultStoryFallback);
                }
              }}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Floating Label Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 z-10">
              <span
                className="text-xs uppercase tracking-widest font-black"
                style={{ color: isMammaRoma ? "#d7a53b" : "#f7eedd" }}
              >
                {brand.name}
              </span>
              <p className="text-white font-bold text-lg leading-tight mt-1">
                {brand.storyTitle}
              </p>
            </div>

            {/* Sette Colli Authentic Rome Passport Stamp Overlay */}
            {!isMammaRoma && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
                whileInView={{ opacity: 0.92, scale: 1, rotate: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="absolute top-4 right-4 pointer-events-none filter drop-shadow-md z-10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/icons/sc-stamp-rome.png"
                  alt="Italy Airport Arrived Rome Stamp"
                  className="w-24 sm:w-28 h-auto object-contain"
                />
              </motion.div>
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col justify-center space-y-8 text-left"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-xs uppercase tracking-widest font-extrabold"
                  style={{ color: isMammaRoma ? "#d7a53b" : "#bf241e" }}
                >
                  {brand.name}
                </span>
                {!isMammaRoma && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#bf241e]/10 text-[#bf241e] text-[11px] font-bold uppercase tracking-wider border border-[#bf241e]/20">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/icons/sc-italian-gesture.png"
                      alt="Gesto Italiano"
                      className="w-4 h-4 object-contain inline"
                    />
                    Roma en cada bocado
                  </span>
                )}
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#171919] tracking-tight leading-tight">
                {brand.storyTitle}
              </h2>
              <p className="text-neutral-700 text-base sm:text-lg leading-relaxed font-light">
                {brand.storyDescription}
              </p>
            </div>

            {/* Stats 2×2 Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                  onClick={() => {
                    if (stat.isLinkToMenu) setActiveTab("menu");
                  }}
                  className={`p-4 rounded-xl border transition-all hover:shadow-md ${
                    stat.isLinkToMenu ? "cursor-pointer group hover:scale-[1.02]" : ""
                  } ${
                    isMammaRoma
                      ? "bg-neutral-50 border-neutral-200 hover:border-[#171919]"
                      : "bg-white/60 border-[#774b1b]/20 hover:border-[#774b1b]"
                  }`}
                >
                  <div
                    className="mb-2 flex items-center justify-between"
                    style={{ color: isMammaRoma ? "#171919" : "#bf241e" }}
                  >
                    {stat.icon}
                    {stat.isLinkToMenu && (
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#d7a53b] bg-black/5 px-2 py-0.5 rounded-full">
                        Ver Carta →
                      </span>
                    )}
                  </div>
                  <span
                    className={`block font-black leading-tight ${
                      stat.isLinkToMenu ? "text-lg sm:text-xl" : "text-2xl sm:text-3xl"
                    }`}
                    style={{ color: isMammaRoma ? "#171919" : "#bf241e" }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs uppercase tracking-wider font-semibold text-neutral-500 mt-1 block">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
