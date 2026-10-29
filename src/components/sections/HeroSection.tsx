"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useBrand } from "@/context/BrandContext";
import { ArrowRight, Phone, Clock, MapPin, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { brandId, brand, setActiveTab } = useBrand();
  const isMammaRoma = brandId === "mamma-roma";
  const defaultFallbackHero = isMammaRoma
    ? "/images/heroes/hero-mamma-roma.webp"
    : "/images/heroes/hero-sette-colli.webp";

  const getCleanHeroUrl = React.useCallback(
    (url?: string) => {
      if (!url) return defaultFallbackHero;
      if (
        url === "/images/uploads/mr_1791745657050_dsc03753-2.png" ||
        url === "/images/uploads/mr_1791746810442_dsc08185.png" ||
        url === "/images/uploads/mr_1791746814034_dsc08203.png" ||
        url === "/images/uploads/mr_1791748254870_dsc08326-edit.png" ||
        url === "/images/uploads/mr_1791755299023_dsc08326-edit.png"
      ) {
        return url.replace(/\.png$/, ".webp");
      }
      return url;
    },
    [defaultFallbackHero]
  );

  const [heroImgSrc, setHeroImgSrc] = React.useState(() =>
    getCleanHeroUrl(brand.hero.heroImage || defaultFallbackHero)
  );

  React.useEffect(() => {
    setHeroImgSrc(getCleanHeroUrl(brand.hero.heroImage || defaultFallbackHero));
  }, [brand.hero.heroImage, defaultFallbackHero, getCleanHeroUrl]);

  const heroRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] sm:min-h-[95vh] flex items-center justify-center overflow-hidden bg-[#171919] text-white">
      {/* Priority image preloading hint */}
      {/* @ts-expect-error React link preload fetchPriority */}
      <link rel="preload" as="image" href={heroImgSrc} fetchpriority="high" fetchPriority="high" />

      {/* Parallax Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={heroImgSrc}
          src={heroImgSrc}
          alt={brand.name || "Restaurante Italiano"}
          width={1200}
          height={800}
          loading="eager"
          decoding="async"
          // @ts-expect-error fetchPriority attribute in React 18
          fetchpriority="high"
          fetchPriority="high"
          onError={() => {
            if (heroImgSrc !== defaultFallbackHero) {
              setHeroImgSrc(defaultFallbackHero);
            }
          }}
          className="w-full h-[120%] object-cover object-center opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171919] via-[#171919]/70 to-[#171919]/50" />
      </motion.div>

      {/* Ambient Color Blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-25 pointer-events-none"
        style={{ backgroundColor: isMammaRoma ? "#e3252d" : "#bf241e" }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: isMammaRoma ? "#006a34" : "#774b1b" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div style={{ y: textY }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Badge / Slogan pill */}
        <motion.div
          key={`badge-${brandId}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 backdrop-blur-md mb-6 shadow-md"
        >
          {isMammaRoma ? (
            <Sparkles className="w-3.5 h-3.5 text-[#d7a53b]" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/icons/sc-italian-gesture.png"
              alt="Gesto Italiano"
              className="w-4 h-4 object-contain inline"
            />
          )}
          <span className="text-xs uppercase tracking-widest font-bold text-neutral-200">
            {brand.slogan}
          </span>
          <span className="text-xs text-neutral-400">• Guatemala</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          key={`title-${brandId}`}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-tight sm:leading-tight mb-6 max-w-4xl mx-auto"
        >
          <span>{brand.hero.title} </span>
          <span
            className="inline-block transition-colors duration-300 bg-gradient-to-r bg-clip-text text-transparent"
            style={{
              backgroundImage: isMammaRoma
                ? "linear-gradient(135deg, #ffffff 0%, #d7a53b 100%)"
                : "linear-gradient(135deg, #f7eedd 0%, #bf241e 100%)",
            }}
          >
            {brand.hero.highlight.replace(/[\uD83C-\uDBFF\uDC00-\uDFFF]+/g, "").trim()}
          </span>
          {isMammaRoma && (
            <span
              className="inline-flex items-center ml-2.5 sm:ml-4 align-middle select-none shadow-lg rounded-sm sm:rounded overflow-hidden border border-white/20 transform -translate-y-1"
              title="Bandera de Italia"
              aria-label="Bandera de Italia"
            >
              <span className="inline-block w-3.5 sm:w-5 md:w-6 h-5 sm:h-7 md:h-8 bg-[#009246]" />
              <span className="inline-block w-3.5 sm:w-5 md:w-6 h-5 sm:h-7 md:h-8 bg-[#ffffff]" />
              <span className="inline-block w-3.5 sm:w-5 md:w-6 h-5 sm:h-7 md:h-8 bg-[#ce2b37]" />
            </span>
          )}
          {!isMammaRoma && brand.hero.highlight.includes("🔥") && (
            <span className="inline-block ml-2 text-2xl sm:text-4xl md:text-5xl align-middle select-none">
              🔥
            </span>
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={`desc-${brandId}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-base sm:text-xl text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          {brand.hero.description}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          key={`cta-${brandId}`}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <motion.button
            onClick={() => setActiveTab("delivery")}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base tracking-wide uppercase transition-colors duration-200 shadow-xl flex items-center justify-center gap-2 group text-white"
            style={{ backgroundColor: isMammaRoma ? "#006a34" : "#bf241e" }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}
            whileTap={{ scale: 0.96 }}
          >
            <span>{brand.hero.ctaPrimary}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>

          <motion.button
            onClick={() => setActiveTab("contacto")}
            className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-base tracking-wide uppercase bg-black hover:bg-neutral-900 border border-neutral-700 text-white transition-colors duration-200 shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            {brand.hero.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Stats / Quick Highlights Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-16 pt-8 border-t border-neutral-800/80 grid grid-cols-1 sm:grid-cols-3 gap-6 text-neutral-400 text-xs sm:text-sm"
        >
          <div className="flex items-center justify-center gap-2.5">
            <Phone className="w-4 h-4 text-[#d7a53b]" />
            <span>Pedidos: <strong className="text-white font-semibold">{brand.phone}</strong></span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <Clock className="w-4 h-4 text-[#d7a53b]" />
            <span>{brand.generalHours || "Abierto todos los días desde las 12:00 PM"}</span>
          </div>
          <div className="flex items-center justify-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#d7a53b]" />
            <button
              onClick={() => setActiveTab("ubicaciones")}
              className="text-neutral-300 hover:text-white underline underline-offset-2 transition-colors"
            >
              {brand.locations.length} {brand.locations.length === 1 ? "Ubicación en Guatemala" : "Ubicaciones en Guatemala"}
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-semibold">Scroll</span>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-neutral-500 to-transparent rounded-full"
          animate={{ scaleY: [1, 0.5, 1], opacity: [0.7, 0.3, 0.7] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
