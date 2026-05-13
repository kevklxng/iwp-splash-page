import { ContactFormWizard } from "@/components/contact-form-wizard";
import { FACEBOOK_URL } from "@/lib/splash";

export function SplashHome() {
  const year = new Date().getFullYear();

  return (
    <section className="tch-splash-hero-bg relative isolate -mt-[4.75rem] flex min-h-dvh w-full flex-col pt-[4.75rem]">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/55 via-black/40 to-black/50" aria-hidden />

      <div className="relative z-10 mx-auto grid w-full flex-1 max-w-7xl items-center gap-10 px-6 py-10 md:grid-cols-2 md:gap-12 md:px-8 md:py-12 lg:gap-16">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl [text-shadow:0_1px_2px_rgba(0,0,0,0.30),0_8px_24px_rgba(0,0,0,0.35)]">
            Custom homes built on open books.
          </h1>
          <h2 className="mt-4 text-xl font-normal leading-relaxed text-white/90 sm:text-2xl lg:text-3xl [text-shadow:0_1px_2px_rgba(0,0,0,0.25),0_6px_18px_rgba(0,0,0,0.28)]">
            Your bid is itemized. Your dollars are accounted for, line by line.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/80 lg:text-lg [text-shadow:0_1px_2px_rgba(0,0,0,0.25),0_4px_12px_rgba(0,0,0,0.22)]">
            Serving Newport Beach, Costa Mesa, Corona del Mar, and across South Orange County.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md rounded-2xl border border-white/25 bg-rose-100/15 p-1 shadow-2xl shadow-black/25 backdrop-blur-md md:mx-0 md:max-w-lg md:justify-self-end lg:max-w-none">
          <ContactFormWizard appearance="glass" />
        </div>
      </div>

      <div className="relative z-10 border-t border-white/10 bg-transparent px-6 py-3 md:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs text-white/55 md:text-sm">
          Copyright {year} Templeton Custom Homes
          <span className="mx-2 text-white/35" aria-hidden="true">
            ·
          </span>
          We&apos;re working on our new website — stay tuned.
          <span className="mx-2 text-white/35" aria-hidden="true">
            ·
          </span>
          License #1059236
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
