import type { Metadata } from "next";
import "./globals.css";
import { BrandProvider } from "@/context/BrandContext";

export const metadata: Metadata = {
  title: "Mamma Roma & Sette Colli | La Vera Cucina Italiana en Guatemala",
  description:
    "Sitio oficial de Mamma Roma (pastas y cocina italiana tradicional) y Sette Colli (pizzas artesanales al horno de leña). Sucursales en Centro Histórico, Cuatro Grados Norte y Cayalá.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-brand="mamma-roma">
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/uploads/mr_1791745657050_dsc03753-2.webp"
          // @ts-expect-error fetchPriority in link
          fetchpriority="high"
          fetchPriority="high"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-white text-[#171919]">
        <BrandProvider>{children}</BrandProvider>
      </body>
    </html>
  );
}
