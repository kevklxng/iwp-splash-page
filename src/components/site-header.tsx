"use client";

import Link from "next/link";
import { useState } from "react";

const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/process", label: "Process" },
  { href: "/partners", label: "Partners" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-coastal-line bg-[color:var(--color-bg)]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link href="/" className="text-xl tracking-wide">
          Templeton Custom Homes
        </Link>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="underline-offset-4 hover:underline">
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="rounded px-5 py-2 text-sm text-white transition-colors hover:bg-coastal-deep"
            style={{ backgroundColor: "var(--color-accent)" }}
          >
            Start a Project
          </Link>
        </nav>
        <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls="mobile-nav">
          Menu
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-coastal-line bg-coastal-bg md:hidden">
          <nav className="mx-auto flex min-h-[60vh] w-full max-w-7xl flex-col gap-6 px-6 py-8 text-2xl" aria-label="Mobile navigation">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setOpen(false)} className="underline">
              Start a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
