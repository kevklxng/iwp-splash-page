import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <main className="min-h-[70vh] pt-32 pb-24 flex flex-col items-center justify-center px-6">
      <Helmet>
        <title>Page Not Found | Templeton Custom Homes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <p className="text-sm font-medium uppercase tracking-widest text-stone-500">404</p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl font-medium text-stone-900 tracking-tight text-center">
        Page not found
      </h1>
      <p className="mt-4 text-lg text-stone-600 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center px-8 py-4 bg-stone-900 text-white font-medium rounded-sm hover:bg-stone-800 transition-colors"
      >
        Back to Home
      </Link>
    </main>
  )
}
