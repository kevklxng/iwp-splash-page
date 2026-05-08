import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@/components/portable-text";
import { blocksToPlainText, getProjectBySlug, getProjects } from "@/lib/cms";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const plain =
    project?.descriptionBlocks?.length ? blocksToPlainText(project.descriptionBlocks) : project?.description ?? "";
  return {
    title: project ? `${project.title} - Templeton Custom Homes` : "Project - Templeton Custom Homes",
    description: plain ? plain.slice(0, 155) : undefined,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const projects = await getProjects();
  if (!project) return notFound();
  const current = projects.findIndex((p) => p.slug === slug);
  const next = projects[(current + 1) % projects.length];

  const galleryImages =
    project.gallery?.filter(Boolean).length ? project.gallery! : [project.heroImage, project.heroImage].slice(0, 2);

  return (
    <article>
      <Image
        src={project.heroImage}
        alt={`${project.title} hero image`}
        width={2200}
        height={1200}
        sizes="100vw"
        className="aspect-[16/9] w-full object-cover"
        priority
      />
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">
        <h1 className="text-4xl lg:text-5xl">{project.title}</h1>
        <p className="mt-3 text-coastal-muted">
          {project.location} - {project.year} - {project.type}
          {project.style ? ` - ${project.style}` : ""}
        </p>
        <div className="mt-8 text-lg leading-relaxed text-coastal-muted">
          {project.descriptionBlocks?.length ? (
            <PortableText value={project.descriptionBlocks} />
          ) : (
            <p>{project.description}</p>
          )}
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {galleryImages.map((src, i) => (
            <Image
              key={`${src}-${i}`}
              src={src}
              alt={`${project.title} gallery image ${i + 1}`}
              width={1000}
              height={700}
              sizes="(min-width: 640px) 50vw, 100vw"
              className="rounded object-cover"
            />
          ))}
        </div>
        {project.details?.length ? (
          <div className="mt-10 border border-coastal-line p-5 text-sm text-coastal-muted">
            <dl className="grid gap-3 sm:grid-cols-2">
              {project.details.map((d) => (
                <div key={d.label}>
                  <dt className="font-medium text-coastal-ink">{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : (
          <div className="mt-10 border border-coastal-line p-5 text-sm text-coastal-muted">
            [Optional project details can be added in Sanity: square footage, bedrooms, baths, timeline, credits.]
          </div>
        )}
        <Link href={`/work/${next.slug}`} className="mt-10 inline-block underline">
          Next project
        </Link>
      </div>
    </article>
  );
}
