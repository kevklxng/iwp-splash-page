import { ContactFormWizard } from "@/components/contact-form-wizard";
import { SplashLogo } from "@/components/splash-logo";
import { LINKEDIN_URL } from "@/lib/splash";

export function SplashHome() {
  const year = new Date().getFullYear();

  return (
    <section className="iwp-splash-hero-bg relative isolate -mt-[4.75rem] flex min-h-dvh w-full flex-col pt-[4.75rem]">
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-6 py-16 text-center md:px-8">
        <div className="mb-10">
          <SplashLogo variant="hero" priority tone="light" />
        </div>

        <h1 className="max-w-3xl text-3xl font-bold uppercase tracking-[0.15em] text-white sm:text-4xl lg:text-5xl">
          Bringing Stories to Life
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 lg:text-lg">
          Something extraordinary is on the way. Stay tuned.
        </p>

        <a
          href="#contact"
          className="mt-10 inline-flex items-center justify-center rounded-lg bg-black px-10 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white ring-1 ring-white/20 transition-all hover:bg-white hover:text-black"
        >
          Learn More
        </a>
      </div>

      <div id="contact" className="relative z-10 mx-auto w-full max-w-xl px-6 pb-20 md:px-8">
        <ContactFormWizard />
      </div>

      <div className="relative z-10 border-t border-white/10 bg-transparent px-6 py-4 md:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs text-white/40 md:text-sm">
          &copy; {year} Itibari, Waynne &amp; Partners
          {LINKEDIN_URL ? (
            <>
              <span className="mx-2 text-white/20" aria-hidden="true">·</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-white/70">
                LinkedIn
              </a>
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
}
