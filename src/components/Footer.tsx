"use client";

import React from "react";
import { useBrand } from "@/context/BrandContext";
import { MammaRomaGroupLogo } from "@/components/BrandLogos";
import { Phone, MapPin, Clock, MessageCircle, Sparkles, Tag, ArrowRight } from "lucide-react";

export default function Footer() {
  const { brand, brands, setActiveTab, setBrandId } = useBrand();

  const mammaRomaBrand = brands["mamma-roma"] || brand;
  const setteColliBrand = brands["sette-colli"] || brand;

  const social = brand.socialLinks;

  return (
    <footer className="bg-[#171919] text-white border-t-2 border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Group Header with Mamma Roma Group Logo */}
        <div className="pb-12 mb-12 border-b border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <MammaRomaGroupLogo className="h-14 sm:h-16" />
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl leading-relaxed">
              Grupo Gastronómico Italiano líder en Guatemala. Dos conceptos auténticos unidos por la pasión del sabor tradicional, masa de fermentación lenta e ingredientes italianos certificados D.O.P.
            </p>
          </div>

          {/* Social Links Official */}
          <div className="flex flex-col sm:items-end gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#d7a53b]">
              Redes Sociales Oficiales
            </span>
            <div className="flex items-center gap-2.5">
              {social?.instagramEnabled !== false && social?.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-[#e3252d] text-neutral-300 hover:text-white transition shadow-sm"
                  aria-label="Instagram Oficial"
                  title={`Instagram ${brand.name}`}
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {social?.facebookEnabled !== false && social?.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-[#006a34] text-neutral-300 hover:text-white transition shadow-sm"
                  aria-label="Facebook Oficial"
                  title={`Facebook ${brand.name}`}
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              )}
              {social?.whatsappEnabled !== false && (social?.whatsapp || brand.whatsapp) && (
                <a
                  href={social?.whatsapp || `https://wa.me/${brand.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-[#25D366] text-neutral-300 hover:text-white transition shadow-sm"
                  aria-label="WhatsApp Oficial"
                  title="WhatsApp Directo"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {social?.tiktokEnabled !== false && social?.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-neutral-900 hover:bg-[#bf241e] text-neutral-300 hover:text-white transition shadow-sm"
                  aria-label="TikTok Oficial"
                  title="TikTok Oficial"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c0 1.95-.53 3.91-1.69 5.46-1.22 1.61-3.08 2.67-5.07 2.95-1.98.27-4.05-.18-5.74-1.28-1.68-1.11-2.81-2.9-3.13-4.88-.32-2 .24-4.09 1.48-5.69 1.24-1.59 3.19-2.54 5.2-2.58.55-.02 1.1.04 1.64.18v4.13c-.39-.14-.81-.2-1.23-.18-1.04.05-2.02.6-2.57 1.48-.56.88-.63 2.02-.18 2.96.45.94 1.43 1.56 2.47 1.58 1.14.02 2.22-.64 2.69-1.68.22-.49.33-1.03.33-1.57V.02h.01z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Mamma Roma Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#e3252d] flex items-center gap-1.5">
              <span>Mamma Roma</span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">Pastas & Cucina</span>
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Recetas familiares de las nonnas italianas con sémola de trigo duro importada y salsas caseras.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => {
                    setBrandId("mamma-roma");
                    setActiveTab("menu");
                  }}
                  className="hover:text-white hover:underline transition"
                >
                  • Menú de Pastas & Entradas
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setBrandId("mamma-roma");
                    setActiveTab("promociones");
                  }}
                  className="hover:text-white hover:underline transition text-[#d7a53b] font-medium"
                >
                  • Promociones del Mes
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setBrandId("mamma-roma");
                    setActiveTab("salsas");
                  }}
                  className="hover:text-white hover:underline transition"
                >
                  • Salsas Envasadas Mamma Roma
                </button>
              </li>
              {/* Dynamic branches */}
              {mammaRomaBrand.locations.map((loc) => (
                <li key={loc.id}>
                  <button
                    onClick={() => {
                      setBrandId("mamma-roma");
                      setActiveTab("ubicaciones");
                    }}
                    className="hover:text-white hover:underline transition text-neutral-400 hover:text-white text-left"
                  >
                    • {loc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sette Colli Column (Dynamically reflects real locations: strictly 1 location at Convenia Plaza Zona 10) */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#bf241e] flex items-center gap-1.5">
              <span>Sette Colli</span>
              <span className="text-[10px] bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full">Pizze Artigianali</span>
            </h4>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Masa madre viva de 72 horas de fermentación cocinada en horno de leña de roble a 450°C.
            </p>
            <ul className="space-y-1.5 text-xs text-neutral-300">
              <li>
                <button
                  onClick={() => {
                    setBrandId("sette-colli");
                    setActiveTab("menu");
                  }}
                  className="hover:text-white hover:underline transition"
                >
                  • Menú de Pizzas & Calzones
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setBrandId("sette-colli");
                    setActiveTab("promociones");
                  }}
                  className="hover:text-white hover:underline transition text-[#d7a53b] font-medium"
                >
                  • Promociones del Mes (2x1 & Lanzamientos)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setBrandId("sette-colli");
                    setActiveTab("delivery");
                  }}
                  className="hover:text-white hover:underline transition"
                >
                  • Pedidos a Domicilio en Vespa
                </button>
              </li>
              {/* Strictly dynamic branches for Sette Colli (currently Convenia Plaza Zona 10) */}
              {setteColliBrand.locations.map((loc) => (
                <li key={loc.id}>
                  <button
                    onClick={() => {
                      setBrandId("sette-colli");
                      setActiveTab("ubicaciones");
                    }}
                    className="hover:text-white hover:underline transition text-neutral-400 hover:text-white text-left font-medium"
                  >
                    • {loc.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto Central */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#d7a53b]">
              Contacto y Reservas
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#d7a53b] flex-shrink-0 mt-0.5" />
                <span>Horarios: {brand.generalHours || "Todos los días desde las 12:00 PM hasta las 11:00 PM"}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#006a34] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="block text-neutral-400">Central de Pedidos:</span>
                  <a href={`tel:${brand.phone}`} className="hover:text-white font-bold text-white text-sm">
                    {brand.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e3252d] flex-shrink-0 mt-0.5" />
                <span>Ciudad de Guatemala & Convenia Plaza</span>
              </div>
            </div>
          </div>

          {/* Public Promociones & Eventos Box (100% clean, NO admin traces) */}
          <div className="space-y-3 bg-neutral-900/90 p-5 rounded-2xl border border-neutral-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d7a53b]" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-200">
                Promociones & Eventos
              </h4>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Descubre nuestras ofertas especiales del mes, banquetes familiares y paquetes para celebraciones privadas.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={() => setActiveTab("promociones")}
                className="w-full py-2.5 px-3 bg-[#e3252d] hover:bg-[#c91e25] text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 shadow"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Ver Promociones del Mes</span>
              </button>
              <button
                onClick={() => setActiveTab("contacto")}
                className="w-full py-2.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center justify-center gap-2 border border-neutral-700"
              >
                <span>Cotizar Evento Privado</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Tricolor Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Mamma Roma Group. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span>Passione e tradizione per la cucina italiana</span>
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#006a34]" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-white" />
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#e3252d]" />
          </div>
        </div>
      </div>
    </footer>
  );
}
