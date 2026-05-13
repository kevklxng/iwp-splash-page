import Image from "next/image";
import { clsx } from "clsx";

const SRC = "/SVGtch.svg";
const WIDTH = 362;
const HEIGHT = 100;

type SplashLogoProps = {
  variant?: "header" | "hero";
  priority?: boolean;
  /** `light` inverts the SVG for use on dark / photographic backgrounds */
  tone?: "dark" | "light";
};

export function SplashLogo({ variant = "hero", priority = false, tone = "dark" }: SplashLogoProps) {
  const invert = tone === "light";

  if (variant === "header") {
    return (
      <span className={clsx("inline-block", invert && "[&_img]:brightness-0 [&_img]:invert")}>
        <Image
          src={SRC}
          alt="Templeton Custom Homes"
          width={WIDTH}
          height={HEIGHT}
          className="h-10 w-auto md:h-12"
          priority={priority}
        />
      </span>
    );
  }

  return (
    <span className={clsx("inline-block max-w-[min(100%,560px)]", invert && "[&_img]:brightness-0 [&_img]:invert")}>
      <Image
        src={SRC}
        alt="Templeton Custom Homes"
        width={WIDTH}
        height={HEIGHT}
        className="h-auto w-full"
        priority={priority}
      />
    </span>
  );
}
