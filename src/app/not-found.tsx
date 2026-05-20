import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Page Not Found - Templeton Custom Homes",
  description: "The page you requested could not be found on Templeton Custom Homes.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-8">
      <h1 className="text-4xl lg:text-5xl">Page not found</h1>
      <p className="mt-4 text-lg text-coastal-muted">
        The page you are looking for does not exist or may have moved.
      </p>
      <Link href="/" className="mt-8 inline-block underline decoration-coastal-accent underline-offset-4">
        Return home
      </Link>
    </div>
  );
}
