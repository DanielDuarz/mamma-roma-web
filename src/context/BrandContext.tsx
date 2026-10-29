"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { BrandId, NavTabId, BrandData, MenuItem, BRANDS } from "@/data/brandsData";

const LOCAL_STORAGE_DATA_KEY = "mr_site_dynamic_brands_data";

const STATIC_BUNDLED_UPLOADS = new Set([
  "/images/uploads/mr_1791745657050_dsc03753-2.png",
  "/images/uploads/mr_1791746810442_dsc08185.png",
  "/images/uploads/mr_1791746814034_dsc08203.png",
  "/images/uploads/mr_1791748254870_dsc08326-edit.png",
  "/images/uploads/mr_1791755299023_dsc08326-edit.png",
]);

function autoMigrateBrandsUrls<T>(obj: T): T {
  if (typeof obj === "string") {
    if (STATIC_BUNDLED_UPLOADS.has(obj)) {
      return obj.replace(/\.png$/, ".webp") as unknown as T;
    }
    if (
      (obj.startsWith("/images/dishes/") || obj.startsWith("/images/heroes/")) &&
      (obj.endsWith(".jpg") || obj.endsWith(".png"))
    ) {
      return obj.replace(/\.(jpg|png)$/, ".webp") as unknown as T;
    }
    if (obj === "/images/logos/logo-group.png") {
      return "/images/logos/logo-group.webp" as unknown as T;
    }
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(autoMigrateBrandsUrls) as unknown as T;
  }
  if (obj && typeof obj === "object") {
    const res: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = autoMigrateBrandsUrls(v);
    }
    return res as unknown as T;
  }
  return obj;
}

interface BrandContextType {
  brandId: BrandId;
  brand: BrandData;
  brands: Record<BrandId, BrandData>;
  activeTab: NavTabId;
  setBrandId: (id: BrandId) => void;
  setActiveTab: (tab: NavTabId) => void;
  lightboxItem: MenuItem | null;
  openLightbox: (item: MenuItem) => void;
  closeLightbox: () => void;
  orderViaWhatsApp: (productName: string, notes?: string) => void;
  updateAllBrandsData: (newBrands: Record<BrandId, BrandData>) => Promise<boolean>;
  refreshSiteData: () => Promise<void>;
}

const BrandContext = createContext<BrandContextType | undefined>(undefined);

export function BrandProvider({ children }: { children: React.ReactNode }) {
  const [brandId, setBrandIdState] = useState<BrandId>("mamma-roma");
  const [activeTab, setActiveTabState] = useState<NavTabId>("inicio");
  const [lightboxItem, setLightboxItem] = useState<MenuItem | null>(null);
  const [brands, setBrands] = useState<Record<BrandId, BrandData>>(() =>
    autoMigrateBrandsUrls(BRANDS)
  );

  // Sync with /api/data on load
  const refreshSiteData = useCallback(async () => {
    try {
      const res = await fetch(`/api/data?t=${Date.now()}`, { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && data["mamma-roma"] && data["sette-colli"]) {
          const migrated = autoMigrateBrandsUrls(data);
          setBrands(migrated);
          try {
            localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(migrated));
          } catch {
            // ignore
          }
          return;
        }
      }
    } catch {
      // ignore network errors
    }

    // Fallback to localStorage if API call failed
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_DATA_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed["mamma-roma"] && parsed["sette-colli"]) {
          const migrated = autoMigrateBrandsUrls(parsed);
          setBrands(migrated);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    refreshSiteData();
  }, [refreshSiteData]);

  const brand = brands[brandId] || BRANDS[brandId];

  const updateAllBrandsData = async (newBrands: Record<BrandId, BrandData>): Promise<boolean> => {
    setBrands(newBrands);
    try {
      localStorage.setItem(LOCAL_STORAGE_DATA_KEY, JSON.stringify(newBrands));
    } catch {
      // ignore
    }

    try {
      const res = await fetch("/api/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBrands),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const setBrandId = (newBrandId: BrandId) => {
    setBrandIdState(newBrandId);
    if (newBrandId === "sette-colli" && activeTab === "salsas") {
      setActiveTabState("inicio");
    }
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-brand", newBrandId);
    }
  };

  const setActiveTab = (tab: NavTabId) => {
    setActiveTabState(tab);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openLightbox = (item: MenuItem) => {
    setLightboxItem(item);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const orderViaWhatsApp = (productName: string, notes?: string) => {
    const brandName = brand.name;
    const phone = brand.whatsapp;
    let message = `¡Hola ${brandName}! 👋 Deseo ordenar: *${productName}*.`;
    if (notes) {
      message += ` (${notes})`;
    }
    message += ` ¿Me podrían confirmar disponibilidad y tiempo de entrega?`;
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${phone}?text=${encoded}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-brand", brandId);
    }
  }, [brandId]);

  return (
    <BrandContext.Provider
      value={{
        brandId,
        brand,
        brands,
        activeTab,
        setBrandId,
        setActiveTab,
        lightboxItem,
        openLightbox,
        closeLightbox,
        orderViaWhatsApp,
        updateAllBrandsData,
        refreshSiteData,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
}

export function useBrand() {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error("useBrand must be used within a BrandProvider");
  }
  return context;
}
