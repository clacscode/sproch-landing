import type { Metadata } from "next";
import { HeroVariantEditorial } from "@/components/public/HeroVariantEditorial";

export const metadata: Metadata = {
  title: "Hero v3 — Editorial split",
  robots: { index: false, follow: false },
};

export default function HeroV3Page() {
  return (
    <HeroVariantEditorial />
  );
}
