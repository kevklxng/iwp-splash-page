import Image from "next/image";

const SRC = "/SVGtch.svg";
const WIDTH = 362;
const HEIGHT = 100;

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
        className="h-8 w-auto md:h-10"
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
      className="h-auto w-full max-w-[min(100%,560px)]"
      priority={priority}
    />
  );
}
