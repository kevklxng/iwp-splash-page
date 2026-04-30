import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Joel Templeton - Templeton Custom Homes",
  description: "Meet the owner behind Templeton Custom Homes and learn how projects are run with direct accountability.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-14 lg:px-8 lg:py-20">
      <h1 className="text-4xl lg:text-5xl">About Joel Templeton</h1>
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 text-lg leading-relaxed text-coastal-muted">
          <p>
            [PLACEHOLDER: Joel&apos;s origin story. Rough notes pending polish - see brief Section 7. Suggested structure:
            (1) what Joel did before TCH, (2) the moment he decided to start the company, (3) the specific frustration
            with the industry that drives the TCH approach, (4) what he wants every client experience to feel like.]
          </p>
          <p>[PLACEHOLDER: Team section - add names and roles for key team members once confirmed.]</p>
          <p>[PLACEHOLDER: Industry background and credentials, including licensing and bonding details.]</p>
        </div>
        <Image
          src="https://images.unsplash.com/photo-1595514535415-dae4f6c8b742?auto=format&fit=crop&w=1400&q=80"
          alt="Placeholder portrait representing Joel Templeton"
          width={900}
          height={1200}
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="rounded object-cover"
        />
      </div>
    </div>
  );
}
