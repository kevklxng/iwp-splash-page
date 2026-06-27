import Image from "next/image";

const SRC = "/iwp-logo.svg";
const WIDTH = 400;
const HEIGHT = 120;

type SplashLogoProps = {
  variant?: "header" | "hero";
  priority?: boolean;
  tone?: "dark" | "light";
};

export function SplashLogo({ variant = "hero", priority = false }: SplashLogoProps) {
  if (variant === "header") {
    return (
      <span className="inline-block">
        <Image
          src={SRC}
          alt="IWP — Itibari, Waynne & Partners"
          width={WIDTH}
          height={HEIGHT}
          className="h-10 w-auto md:h-12"
          priority={priority}
        />
      </span>
    );
  }

  return (
    <span className="inline-block max-w-[min(100%,480px)]">
      <Image
        src={SRC}
        alt="IWP — Itibari, Waynne & Partners"
        width={WIDTH}
        height={HEIGHT}
        className="h-auto w-full"
        priority={priority}
      />
    </span>
  );
}
