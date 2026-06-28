import Image from "next/image";

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
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SRC}
      alt="IWP — Itibari, Waynne & Partners — Financing for the Entertainment Industry"
      width={WIDTH}
      height={HEIGHT}
      className="mx-auto h-auto w-full max-w-[560px]"
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}
