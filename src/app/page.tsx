import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SplashHome } from "@/components/splash-home";
import { getFeaturedProjects, getHomePage } from "@/lib/cms";
import { isSplashMode } from "@/lib/splash";
import {
  buildBreadcrumbSchema,
  buildHomeAndConstructionBusinessSchema,
  buildSchemaGraph,
  DEFAULT_DESCRIPTION,
  JsonLd,
  pageMetadata,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  if (isSplashMode()) {
    return pageMetadata({
      title: `${SITE_NAME} — Coming Soon`,
      description:
        "Itibari, Waynne & Partners — bringing stories to life. Something extraordinary is on the way.",
      path: "/",
    });
  }
  return pageMetadata({
    title: `${SITE_NAME} - ${SITE_TAGLINE}`,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  });
}

export default async function HomePage() {
  if (isSplashMode()) {
    return <SplashHome />;
  }

  const [home, featured] = await Promise.all([getHomePage(), getFeaturedProjects()]);
  const heroSrc =
    home.heroImageUrl ||
    featured[0]?.heroImage ||
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=75";

  const homeSchema = buildSchemaGraph(
    buildHomeAndConstructionBusinessSchema(),
    buildBreadcrumbSchema([{ name: "Home", path: "" }]),
  );

  return (
    <div>
      <JsonLd data={homeSchema} />
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:items-end lg:px-8 lg:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-coastal-muted">Templeton Custom Homes</p>
          <h1 className="mt-4 text-5xl leading-tight lg:text-7xl">{home.heroHeadline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-coastal-muted">{home.heroSubhead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/work" className="inline-block underline decoration-coastal-accent underline-offset-4">
              See our work
            </Link>
            <Link
              href="/contact"
              className="rounded px-5 py-2 text-white"
              style={{ backgroundColor: "var(--color-accent)" }}
            >
              Start Project
            </Link>
          </div>
        </div>
        <Image
          src={heroSrc}
          alt="Templeton Custom Homes project exterior"
          width={1600}
          height={1000}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full rounded object-cover"
          priority
        />
      </section>

      <section className="border-y border-coastal-line bg-coastal-alt">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-3xl leading-relaxed lg:text-4xl">{home.positioningStatement}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-3xl lg:text-4xl">Selected work</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {featured.map((project) => (
            <Link href={`/work/${project.slug}`} key={project._id} className="group">
              <Image
                src={project.heroImage}
                alt={`${project.title} project image`}
                width={1000}
                height={700}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="aspect-[3/2] w-full rounded object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              />
              <p className="mt-4 text-xl">{project.title}</p>
              <p className="text-sm text-coastal-muted">
                {project.location} - {project.year}
              </p>
            </Link>
          ))}
        </div>
        <Link href="/work" className="mt-8 inline-block underline">
          View all projects
        </Link>
      </section>

      <section className="border-y border-coastal-line bg-coastal-alt">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl lg:text-4xl">What we do</h2>
            <p className="mt-4 text-lg leading-relaxed text-coastal-muted">{home.whatWeDoPlain}</p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl">The TCH difference</h2>
            <ul className="mt-4 space-y-4 text-coastal-muted">
              {home.differencePillars.map((pillar) => (
                <li key={pillar.title}>
                  <strong className="text-coastal-ink">{pillar.title}:</strong> {pillar.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-3xl lg:text-4xl">{home.aboutPreviewHeading}</h2>
        <div className="mt-4 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div className="max-w-3xl text-lg text-coastal-muted">
            <p>{home.aboutPreviewPlain}</p>
          </div>
          {home.aboutPreviewPhotoUrl ? (
            <Image
              src={home.aboutPreviewPhotoUrl}
              alt="Joel Templeton and the Templeton Custom Homes team at a coastal Orange County project"
              width={800}
              height={600}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="rounded object-cover"
            />
          ) : null}
        </div>
        <Link href="/about" className="mt-6 inline-block underline">
          {home.aboutLearnMoreLabel}
        </Link>
      </section>

      <section className="border-t border-coastal-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 py-16 lg:px-8">
          <p className="text-2xl">{home.closingCtaHeading}</p>
          {home.closingCtaCopy ? <p className="max-w-2xl text-coastal-muted">{home.closingCtaCopy}</p> : null}
          <Link href="/contact" className="rounded px-5 py-3 text-white" style={{ backgroundColor: "var(--color-accent)" }}>
            {home.closingCtaButtonLabel}
          </Link>
        </div>
      </section>
    </div>
  );
}
