import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-coastal-line bg-coastal-alt">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl">Templeton Custom Homes</p>
          <p className="mt-3 text-sm text-coastal-muted">High-end coastal homes built with open books.</p>
        </div>
        <nav className="flex flex-col gap-2" aria-label="Footer navigation">
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
          <Link href="/process">Process</Link>
          <Link href="/partners">Partners</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <div className="space-y-2 text-sm text-coastal-muted">
          <p>[PLACEHOLDER: License and bonding numbers pending Joel confirmation]</p>
          <p>
            We focus primarily on Newport Beach, Costa Mesa, and Corona del Mar, with extended service in Laguna Beach,
            Dana Point, San Clemente, Huntington Beach, Anaheim, and Irvine.
          </p>
          <p>Copyright {new Date().getFullYear()} Templeton Custom Homes</p>
        </div>
      </div>
    </footer>
  );
}
