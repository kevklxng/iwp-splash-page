import Link from "next/link";
import { getSiteSettings } from "@/lib/cms";

export async function SiteFooter() {
  const settings = await getSiteSettings();

  return (
    <footer className="border-t border-coastal-line bg-coastal-alt">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl">Templeton Custom Homes</p>
          <p className="mt-3 text-sm text-coastal-muted">{settings.footerTagline}</p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Footer navigation">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/process">Process</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="space-y-2 text-sm text-coastal-muted">
          <p>{settings.licenseBondingText}</p>
          <p>{settings.serviceAreaNote}</p>
          <p>Copyright {new Date().getFullYear()} Templeton Custom Homes</p>
        </div>
      </div>
    </footer>
  );
}
