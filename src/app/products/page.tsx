import type { Metadata } from "next";
import React from "react";
import { ProductsClient } from "./ProductsClient";
export const metadata: Metadata = {
  title: "Products - Tattoo Client | Product Catalog & Inventory Management",
  description:
    "Manage your product catalog and inventory with our comprehensive product management system. Search, filter, and organize your products efficiently.",
  keywords: [
    "products",
    "inventory",
    "catalog",
    "management",
    "tattoo",
    "business",
  ],
  openGraph: {
    title: "Products - Tattoo Client",
    description:
      "Manage your product catalog and inventory with our comprehensive product management system.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products - Tattoo Client",
    description:
      "Manage your product catalog and inventory with our comprehensive product management system.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/products",
  },
};

// Структурированные данные для продуктов
const generateStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Products",
  description: "Product catalog and inventory management page",
  url: "/products",
  mainEntity: {
    "@type": "ItemList",
    name: "Product Catalog",
    description: "Collection of products available for management",
  },
});

export default function ProductsPage() {
  return (
    <>
      {/* Структурированные данные для SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData()),
        }}
      />

      <div className="min-h-screen bg-muted/50">
        <main className="w-full py-6">
          <div className="w-full px-2">
            {/* Семантический заголовок страницы */}
            <header className="mb-4">
              <h1 className="text-3xl font-bold text-foreground">Products</h1>
              <p className="text-muted-foreground mt-2">
                Manage your product catalog and inventory
              </p>
            </header>

            {/* Клиентский компонент для интерактивности */}
            <ProductsClient />
          </div>
        </main>
      </div>
    </>
  );
}
