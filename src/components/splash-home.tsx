import Link from "next/link";
import { ContactForm } from "@/components/contact-form";
import { SplashLogo } from "@/components/splash-logo";
import { FACEBOOK_URL } from "@/lib/splash";

export function SplashHome() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 lg:py-24">
      <SplashLogo variant="hero" priority />
      <h1 className="mt-8 text-4xl leading-tight lg:text-6xl">Our new site is on the way.</h1>
      <p className="mt-6 text-lg leading-relaxed text-coastal-muted">
        We are building a full website to showcase our work and process. In the meantime, follow us on Facebook for
        project photos and updates, or tell us about your build or remodel below — Joel reads every inquiry.
      </p>
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded px-5 py-3 text-white"
          style={{ backgroundColor: "var(--color-accent)" }}
        >
          Follow us on Facebook
        </a>
        <Link
          href="#start-a-project"
          className="inline-flex items-center justify-center border border-coastal-line bg-white px-5 py-3 underline-offset-4 hover:underline"
        >
          Start a project
        </Link>
      </div>

      <section id="start-a-project" className="mt-20 scroll-mt-24 border-t border-coastal-line pt-16">
        <h2 className="text-3xl lg:text-4xl">Start a project</h2>
        <p className="mt-4 text-coastal-muted">
          Share a few details and we will get back to you within one business day.
        </p>
        <div className="mt-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
