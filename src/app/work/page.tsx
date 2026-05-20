import Image from "next/image";
import Link from "next/link";
import { getProjects, getWorkPage } from "@/lib/cms";
import { buildBreadcrumbSchema, buildSchemaGraph, JsonLd, pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Work - Templeton Custom Homes",
  description: "Eight projects from across coastal Orange County. New builds, remodels, additions, and ADUs.",
  path: "/work",
});

const workSchema = buildSchemaGraph(
  buildBreadcrumbSchema([
    { name: "Home", path: "" },
    { name: "Work", path: "/work" },
  ]),
);

export default async function WorkPage() {
  const [projects, work] = await Promise.all([getProjects(), getWorkPage()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <JsonLd data={workSchema} />
      <h1 className="text-4xl lg:text-5xl">Work</h1>
      <p className="mt-5 max-w-3xl text-lg text-coastal-muted">{work.intro}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Link href={`/work/${project.slug}`} key={project._id} className="group">
            <Image
              src={project.heroImage}
              alt={`${project.title} project exterior`}
              width={1000}
              height={1200}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-[4/5] w-full rounded object-cover transition-transform duration-200 group-hover:scale-[1.02]"
              priority={index === 0}
            />
            <p className="mt-4 text-xl">{project.title}</p>
            <p className="text-sm text-coastal-muted">
              {project.location} - {project.year} - {project.type}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
