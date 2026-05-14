import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

interface LogoProps {
  variant?: "default" | "compact";
  className?: string;
}

export function Logo({ variant = "default", className }: LogoProps) {
  const height = variant === "compact" ? 36 : 48;
  return (
    <Link
      href="/"
      aria-label={siteConfig.legalName}
      className={`inline-flex items-center ${className ?? ""}`}
    >
      <Image
        src="/brand/logo.png"
        alt={siteConfig.name}
        width={(4967 / 1856) * height}
        height={height}
        priority
        className="h-9 w-auto md:h-12"
      />
    </Link>
  );
}
