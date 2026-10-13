"use client";

import React, { useState } from "react";
import { useBrand } from "@/context/BrandContext";
import { MammaRomaLogo, SetteColliLogo } from "@/components/BrandLogos";
import { Phone, MessageCircle, Menu, X, ArrowRight } from "lucide-react";
import { NavTabId } from "@/data/brandsData";

export default function Navbar() {
  const { brandId, brand, activeTab, setBrandId, setActiveTab } = useBrand();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isMammaRoma = brandId === "mamma-roma";

  const handleBrandSwitch = (newBrandId: "mamma-roma" | "sette-colli") => {
    if (brandId !== newBrandId) {
      setBrandId(newBrandId);
    }
  };

  const handleNavClick = (tabId: NavTabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#171919] text-white shadow-md border-b border-neutral-800 transition-colors duration-300">
      {/* Top Contact Bar */}
      <div className="border-b border-neutral-800/80 bg-black/60 px-4 py-2 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-end gap-3 text-xs">
          <div className="flex items-center gap-2 text-neutral-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium text-neutral-300">Pedidos & Reservaciones:</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`tel:${brand.phone}`}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
              title="Llamar para ordenar"
            >
              <Phone className="w-3.5 h-3.5 text-[#d7a53b]" />
              <span className="font-bold tracking-wide text-white">{brand.phone}</span>
            </a>
            <a
              href={`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(`¡Hola ${brand.name}! Deseo consultar el menú y ordenar.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#006a34] hover:bg-[#00552a] text-white px-3 py-1 rounded-full text-[11px] font-semibold transition-all shadow-sm hover:scale-105 active:scale-95"
              title="Contactar por WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5.5rem] py-2">
          {/* Dual Brand Logos (Directly Clickable Brand Switcher) */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Mamma Roma Logo Button */}
            <button
              onClick={() => handleBrandSwitch("mamma-roma")}
              className={`group flex items-center p-2 sm:p-2.5 rounded-2xl transition-all duration-300 ${
                isMammaRoma
                  ? "opacity-100 ring-2 ring-[#e3252d] bg-black/70 shadow-xl scale-105"
                  : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0 hover:bg-neutral-900/60"
              }`}
              title="Cambiar a Mamma Roma (Cocina Tradicional)"
              aria-label="Seleccionar Mamma Roma"
            >
              <MammaRomaLogo className="h-12 sm:h-14 md:h-16" />
            </button>

            {/* Subtle Divider */}
            <div className="h-10 w-px bg-neutral-700/80" />

            {/* Sette Colli Logo Button */}
            <button
              onClick={() => handleBrandSwitch("sette-colli")}
              className={`group flex items-center p-2 sm:p-2.5 rounded-2xl transition-all duration-300 ${
                !isMammaRoma
                  ? "opacity-100 ring-2 ring-[#bf241e] bg-black/70 shadow-xl scale-105"
                  : "opacity-60 hover:opacity-100 grayscale hover:grayscale-0 hover:bg-neutral-900/60"
              }`}
              title="Cambiar a Sette Colli (Pizzas Artesanales)"
              aria-label="Seleccionar Sette Colli"
            >
              <SetteColliLogo className="h-12 sm:h-14 md:h-16" />
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {brand.navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all relative ${
                    isActive
                      ? "text-white font-bold"
                      : "text-neutral-300 hover:text-white hover:bg-neutral-800/60"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: isMammaRoma ? "#e3252d" : "#bf241e",
                      }}
                    />
                  )}
                </button>
              );
            })}

            {/* Direct Order Fast Action CTA */}
            <button
              onClick={() => handleNavClick("delivery")}
              className={`ml-4 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-transform active:scale-95 shadow-md flex items-center gap-1.5 ${
                isMammaRoma
                  ? "bg-[#006a34] hover:bg-[#00552a] text-white"
                  : "bg-[#bf241e] hover:bg-[#9e1c17] text-white"
              }`}
            >
              <span>Pedí Ahora</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </nav>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick("delivery")}
              className={`px-3 py-1.5 rounded-full text-xs font-bold text-white ${
                isMammaRoma ? "bg-[#006a34]" : "bg-[#bf241e]"
              }`}
            >
              Pedí
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800 focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-b border-neutral-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold px-2 py-1">
            Navegación: {brand.name}
          </div>
          <div className="flex flex-col space-y-1">
            {brand.navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-neutral-800 text-white font-bold border-l-4"
                      : "text-neutral-300 hover:bg-neutral-900"
                  }`}
                  style={{
                    borderColor: isActive ? (isMammaRoma ? "#e3252d" : "#bf241e") : "transparent",
                  }}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2">
            <div className="text-xs text-neutral-400 px-2">Cambiar de restaurante:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleBrandSwitch("mamma-roma")}
                className={`py-2 px-3 rounded-lg text-xs font-bold border text-center transition ${
                  isMammaRoma
                    ? "bg-[#171919] border-[#e3252d] text-white"
                    : "bg-neutral-900 border-neutral-700 text-neutral-400"
                }`}
              >
                Mamma Roma
              </button>
              <button
                onClick={() => handleBrandSwitch("sette-colli")}
                className={`py-2 px-3 rounded-lg text-xs font-bold border text-center transition ${
                  !isMammaRoma
                    ? "bg-[#171919] border-[#bf241e] text-white"
                    : "bg-neutral-900 border-neutral-700 text-neutral-400"
                }`}
              >
                Sette Colli
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
