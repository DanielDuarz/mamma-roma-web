"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { Phone, MessageCircle, Clock, Truck, ShieldCheck, Search, Eye } from "lucide-react";
import { MenuItem } from "@/data/brandsData";

export default function DeliverySection() {
  const { brandId, brand, openLightbox, orderViaWhatsApp } = useBrand();
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const isMammaRoma = brandId === "mamma-roma";

  const filteredItems = useMemo(() => {
    return brand.menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "Todas" || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [brand.menuItems, selectedCategory, searchQuery]);

  return (
    <div className="bg-white text-[#171919] min-h-screen">
      {/* Persuasive Delivery Hero Banner */}
      <section className="bg-[#171919] text-white py-16 sm:py-24 relative overflow-hidden border-b border-neutral-800">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={brand.hero.heroImage}
            alt="Delivery"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171919] via-[#171919]/90 to-[#171919]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-700 text-xs font-bold uppercase tracking-wider text-[#d7a53b]"
          >
            <Truck className="w-4 h-4" />
            <span>Servicio a Domicilio Oficial</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase"
          >
            {brand.deliveryInfo?.bannerTitle || "Pedí a Domicilio"}
          </motion.h1>

          {/* Sette Colli Vespa Delivery Badge */}
          {!isMammaRoma && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="py-1"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons/sc-delivery-vespa.png"
                alt="Delivery Vespa Sette Colli"
                className="h-28 sm:h-36 mx-auto object-contain filter drop-shadow-2xl"
              />
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-neutral-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            {brand.deliveryInfo?.bannerDescription ||
              "Llevamos el sabor y aroma de Italia directo a la puerta de tu casa o trabajo. Caliente, recién salido de cocina y con empaque térmico especial."}
          </motion.p>

          {/* Quick Call & WhatsApp CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-lg mx-auto"
          >
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`¡Hola ${brand.name}! Deseo hacer un pedido a domicilio.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{
                backgroundColor: isMammaRoma ? "#006a34" : "#bf241e",
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>Pedir por WhatsApp</span>
            </a>

            <a
              href={`tel:${brand.phone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider bg-black hover:bg-neutral-900 border border-neutral-700 text-white shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#d7a53b]" />
              <span>Llamar al {brand.phone}</span>
            </a>
          </motion.div>

          {/* Guarantees Badges */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-xs text-neutral-300">
            <div className="flex items-center justify-center gap-2 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <Clock className="w-4 h-4 text-[#d7a53b] flex-shrink-0" />
              <span>{brand.deliveryInfo?.estimatedTime || "Tiempo estimado: 35 - 45 mins"}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <ShieldCheck className="w-4 h-4 text-[#d7a53b] flex-shrink-0" />
              <span>{brand.deliveryInfo?.securitySeal || "Sellos térmicos de seguridad"}</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-3 bg-neutral-900/60 rounded-xl border border-neutral-800">
              <Truck className="w-4 h-4 text-[#d7a53b] flex-shrink-0" />
              <span>{brand.deliveryInfo?.coverageZones || "Cobertura Zonas 1, 4, 10, 14, 15, 16"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Integrated Digital Menu Section (Requirement: menú digital interactivo integrado en la parte inferior) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-black text-[#e3252d]">
            Paso 1: Elige tu platillo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#171919] mt-1 mb-3">
            Menú Digital para Pedidos Inmediatos
          </h2>
          <p className="text-neutral-600 text-sm">
            Toca el botón <strong>&quot;Pedir&quot;</strong> en cualquier platillo para abrir directamente WhatsApp con el pedido listo para enviar.
          </p>
        </div>

        {/* Filter controls */}
        <div className="mb-10 space-y-4">
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar platillo para delivery..."
              className="w-full pl-12 pr-4 py-3 bg-neutral-50 border-2 border-neutral-200 rounded-full text-sm font-medium focus:outline-none focus:border-[#171919] transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {brand.menuCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#171919] text-white shadow-md scale-105"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: MenuItem) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border-2 border-[#171919] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div
                onClick={() => openLightbox(item)}
                className="relative h-48 w-full bg-neutral-100 cursor-pointer overflow-hidden group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 bg-white/90 text-[#171919] text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                  {item.category}
                </div>
                <div className="absolute top-2 right-2 bg-[#171919] text-white text-xs font-black px-2.5 py-1 rounded shadow">
                  Q{item.price}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3
                    onClick={() => openLightbox(item)}
                    className="font-black text-lg text-[#171919] hover:underline cursor-pointer leading-snug"
                  >
                    {item.name}
                  </h3>
                  <p className="text-neutral-500 text-xs mt-1 line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => openLightbox(item)}
                    className="p-2 rounded-lg border border-neutral-300 text-neutral-600 hover:text-black hover:bg-neutral-100 text-xs font-bold"
                    title="Ver detalles"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      orderViaWhatsApp(
                        `Delivery: ${item.name}`,
                        `Precio: Q${item.price} - Por favor enviar a mi dirección`
                      )
                    }
                    className="flex-1 py-2.5 px-4 rounded-lg text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow transition-transform active:scale-95"
                    style={{
                      backgroundColor: isMammaRoma ? "#006a34" : "#bf241e",
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Pedir a Domicilio</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
