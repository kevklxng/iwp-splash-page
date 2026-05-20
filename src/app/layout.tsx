import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SplashSiteHeader } from "@/components/splash-chrome";
import { isSplashMode } from "@/lib/splash";

/** Read splash flag at request time so Vercel env changes apply without a rebuild. */
export const dynamic = "force-dynamic";
import {
  buildOrganizationSchema,
  buildSchemaGraph,
  buildWebSiteSchema,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  JsonLd,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/seo";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} - ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

const globalSchema = buildSchemaGraph(buildOrganizationSchema(), buildWebSiteSchema());

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  return (
    <html lang="en" className={sourceSerif.variable}>
      <body>
        <JsonLd data={globalSchema} />
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
        {isSplashMode() ? <SplashSiteHeader /> : <SiteHeader />}
        <main>{children}</main>
        {isSplashMode() ? null : (
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
