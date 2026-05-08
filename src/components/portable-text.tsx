import { PortableText as SanityPortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed">{children}</p>,
    h2: ({ children }) => <h2 className="mb-3 mt-6 text-2xl text-coastal-ink first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mb-2 mt-4 text-xl text-coastal-ink first:mt-0">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-coastal-accent pl-4 italic text-coastal-muted">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-coastal-ink">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => (
      <a href={value?.href} className="underline underline-offset-4 decoration-coastal-accent">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-2 pl-6 text-coastal-muted">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-2 pl-6 text-coastal-muted">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

type Props = {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
};

export function PortableText({ value, className }: Props) {
  if (!value?.length) return null;
  return (
    <div className={className}>
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
