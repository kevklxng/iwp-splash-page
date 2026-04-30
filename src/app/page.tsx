import Image from "next/image";
import Link from "next/link";
import { defaultPageContent, getFeaturedProjects } from "@/lib/cms";

export default async function HomePage() {
  const featured = await getFeaturedProjects();

  return (
    <div>
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-12 lg:grid-cols-2 lg:items-end lg:px-8 lg:py-20">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-coastal-muted">Templeton Custom Homes</p>
          <h1 className="mt-4 text-5xl leading-tight lg:text-7xl">{defaultPageContent.home.heroHeadline}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-coastal-muted">{defaultPageContent.home.heroSubhead}</p>
          <Link href="/work" className="mt-8 inline-block underline decoration-coastal-accent underline-offset-4">
            See our work
          </Link>
        </div>
        <Image
          src={featured[0]?.heroImage || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"}
          alt="Placeholder completed Templeton Custom Homes project exterior view"
          width={1600}
          height={1000}
          className="h-full w-full rounded object-cover"
          priority
        />
      </section>

      <section className="border-y border-coastal-line bg-coastal-alt">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 lg:py-24">
          <p className="text-3xl leading-relaxed lg:text-4xl">{defaultPageContent.home.positioning}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-3xl lg:text-4xl">Selected work</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {featured.map((project) => (
            <Link href={`/work/${project.slug}`} key={project._id} className="group">
              <Image src={project.heroImage} alt={`${project.title} placeholder project image`} width={1000} height={700} className="aspect-[3/2] w-full rounded object-cover transition-transform duration-200 group-hover:scale-[1.02]" />
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
            <p className="mt-4 text-lg leading-relaxed text-coastal-muted">{defaultPageContent.home.whatWeDo}</p>
          </div>
          <div>
            <h2 className="text-3xl lg:text-4xl">The TCH difference</h2>
            <ul className="mt-4 space-y-4 text-coastal-muted">
              <li><strong className="text-coastal-ink">High-End:</strong> Premium quality without premium mystery.</li>
              <li><strong className="text-coastal-ink">Honest:</strong> Itemized bids, monthly invoices with receipts, fee billed at actual percentage complete.</li>
              <li><strong className="text-coastal-ink">Dependable:</strong> 6-10 simultaneous projects with direct owner access and personal accountability.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <h2 className="text-3xl lg:text-4xl">About Joel</h2>
        <p className="mt-4 max-w-3xl text-lg text-coastal-muted">
          [PLACEHOLDER: Joel&apos;s origin story. Rough notes pending polish - see CONTENT.md for structure and replacement guidance.]
        </p>
        <Link href="/about" className="mt-6 inline-block underline">
          Learn more about Joel
        </Link>
      </section>

      <section className="border-t border-coastal-line">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-6 py-16 lg:px-8">
          <p className="text-2xl">Ready to start a project with a transparent process and direct owner access?</p>
          <Link href="/contact" className="rounded px-5 py-3 text-white" style={{ backgroundColor: "var(--color-accent)" }}>
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}
