import { ContactFormWizard } from "@/components/contact-form-wizard";
import { FACEBOOK_URL } from "@/lib/splash";

export function SplashHome() {
  const year = new Date().getFullYear();

  return (
    <section className="tch-splash-hero-bg relative isolate -mt-[4.75rem] flex min-h-dvh w-full flex-col pt-[4.75rem]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/55 via-black/40 to-black/50" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full flex-1 max-w-7xl items-center gap-10 px-6 py-10 md:grid-cols-2 md:gap-12 md:px-8 md:py-12 lg:gap-16">
        <div className="max-w-xl">
          <h1 className="text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-sm md:text-4xl lg:text-5xl">
            Our new site is on the way.
          </h1>
          <p className="mt-4 text-base leading-relaxed text-white/85 drop-shadow-sm lg:text-lg">
            Direct owner access. Itemized bids. Newport Beach, Costa Mesa, Corona del Mar.
          </p>
          <p className="mt-3 text-sm text-white/75">Joel reads every inquiry.</p>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded px-5 py-3 text-white shadow-lg shadow-black/20 transition-opacity hover:opacity-95"
            style={{ backgroundColor: "var(--color-accent-warm)" }}
          >
            Follow us on Facebook
          </a>
        </div>

        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/25 bg-rose-100/15 p-1 shadow-2xl shadow-black/25 backdrop-blur-md md:mx-0 md:max-w-lg md:justify-self-end lg:max-w-none">
          <ContactFormWizard appearance="glass" />
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-black/25 px-6 py-3 backdrop-blur-[2px] md:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs text-white/55 md:text-sm">
          Copyright {year} Templeton Custom Homes
          <span className="mx-2 text-white/35" aria-hidden="true">
            ·
          </span>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white/85">
            Facebook
          </a>
        </p>
      </div>
    </section>
  );
}
