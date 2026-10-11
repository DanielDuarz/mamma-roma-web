"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { MessageCircle, Phone, MapPin, Calendar, Users, Briefcase, Sparkles, Check } from "lucide-react";
import { EventPackage, BranchLocation } from "@/data/brandsData";

const REEL_PHOTOS = [
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
];

export default function ContactSection() {
  const { brandId, brand } = useBrand();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const isMammaRoma = brandId === "mamma-roma";
  const carouselPhotos =
    brand.contactConfig?.carouselImages && brand.contactConfig.carouselImages.length > 0
      ? brand.contactConfig.carouselImages
      : REEL_PHOTOS;

  // Auto-rotating photo carousel background
  useEffect(() => {
    if (carouselPhotos.length <= 1) return;
    const timer = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % carouselPhotos.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [carouselPhotos.length]);

  return (
    <div className="bg-white text-[#171919] min-h-screen">
      {/* Hero Contact with Photo Reel / Carousel Background */}
      <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-[#171919] text-white py-20 px-4">
        {/* Carousel Background Images */}
        {carouselPhotos.map((photoUrl, idx) => (
          <div
            key={`${photoUrl}-${idx}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === (activePhotoIdx % carouselPhotos.length) ? "opacity-35 scale-105" : "opacity-0 scale-100"
            }`}
            style={{ transitionProperty: "opacity, transform" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoUrl}
              alt="Ambiente de restaurante"
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#171919] via-[#171919]/80 to-[#171919]/90" />

        {/* Carousel Dots */}
        {carouselPhotos.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {carouselPhotos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhotoIdx(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === (activePhotoIdx % carouselPhotos.length)
                    ? "w-8 bg-[#d7a53b]"
                    : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Foto ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Contact Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider text-[#d7a53b]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{brand.contactConfig?.heroBadge || `Atención Personalizada • ${brand.name}`}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight text-white max-w-3xl mx-auto"
          >
            {brand.contactConfig?.heroTitle || "Pongámonos en Contacto"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-xl text-neutral-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            {brand.contactConfig?.heroDescription || "Para consultas o reservaciones, escribinos o llamanos. ¡Estaremos encantados de ayudarte!"}
          </motion.p>

          {/* WhatsApp Direct CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
          >
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
                `¡Hola ${brand.name}! Me gustaría hacer una consulta / reservación.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5"
              style={{
                backgroundColor: isMammaRoma ? "#006a34" : "#bf241e",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chatear por WhatsApp</span>
            </a>

            <a
              href={`tel:${brand.phone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider bg-black hover:bg-neutral-900 border border-neutral-700 text-white shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#d7a53b]" />
              <span>{brand.phone}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Events Section: Eventos Familiares, Corporativos o Personales de Amigos */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-neutral-200">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-black text-[#e3252d]">
            {brand.contactConfig?.eventsBadge || "Celebraciones & Banquetes"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171919] mt-2 mb-4">
            {brand.contactConfig?.eventsTitle || "Eventos Familiares, Corporativos o Personales de Amigos"}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            {brand.contactConfig?.eventsDescription || "Hacé de tu fecha especial un recuerdo inolvidable con la hospitalidad italiana. Diseñamos paquetes a tu medida con menús de varios tiempos y reserva de salones exclusivos."}
          </p>
        </div>

        {/* 3 Event Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brand.eventPackages.map((pkg: EventPackage, index: number) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="bg-white rounded-2xl border-2 border-[#171919] p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-neutral-100 border border-neutral-300 flex items-center justify-center text-[#171919]">
                  {index === 0 ? (
                    <Users className="w-6 h-6 text-[#e3252d]" />
                  ) : index === 1 ? (
                    <Briefcase className="w-6 h-6 text-[#171919]" />
                  ) : (
                    <Calendar className="w-6 h-6 text-[#006a34]" />
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[#171919] tracking-tight">
                    {pkg.title}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wider text-neutral-400 mt-0.5">
                    {pkg.subtitle}
                  </p>
                </div>

                <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed">
                  {pkg.description}
                </p>

                <div className="py-2 px-3 bg-neutral-50 rounded-lg border border-neutral-200 text-xs font-semibold text-neutral-700">
                  Capacidad: <strong>{pkg.capacity}</strong>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    Incluye:
                  </span>
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                      <Check className="w-4 h-4 text-[#006a34] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <a
                  href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(
                    `¡Hola ${brand.name}! Deseo cotizar para mi evento: *${pkg.title}*.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-black hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Cotizar {pkg.title}</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Directory of Locations with Dedicated WhatsApp Button per Location */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-black text-[#006a34]">
            {brand.contactConfig?.directoryBadge || "Directorio Telefónico y WhatsApp"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171919] mt-2 mb-3">
            {brand.contactConfig?.directoryTitle || "Contacta a tu Sucursal Más Cercana"}
          </h2>
          <p className="text-neutral-600 text-sm">
            {brand.contactConfig?.directoryDescription || "Escribile directamente a los encargados de turno de cada restaurante para pedidos en mesa, reservaciones o consultas de parqueo."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {brand.locations.map((loc: BranchLocation) => (
            <div
              key={loc.id}
              className="bg-white rounded-2xl border-2 border-[#171919] p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl font-black text-[#171919]">
                    {loc.name}
                  </h3>
                  <span className="px-2.5 py-1 bg-neutral-100 rounded-md text-[11px] font-bold text-neutral-600">
                    {loc.zone}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-[#e3252d] flex-shrink-0 mt-0.5" />
                    <span>{loc.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#d7a53b] flex-shrink-0" />
                    <span>Teléfono directo: <strong>{loc.phone}</strong></span>
                  </div>
                </div>
              </div>

              {/* Dedicated WhatsApp Button per Location */}
              <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center gap-3">
                <a
                  href={`https://wa.me/${loc.whatsapp}?text=${encodeURIComponent(
                    `¡Hola equipo de ${loc.name}! Deseo consultar reservación o pedido en esta sucursal.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-full bg-[#006a34] hover:bg-[#00552a] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp {loc.name.split("-")[1] || loc.name}</span>
                </a>

                <a
                  href={`tel:${loc.phone}`}
                  className="p-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition"
                  title="Llamar directamente"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
