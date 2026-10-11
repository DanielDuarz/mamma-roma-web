"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import {
  Search,
  Eye,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  Leaf,
  Flame,
  BookOpen,
  UtensilsCrossed,
} from "lucide-react";
import { MenuItem } from "@/data/brandsData";
import VisualMenuViewer from "@/components/VisualMenuViewer";

export default function MenuSection() {
  const { brandId, brand, openLightbox, orderViaWhatsApp } = useBrand();

  const visualMenu = brand.visualMenu;
  const isVisualEnabled = visualMenu?.enabled ?? true;
  const isItemsEnabled = visualMenu?.itemsEnabled ?? false;

  // Active view tab: defaults to "visual" if enabled, otherwise "items"
  const [activeMenuTab, setActiveMenuTab] = useState<"visual" | "items">(() => {
    if (isVisualEnabled) return "visual";
    if (isItemsEnabled) return "items";
    return "visual";
  });

  // Dynamic dishes filter state
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const isMammaRoma = brandId === "mamma-roma";

  const filteredItems = useMemo(() => {
    const items = brand.menuItems || [];
    return items.filter((item) => {
      const matchesCategory =
        selectedCategory === "Todas" ||
        item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesQuery =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [brand.menuItems, selectedCategory, searchQuery]);

  // If both modes are disabled, show a polite fallback
  const bothDisabled = !isVisualEnabled && !isItemsEnabled;

  return (
    <section className="py-12 sm:py-20 bg-neutral-900/40 text-[#171919] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#d7a53b]" />
            <span className="text-xs uppercase tracking-widest font-black text-neutral-800">
              Gastronomía Artesanal • {brand.name}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#171919] mb-3">
            Nuestra Carta & Menú
          </h2>

          <p className="text-neutral-600 text-xs sm:text-base leading-relaxed">
            {isMammaRoma
              ? "Recetas tradicionales de Roma transmitidas por generaciones. Ingredientes 100% italianos, pastas frescas al huevo y masa madre fermentada."
              : "La maestría de la pizza y cocina romana en Ciudad de Guatemala. Masa madre de 72 horas y horneado en leña a 450°C."}
          </p>

          {/* VIEW SWITCHER TABS (Only shown if both modes are active) */}
          {isVisualEnabled && isItemsEnabled && (
            <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-white border-2 border-neutral-200 shadow-lg">
              <button
                type="button"
                onClick={() => setActiveMenuTab("visual")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  activeMenuTab === "visual"
                    ? "bg-[#171919] text-white shadow-md scale-102"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                <BookOpen className="w-4 h-4 text-[#d7a53b]" />
                <span>Carta Completa (Oficial Alta Res)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveMenuTab("items")}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-black transition-all flex items-center gap-2 ${
                  activeMenuTab === "items"
                    ? "bg-[#171919] text-white shadow-md scale-102"
                    : "text-neutral-600 hover:text-black"
                }`}
              >
                <UtensilsCrossed className="w-4 h-4 text-[#d7a53b]" />
                <span>Platillos Destacados (Interactivo)</span>
              </button>
            </div>
          )}
        </div>

        {/* CONTENT DISPLAY */}
        {bothDisabled ? (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-neutral-300 max-w-lg mx-auto">
            <BookOpen className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-neutral-800">Menú en actualización</h4>
            <p className="text-sm text-neutral-500 mt-1">
              Estamos actualizando nuestras opciones gastronómicas. ¡Consúltanos por WhatsApp!
            </p>
          </div>
        ) : (
          <div>
            {/* VIEW 1: VISUAL HIGH-RES PDF MENU */}
            {isVisualEnabled && (activeMenuTab === "visual" || !isItemsEnabled) && (
              <VisualMenuViewer brand={brand} isMammaRoma={isMammaRoma} />
            )}

            {/* VIEW 2: DYNAMIC INDIVIDUAL DISHES */}
            {isItemsEnabled && (activeMenuTab === "items" || !isVisualEnabled) && (
              <div className="space-y-10">
                {/* Search & Filter bar */}
                <div className="space-y-4">
                  <div className="max-w-md mx-auto relative">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar platillo por nombre o ingrediente..."
                      className="w-full pl-12 pr-4 py-3 bg-white border-2 border-neutral-200 rounded-full text-sm font-medium focus:outline-none focus:border-[#171919] transition-colors shadow-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700 font-bold"
                      >
                        Limpiar
                      </button>
                    )}
                  </div>

                  {/* Categories Pills */}
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                    {brand.menuCategories.map((category) => {
                      const isActive = selectedCategory === category;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm ${
                            isActive
                              ? "bg-[#171919] text-white shadow-md scale-105"
                              : "bg-white text-neutral-700 border border-neutral-200 hover:border-[#171919]"
                          }`}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Items Grid */}
                {filteredItems.length === 0 ? (
                  <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-neutral-300 max-w-lg mx-auto">
                    <p className="text-neutral-500 font-medium text-base mb-2">
                      No encontramos platillos para este filtro.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("Todas");
                        setSearchQuery("");
                      }}
                      className="px-4 py-2 bg-[#171919] text-white rounded-full text-xs font-bold"
                    >
                      Restablecer filtros
                    </button>
                  </div>
                ) : (
                  <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    <AnimatePresence>
                      {filteredItems.map((item: MenuItem) => (
                        <motion.div
                          layout
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.3 }}
                          key={item.id}
                          className="group bg-white rounded-2xl overflow-hidden border-2 border-[#171919] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                        >
                          {/* Card Image */}
                          <div
                            onClick={() => openLightbox(item)}
                            className="relative h-56 w-full overflow-hidden bg-neutral-100 cursor-pointer"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                              loading="lazy"
                            />

                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <div className="px-4 py-2 rounded-full bg-black/75 text-white text-xs font-bold flex items-center gap-2 backdrop-blur-sm shadow-md">
                                <Eye className="w-4 h-4" />
                                <span>Ver foto y detalles</span>
                              </div>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                              {item.badge && (
                                <span
                                  className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-sm"
                                  style={{
                                    backgroundColor: isMammaRoma ? "#e3252d" : "#bf241e",
                                  }}
                                >
                                  {item.badge}
                                </span>
                              )}
                              {item.isGlutenFree && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow-sm">
                                  <ShieldCheck className="w-3 h-3" /> Sin Gluten
                                </span>
                              )}
                              {item.isVegetarian && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-700 text-white flex items-center gap-1 shadow-sm">
                                  <Leaf className="w-3 h-3" /> Veggie
                                </span>
                              )}
                              {item.isSpicy && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white flex items-center gap-1 shadow-sm">
                                  <Flame className="w-3 h-3" /> Picante
                                </span>
                              )}
                            </div>

                            {/* Price */}
                            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-[#171919] px-3 py-1 rounded-full font-black text-sm shadow-md border border-neutral-200">
                              Q{item.price}
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                            <div>
                              <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                                {item.category}
                              </div>
                              <h3
                                onClick={() => openLightbox(item)}
                                className="text-xl font-black text-[#171919] hover:text-[#e3252d] cursor-pointer transition-colors leading-snug mb-2"
                              >
                                {item.name}
                              </h3>
                              <p className="text-neutral-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                                {item.description}
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
                              <button
                                onClick={() => openLightbox(item)}
                                className="flex-1 py-2.5 px-3 rounded-lg border-2 border-[#171919] text-[#171919] hover:bg-neutral-100 text-xs font-bold transition flex items-center justify-center gap-1.5"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Detalles</span>
                              </button>

                              <button
                                onClick={() =>
                                  orderViaWhatsApp(item.name, `Precio: Q${item.price}`)
                                }
                                className="flex-1 py-2.5 px-3 rounded-lg bg-[#171919] hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                                style={{
                                  backgroundColor: isMammaRoma ? "#006a34" : "#bf241e",
                                }}
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Pedir</span>
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
