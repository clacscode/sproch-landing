import type { Metadata } from "next";
import { HeroVariantMinimal } from "@/components/public/HeroVariantMinimal";

export const metadata: Metadata = {
  title: "Hero v2 — Minimalista oscuro",
  robots: { index: false, follow: false },
};

export default function HeroV2Page() {
  return (
    <HeroVariantMinimal />
  );
}
