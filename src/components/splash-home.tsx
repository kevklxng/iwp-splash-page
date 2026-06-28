import { ContactFormWizard } from "@/components/contact-form-wizard";
import { SplashLogo } from "@/components/splash-logo";
import { LINKEDIN_URL } from "@/lib/splash";

function SplashCopyright() {
  const year = new Date().getFullYear();

  return (
    <p className="text-center text-xs text-gray-500 md:text-sm">
      &copy; {year} Itibari, Waynne &amp; Partners
      {LINKEDIN_URL ? (
        <>
          <span className="mx-2 text-gray-300" aria-hidden="true">
            ·
          </span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-gray-800"
          >
            LinkedIn
          </a>
        </>
      ) : null}
    </p>
  );
}

export function SplashHome() {
  return (
    <section className="iwp-splash-hero-bg flex min-h-dvh w-full flex-col splash:h-full splash:min-h-0 splash:overflow-hidden">
      <div className="flex min-h-0 flex-1 flex-col splash:flex-row">
        <div className="flex shrink-0 items-center justify-center px-6 py-10 md:px-8 splash:sticky splash:top-0 splash:h-full splash:basis-0 splash:py-6 splash:pl-8 splash:pr-4 xl:pl-12 xl:pr-6 splash:grow">
          <SplashLogo variant="hero" priority tone="light" />
        </div>

        <div
          id="contact"
          className="min-h-0 flex-1 overflow-y-auto px-6 pb-10 md:px-8 splash:basis-0 splash:py-6 splash:pl-4 splash:pr-8 splash:pb-6 xl:pl-6 xl:pr-12 splash:grow"
        >
          <ContactFormWizard />
        </div>
      </div>

      <div className="shrink-0 border-t border-gray-200 bg-white px-6 py-4 md:px-8">
        <SplashCopyright />
      </div>
    </section>
  );
}
