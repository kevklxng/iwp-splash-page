import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SplashSiteFooter, SplashSiteHeader } from "@/components/splash-chrome";
import { isSplashMode } from "@/lib/splash";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tch.placeholder"),
  title: "Templeton Custom Homes - Newport Beach Custom Builder",
  description:
    "High-end coastal homes and remodels in Newport Beach, Costa Mesa, and Corona del Mar with itemized bids and direct owner access.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  return (
    <html lang="en" className={sourceSerif.variable}>
      <body>
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
            </Script>
          </>
        ) : null}
        {isSplashMode ? <SplashSiteHeader /> : <SiteHeader />}
        <main>{children}</main>
        {isSplashMode ? (
          <SplashSiteFooter />
        ) : (
          <Suspense
            fallback={
              <footer className="border-t border-coastal-line bg-coastal-alt">
                <div className="mx-auto w-full max-w-7xl px-6 py-12 text-sm text-coastal-muted lg:px-8">
                  Templeton Custom Homes
                </div>
              </footer>
            }
          >
            <SiteFooter />
          </Suspense>
        )}
      </body>
    </html>
  );
}
