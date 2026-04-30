import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects } from "@/lib/cms";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: project ? `${project.title} - Templeton Custom Homes` : "Project - Templeton Custom Homes",
    description: project?.description.slice(0, 155),
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const projects = await getProjects();
  if (!project) return notFound();
  const current = projects.findIndex((p) => p.slug === slug);
  const next = projects[(current + 1) % projects.length];

  return (
    <article>
      <Image src={project.heroImage} alt={`${project.title} hero image`} width={2200} height={1200} className="aspect-[16/9] w-full object-cover" priority />
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
        <h1 className="text-4xl lg:text-5xl">{project.title}</h1>
        <p className="mt-3 text-coastal-muted">
          {project.location} - {project.year} - {project.type}
          {project.style ? ` - ${project.style}` : ""}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-coastal-muted">{project.description}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Image src={project.heroImage} alt={`${project.title} gallery placeholder image one`} width={1000} height={700} className="rounded object-cover" />
          <Image src={project.heroImage} alt={`${project.title} gallery placeholder image two`} width={1000} height={700} className="rounded object-cover" />
        </div>
        <div className="mt-10 border border-coastal-line p-5 text-sm text-coastal-muted">
          [PLACEHOLDER: Optional details panel - square footage, bedrooms, baths, completion timeline, partner credits.]
        </div>
        <Link href={`/work/${next.slug}`} className="mt-10 inline-block underline">
          Next project
        </Link>
      </div>
    </article>
  );
}
