import Link from "next/link";
import { SplashLogo } from "@/components/splash-logo";
import { FACEBOOK_URL } from "@/lib/splash";

export function SplashSiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-b from-black/55 via-black/25 to-transparent backdrop-blur-[2px]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <SplashLogo variant="header" priority tone="light" />
        </Link>
      </div>
    </header>
  );
}

export function SplashSiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-[#111210]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-12 text-sm text-white/50 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>Copyright {year} Templeton Custom Homes</p>
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white/80">
          Facebook
        </a>
      </div>
    </footer>
  );
}
