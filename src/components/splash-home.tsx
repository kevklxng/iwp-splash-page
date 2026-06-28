import { ContactFormWizard } from "@/components/contact-form-wizard";
import { SplashLogo } from "@/components/splash-logo";
import { LINKEDIN_URL } from "@/lib/splash";

export function SplashHome() {
  const year = new Date().getFullYear();

  return (
    <section className="iwp-splash-hero-bg relative isolate -mt-[4.75rem] flex min-h-dvh w-full flex-col pt-[4.75rem]">
      <div className="relative z-10 flex w-full flex-col items-center p-5 text-center">
        <SplashLogo variant="hero" priority tone="light" />
      </div>

      <div id="contact" className="relative z-10 mx-auto w-full max-w-xl px-6 pb-20 md:px-8">
        <ContactFormWizard />
      </div>

      <div className="relative z-10 border-t border-gray-200 bg-transparent px-6 py-4 md:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs text-gray-500 md:text-sm">
          &copy; {year} Itibari, Waynne &amp; Partners
          {LINKEDIN_URL ? (
            <>
              <span className="mx-2 text-gray-300" aria-hidden="true">·</span>
              <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-gray-800">
                LinkedIn
              </a>
            </>
          ) : null}
        </p>
      </div>
    </section>
  );
}
