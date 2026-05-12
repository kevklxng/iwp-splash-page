import Image from "next/image";

const SRC = "/templeton-logo.png";
const WIDTH = 1024;
const HEIGHT = 282;

/** Passed to style; CSS class splash-logo-img also enforces color (Next/Image may override inline). */
const logoSurfaceStyle = {
  backgroundColor: "var(--color-bg)",
  color: "rgba(250, 250, 247, 0)",
} as const;

type SplashLogoProps = {
  variant?: "header" | "hero";
  priority?: boolean;
};

export function SplashLogo({ variant = "hero", priority = false }: SplashLogoProps) {
  if (variant === "header") {
    return (
      <Image
        src={SRC}
        alt="Templeton Custom Homes"
        width={WIDTH}
        height={HEIGHT}
        className="splash-logo-img bg-coastal-bg h-8 w-auto md:h-10"
        style={logoSurfaceStyle}
        priority={priority}
      />
    );
  }

  return (
    <Image
      src={SRC}
      alt="Templeton Custom Homes"
      width={WIDTH}
      height={HEIGHT}
      className="splash-logo-img bg-coastal-bg h-auto w-full max-w-[min(100%,560px)]"
      style={logoSurfaceStyle}
      priority={priority}
    />
  );
}
