import { SplashMainArea } from "@/components/splash-main-area";
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
      <SplashMainArea />

      <div className="shrink-0 border-t border-gray-200 bg-white px-6 py-4 md:px-8">
        <SplashCopyright />
      </div>
    </section>
  );
}
