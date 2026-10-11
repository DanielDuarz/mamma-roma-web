"use client";

import React from "react";
import { useBrand } from "@/context/BrandContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuLightbox from "@/components/MenuLightbox";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PageTransition from "@/components/PageTransition";

import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import SpecialtiesSection from "@/components/sections/SpecialtiesSection";
import ServicesSection from "@/components/sections/ServicesSection";
import MenuSection from "@/components/sections/MenuSection";
import SaucesSection from "@/components/sections/SaucesSection";
import DeliverySection from "@/components/sections/DeliverySection";
import LocationsSection from "@/components/sections/LocationsSection";
import ContactSection from "@/components/sections/ContactSection";

import PromotionsSection from "@/components/sections/PromotionsSection";

export default function HomePage() {
  const { activeTab, brandId } = useBrand();
  const pageKey = `${brandId}-${activeTab}`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Dynamic Header with dual brand logos and navigation */}
      <Navbar />

      {/* Main Dynamic View Content */}
      <main className="flex-grow">
        <PageTransition pageKey={pageKey}>
          {activeTab === "inicio" && (
            <div>
              <HeroSection />
              <StorySection />
              <SpecialtiesSection />
              <ServicesSection />
            </div>
          )}
          {activeTab === "menu" && <MenuSection />}
          {activeTab === "promociones" && <PromotionsSection />}
          {activeTab === "contacto" && <ContactSection />}
          {activeTab === "delivery" && <DeliverySection />}
          {activeTab === "salsas" && <SaucesSection />}
          {activeTab === "ubicaciones" && <LocationsSection />}
        </PageTransition>
      </main>

      {/* Lightbox for menu dishes and photos */}
      <MenuLightbox />

      {/* Floating WhatsApp Quick Action */}
      <WhatsAppFloat />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
