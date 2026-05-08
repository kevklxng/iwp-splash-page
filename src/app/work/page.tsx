import Image from "next/image";
import Link from "next/link";
import { getProjects, getWorkPage } from "@/lib/cms";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work - Templeton Custom Homes",
  description: "Eight projects from across coastal Orange County. New builds, remodels, additions, and ADUs.",
};

export default async function WorkPage() {
  const [projects, work] = await Promise.all([getProjects(), getWorkPage()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
      <h1 className="text-4xl lg:text-5xl">Work</h1>
      <p className="mt-5 max-w-3xl text-lg text-coastal-muted">{work.intro}</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link href={`/work/${project.slug}`} key={project._id} className="group">
            <Image
              src={project.heroImage}
              alt={`${project.title} project exterior`}
              width={1000}
              height={1200}
              sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="aspect-[4/5] w-full rounded object-cover transition-transform duration-200 group-hover:scale-[1.02]"
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
