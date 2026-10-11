"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { MapPin, Navigation, Phone, Clock, Star, ExternalLink } from "lucide-react";
import { BranchLocation } from "@/data/brandsData";

export default function LocationsSection() {
  const { brandId, brand } = useBrand();
  const isMammaRoma = brandId === "mamma-roma";

  return (
    <section className="py-16 sm:py-24 bg-white text-[#171919] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Exactly matching reference image 2 style) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#171919] mb-4"
          >
            Nuestros Restaurantes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-neutral-600 text-sm sm:text-base leading-relaxed"
          >
            Visítanos en cualquiera de nuestras sucursales y viví la auténtica experiencia italiana en un ambiente cálido y tradicional.
          </motion.p>
        </div>

        {/* 2x2 Grid of Branch Cards (as in reference image 2) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {brand.locations.map((loc: BranchLocation, index: number) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden border-4 border-black shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Optional Real Branch Photo Banner */}
              {loc.image && (
                <div className="relative w-full h-48 sm:h-56 bg-neutral-900 overflow-hidden border-b-2 border-black group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={loc.image}
                    alt={loc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-bold border border-white/20">
                    📸 {loc.name}
                  </span>
                </div>
              )}

              {/* Map Embed (Interactive Google Map) */}
              <div className="relative w-full h-64 sm:h-72 bg-neutral-200 border-b-4 border-black overflow-hidden">
                <iframe
                  title={`Mapa de ${loc.name}`}
                  src={loc.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter contrast-105"
                />

                {/* Rating Badge Overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border-2 border-black text-xs font-black flex items-center gap-1.5 shadow-md">
                  <Star className="w-3.5 h-3.5 fill-[#d7a53b] text-[#d7a53b]" />
                  <span>{loc.rating}</span>
                  <span className="text-neutral-500 font-medium">({loc.reviewsCount})</span>
                </div>
              </div>

              {/* Branch Content (matching typography and hierarchy of reference 2) */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5 text-center">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-black text-[#171919] tracking-tight">
                    {loc.name}
                  </h3>
                  <p className="text-sm sm:text-base font-semibold text-neutral-800">
                    {loc.address}
                  </p>
                  <p className="text-xs text-neutral-500 font-medium">
                    {loc.zone}
                  </p>
                </div>

                {/* Hours & Phone Details */}
                <div className="py-3 px-4 bg-neutral-50 rounded-xl border border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-600 text-left">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#d7a53b] flex-shrink-0" />
                    <span>{loc.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#006a34] flex-shrink-0" />
                    <a href={`tel:${loc.phone}`} className="hover:underline font-bold text-neutral-900">
                      {loc.phone}
                    </a>
                  </div>
                </div>

                {/* Navigation Action Buttons: Waze & Google Maps */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow hover:shadow-md flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-4 h-4 text-[#e3252d]" />
                    <span>Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>

                  <a
                    href={loc.wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-full bg-[#006a34] hover:bg-[#00552a] text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow hover:shadow-md flex items-center justify-center gap-2"
                    style={{
                      backgroundColor: isMammaRoma ? "#006a34" : "#774b1b",
                    }}
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Abrir en Waze</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
