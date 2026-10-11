"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealVariant = 'fade-up' | 'fade-left' | 'fade-right' | 'fade-in' | 'scale-in';

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  once?: boolean;
  className?: string;
}

const variants = {
  'fade-up': { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  'fade-left': { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  'fade-in': { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  'scale-in': { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
};

export default function ScrollReveal({ children, variant = 'fade-up', delay = 0, once = true, className }: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={variants[variant]}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
