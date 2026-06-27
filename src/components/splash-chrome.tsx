import Link from "next/link";
import { SplashLogo } from "@/components/splash-logo";
import { LINKEDIN_URL } from "@/lib/splash";

export function SplashSiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-transparent">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <SplashLogo variant="header" priority tone="light" />
        </Link>
        <div className="flex flex-col gap-[5px]" aria-hidden="true">
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
          <span className="block h-[2px] w-6 bg-white" />
        </div>
      </div>
    </header>
  );
}

export function SplashSiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-12 text-sm text-white/40 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>&copy; {year} Itibari, Waynne &amp; Partners</p>
        {LINKEDIN_URL ? (
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white/70">
            LinkedIn
          </a>
        ) : null}
      </div>
    </footer>
  );
}
