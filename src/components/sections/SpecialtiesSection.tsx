"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { ArrowRight, Sparkles } from "lucide-react";

export default function SpecialtiesSection() {
  const { brandId, brand, setActiveTab } = useBrand();
  const isMammaRoma = brandId === "mamma-roma";

  return (
    <section className="py-20 bg-[#171919] text-white transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-3"
          >
            <Sparkles className="w-4 h-4" style={{ color: isMammaRoma ? "#d7a53b" : "#bf241e" }} />
            <span
              className="text-xs uppercase tracking-widest font-bold"
              style={{ color: isMammaRoma ? "#d7a53b" : "#bf241e" }}
            >
              {brand.specialties.badge || (isMammaRoma ? "Tradición Artesanal" : "Maestría Pizzaiola a la Leña")}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4"
          >
            {brand.specialties.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto font-light"
          >
            {brand.specialties.subtitle}
          </motion.p>
        </div>

        {/* Alternating 2-Column Cards List */}
        <div className="space-y-12">
          {brand.specialties.items.map((item, index) => {
            const isReversed = item.reverse;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl ${
                  isMammaRoma
                    ? "bg-white text-[#171919] border-2 border-neutral-800"
                    : "bg-[#f7eedd] text-[#171919] border-2 border-[#774b1b]"
                }`}
              >
                <div
                  className={`flex flex-col ${
                    isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
                  } items-stretch min-h-[360px]`}
                >
                  {/* Text Column */}
                  <div className="flex-1 p-8 sm:p-12 lg:p-14 flex flex-col justify-center items-start text-left">
                    {item.badge && (
                      <span
                        className="mb-4 inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full text-white"
                        style={{
                          backgroundColor: isMammaRoma ? "#e3252d" : "#bf241e",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#171919] mb-4 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
                      {item.description}
                    </p>

                    {/* Button */}
                    <button
                      onClick={() => setActiveTab("menu")}
                      className="px-8 py-3.5 text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-2 group"
                      style={{
                        backgroundColor: isMammaRoma ? "#000000" : "#bf241e",
                      }}
                    >
                      <span>Ver Menú</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Image Column */}
                  <div className="flex-1 relative min-h-[260px] sm:min-h-[320px] lg:min-h-full overflow-hidden bg-neutral-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
