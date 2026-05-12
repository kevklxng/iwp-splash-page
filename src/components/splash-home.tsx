import { ContactFormWizard } from "@/components/contact-form-wizard";
import { SplashLogo } from "@/components/splash-logo";
import { FACEBOOK_URL } from "@/lib/splash";

export function SplashHome() {
  return (
    <section className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 py-10 lg:min-h-[calc(100dvh-64px)] lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-12">
      <div className="max-w-xl">
        <SplashLogo variant="hero" priority />
        <h1 className="mt-6 text-3xl leading-tight text-coastal-ink lg:text-5xl">Our new site is on the way.</h1>
        <p className="mt-4 text-base leading-relaxed text-coastal-muted lg:text-lg">
          Direct owner access. Itemized bids. Newport Beach, Costa Mesa, Corona del Mar.
        </p>
        <p className="mt-3 text-sm text-coastal-muted">Joel reads every inquiry.</p>
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-5 py-3 text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Follow us on Facebook
        </a>
      </div>
      <div className="w-full max-w-lg justify-self-end lg:max-w-none">
        <ContactFormWizard />
      </div>
    </section>
  );
}
