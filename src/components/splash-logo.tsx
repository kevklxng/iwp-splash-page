import Image from "next/image";
import { SITE_URL } from "@/lib/seo";

const SRC = "/iwp-logo-subhead.png";
const WIDTH = 500;
const HEIGHT = 500;

type SplashLogoProps = {
  variant?: "header" | "hero";
  priority?: boolean;
  tone?: "dark" | "light";
};

export function SplashLogo({ variant = "hero", priority = false }: SplashLogoProps) {
  if (variant === "header") {
    return (
      <Image
        src={SRC}
        alt="IWP — Itibari, Waynne & Partners — Financing for the Entertainment Industry"
        width={WIDTH}
        height={HEIGHT}
        className="h-8 w-auto md:h-10"
        priority={priority}
      />
    );
  }

  return (
    <a
      href={SITE_URL}
      className="inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1e4642]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC}
        alt="IWP — Itibari, Waynne & Partners — Financing for the Entertainment Industry"
        width={WIDTH}
        height={HEIGHT}
        className="aspect-square w-full max-w-[500px] object-contain"
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    </a>
  );
}
