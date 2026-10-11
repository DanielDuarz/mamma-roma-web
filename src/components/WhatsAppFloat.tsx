"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useBrand } from "@/context/BrandContext";

export default function WhatsAppFloat() {
  const { brand } = useBrand();
  const [showTooltip, setShowTooltip] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const waUrl = `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(brand.whatsappDefaultMessage)}`;

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Tooltip Bubble */}
      <AnimatePresence>
        {showTooltip && !dismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white text-[#171919] text-xs font-semibold px-4 py-3 rounded-2xl shadow-xl border border-neutral-200 max-w-[220px] text-right leading-relaxed"
          >
            <button
              onClick={() => { setShowTooltip(false); setDismissed(true); }}
              className="absolute -top-2 -left-2 w-5 h-5 bg-neutral-200 hover:bg-neutral-300 rounded-full flex items-center justify-center transition"
              aria-label="Cerrar"
            >
              <X className="w-3 h-3 text-neutral-600" />
            </button>
            <span className="block text-[#006a34] font-black text-sm mb-0.5">¡Hola! 👋</span>
            {brand.whatsappDefaultMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Float Button */}
      <motion.a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] shadow-2xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        onHoverStart={() => !dismissed && setShowTooltip(true)}
        onHoverEnd={() => !dismissed && setShowTooltip(false)}
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <span className="absolute inset-[-4px] rounded-full border-2 border-[#25D366]/40 animate-pulse" />
        <MessageCircle className="w-7 h-7 text-white fill-white relative z-10" />
      </motion.a>
    </div>
  );
}
