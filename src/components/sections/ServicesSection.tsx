"use client";

import React from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { Utensils, Wifi, Coffee, PawPrint, Flame, Wine, Package, Trees, ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const { brandId, brand, setActiveTab } = useBrand();
  const isMammaRoma = brandId === "mamma-roma";

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "utensils":
        return <Utensils className="w-9 h-9 stroke-[1.5]" />;
      case "wifi":
        return <Wifi className="w-9 h-9 stroke-[1.5]" />;
      case "coffee":
        return <Coffee className="w-9 h-9 stroke-[1.5]" />;
      case "paw":
        return <PawPrint className="w-9 h-9 stroke-[1.5]" />;
      case "flame":
        return <Flame className="w-9 h-9 stroke-[1.5]" />;
      case "wine":
        return <Wine className="w-9 h-9 stroke-[1.5]" />;
      case "package":
        return <Package className="w-9 h-9 stroke-[1.5]" />;
      case "tree":
        return <Trees className="w-9 h-9 stroke-[1.5]" />;
      default:
        return <Utensils className="w-9 h-9 stroke-[1.5]" />;
    }
  };

  return (
    <section className="bg-white text-[#171919] transition-colors duration-300">

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-4 flex items-center justify-center gap-2"
        >
          <span
            className="text-xs uppercase tracking-widest font-black"
            style={{ color: isMammaRoma ? "#006a34" : "#bf241e" }}
          >
            {isMammaRoma ? "Experiencias en Mamma Roma" : "Experiencias en Sette Colli"}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#171919] mb-4"
        >
          Servicios y Experiencia
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-neutral-500 text-sm sm:text-base max-w-2xl mx-auto mb-16 font-light"
        >
          {isMammaRoma
            ? "Mucho más que un restaurante. Diseñado para que cada visita sea una experiencia completa."
            : "El arte del fuego y la hospitalidad italiana reunidos en un solo espacio."}
        </motion.p>

        {/* 4 Service Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-10 mb-16">
          {brand.services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="flex flex-col items-center justify-start gap-4 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:bg-neutral-50 hover:shadow-lg group cursor-default"
            >
              {/* Icon Container: Custom Illustrated Icon or Outline Fallback */}
              {service.customIcon ? (
                <motion.div
                  className={`w-24 h-24 rounded-2xl flex items-center justify-center p-3 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl ${
                    isMammaRoma
                      ? "bg-neutral-50 border-2 border-neutral-300 group-hover:border-[#006a34]"
                      : "bg-[#fdf8ee] border-2 border-[#774b1b]/25 group-hover:border-[#bf241e]"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.customIcon}
                    alt={service.title}
                    className="w-16 h-16 object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:rotate-3"
                  />
                </motion.div>
              ) : (
                <motion.div
                  className="w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-sm"
                  style={{
                    borderColor: isMammaRoma ? "#171919" : "#774b1b",
                    color: isMammaRoma ? "#171919" : "#bf241e",
                  }}
                >
                  {getIcon(service.icon)}
                </motion.div>
              )}

              <div className="text-center">
                <h4 className="text-sm sm:text-base font-bold text-[#171919] mb-1">
                  {service.title}
                </h4>
                <p className="text-xs text-neutral-500 max-w-[180px] leading-relaxed mx-auto">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Delivery Banner — dark strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: isMammaRoma
              ? "linear-gradient(135deg, #171919 0%, #2a0000 100%)"
              : "linear-gradient(135deg, #171919 0%, #3d1500 100%)",
          }}
        >
          <div className="px-8 py-10 sm:py-12 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <div className="text-center sm:text-left">
              <p
                className="text-xs uppercase tracking-widest font-bold mb-1"
                style={{ color: isMammaRoma ? "#d7a53b" : "#bf241e" }}
              >
                Delivery Rápido
              </p>
              <h3 className="text-2xl sm:text-3xl font-black">
                {isMammaRoma ? "Pedí a Domicilio" : "Pedí Pizzas a Domicilio"}
              </h3>
              <p className="text-neutral-400 text-sm mt-1">
                Llamanos o escribinos al{" "}
                <a
                  href={`tel:${brand.phone}`}
                  className="font-bold hover:underline transition-colors"
                  style={{ color: isMammaRoma ? "#d7a53b" : "#bf241e" }}
                >
                  {brand.phone}
                </a>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                onClick={() => setActiveTab("delivery")}
                className="px-8 py-3.5 text-white rounded-full font-black text-sm uppercase tracking-wider shadow-lg flex items-center gap-2 group"
                style={{ backgroundColor: isMammaRoma ? "#006a34" : "#bf241e" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <span>Ordenar Ahora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                onClick={() => setActiveTab("contacto")}
                className="px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider bg-white/10 hover:bg-white/20 border border-white/20 text-white transition flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                {isMammaRoma ? "¡Reservá Ahora!" : "¡Reservá Tu Mesa!"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
