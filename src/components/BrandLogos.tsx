"use client";

import React, { useState } from "react";

export function MammaRomaLogo({
  className = "h-10 sm:h-12",
  isLight = false,
}: {
  className?: string;
  isLight?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <div className={`flex items-center justify-center select-none ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/logo-mamma-roma.svg"
          alt="Mamma Roma Logo"
          className="h-full w-auto object-contain max-h-12 transition-transform duration-300 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Fallback SVG if file is not found
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div className="relative flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 160 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-auto"
        >
          <path d="M10 24 Q80 8 150 24" stroke="#006a34" strokeWidth="2.5" fill="none" />
          <path d="M20 28 Q80 14 140 28" stroke="#ffffff" strokeWidth="2" fill="none" opacity="0.9" />
          <path d="M30 32 Q80 20 130 32" stroke="#e3252d" strokeWidth="2.5" fill="none" />
          <text
            x="80"
            y="28"
            textAnchor="middle"
            fill={isLight ? "#171919" : "#ffffff"}
            fontFamily="Georgia, serif"
            fontSize="18"
            fontWeight="bold"
            letterSpacing="2"
          >
            MAMMA ROMA
          </text>
          <text
            x="80"
            y="42"
            textAnchor="middle"
            fill="#d7a53b"
            fontFamily="sans-serif"
            fontSize="7"
            fontWeight="600"
            letterSpacing="3"
          >
            LA VERA CUCINA ITALIANA
          </text>
        </svg>
      </div>
    </div>
  );
}

export function SetteColliLogo({
  className = "h-10 sm:h-12",
  isLight = false,
}: {
  className?: string;
  isLight?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <div className={`flex items-center justify-center select-none ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/logos/logo-sette-colli.svg"
          alt="Sette Colli Logo"
          className="h-full w-auto object-contain max-h-12 transition-transform duration-300 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Fallback SVG if file is not found
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div className="relative flex flex-col items-center justify-center">
        <svg
          viewBox="0 0 160 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-auto"
        >
          <circle cx="80" cy="12" r="4" fill="#bf241e" />
          <path d="M25 24 C50 14 65 14 80 18 C95 14 110 14 135 24" stroke="#bf241e" strokeWidth="2.5" fill="none" />
          <path d="M40 26 C60 20 80 20 120 26" stroke="#774b1b" strokeWidth="1.5" fill="none" />
          <text
            x="80"
            y="30"
            textAnchor="middle"
            fill={isLight ? "#171919" : "#ffffff"}
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="17"
            fontWeight="bold"
            letterSpacing="2.5"
          >
            SETTE COLLI
          </text>
          <text
            x="80"
            y="43"
            textAnchor="middle"
            fill="#bf241e"
            fontFamily="sans-serif"
            fontSize="7.5"
            fontWeight="700"
            letterSpacing="2.5"
          >
            PIZZE ARTIGIANALI
          </text>
        </svg>
      </div>
    </div>
  );
}

export function MammaRomaGroupLogo({
  className = "h-14 sm:h-16",
}: {
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!hasError) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <div className="bg-white px-3.5 py-1.5 rounded-2xl shadow-md border border-neutral-300/40 flex items-center justify-center transition-all duration-300 hover:scale-[1.03] hover:shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logos/logo-group.png"
            alt="Mamma Roma Group"
            className="h-12 sm:h-14 w-auto object-contain"
            onError={() => setHasError(true)}
          />
        </div>
      </div>
    );
  }

  // Fallback SVG if file is not found
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 240 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-14 w-auto"
      >
        <circle cx="28" cy="32" r="22" stroke="#d7a53b" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M18 32 C18 24 24 20 28 20 C32 20 38 24 38 32 C38 40 32 44 28 44 C24 44 18 40 18 32 Z" stroke="#ffffff" strokeWidth="1" fill="none" />
        <circle cx="28" cy="27" r="3" fill="#006a34" />
        <circle cx="28" cy="32" r="3" fill="#ffffff" />
        <circle cx="28" cy="37" r="3" fill="#e3252d" />
        <text
          x="62"
          y="28"
          fill="#ffffff"
          fontFamily="Georgia, serif"
          fontSize="17"
          fontWeight="bold"
          letterSpacing="2"
        >
          MAMMA ROMA
        </text>
        <text
          x="195"
          y="28"
          fill="#d7a53b"
          fontFamily="Georgia, serif"
          fontSize="14"
          fontWeight="bold"
          letterSpacing="1.5"
        >
          GROUP
        </text>
        <text
          x="62"
          y="42"
          fill="#a3a3a3"
          fontFamily="sans-serif"
          fontSize="7"
          fontWeight="600"
          letterSpacing="2.5"
        >
          GRUPPO GASTRONOMICO ITALIANO
        </text>
        <text
          x="62"
          y="54"
          fill="#d7a53b"
          fontFamily="sans-serif"
          fontSize="6.5"
          fontWeight="700"
          letterSpacing="1.5"
        >
          MAMMA ROMA • SETTE COLLI
        </text>
      </svg>
    </div>
  );
}
