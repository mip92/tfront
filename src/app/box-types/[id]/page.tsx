import type { Metadata } from "next";
import React from "react";
import { BoxTypeDetailClient } from "./BoxTypeDetailClient";
import { pageSEO } from "@/components/SEOMetadata";

interface BoxTypePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: BoxTypePageProps): Promise<Metadata> {
  const { id } = await params;
  return {
    ...pageSEO.boxType(),
    title: `Box Type ${id}`,
    description: `Details for box type with ID ${id}`,
  };
}

export default async function BoxTypePage({ params }: BoxTypePageProps) {
  const { id } = await params;

  return (
    <div className="min-h-screen bg-muted/50">
      <main className="w-full py-6">
        <div className="w-full px-6">
          <BoxTypeDetailClient id={parseInt(id)} />
        </div>
      </main>
    </div>
  );
}
