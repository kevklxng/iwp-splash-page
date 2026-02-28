import { Link } from 'react-router-dom'

const featuredProject = {
  title: 'Modern Farmhouse',
  subtitle: 'Country Estate Custom Home',
  image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
}

const projects = [
  {
    title: 'Mountain Retreat',
    location: 'Lakeside',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    title: 'Classic Colonial',
    location: 'Historic District',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
  },
  {
    title: 'Contemporary',
    location: 'Urban Oasis',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
  },
  {
    title: 'Rustic Lodge',
    location: 'Woodland',
    image: 'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80',
  },
  {
    title: 'Coastal Living',
    location: 'Waterfront',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80',
  },
  {
    title: 'Hill Country Estate',
    location: 'Private Reserve',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
  },
]

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-warm-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
            Our Work
          </h2>
          <p className="mt-6 text-lg text-stone-600">
            A selection of custom homes we've had the privilege to build.
          </p>
        </div>

        <article className="mt-16 relative overflow-hidden rounded-lg aspect-[21/9] min-h-[280px] group">
          <img
            src={featuredProject.image}
            alt={featuredProject.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
            <p className="text-sm font-medium uppercase tracking-wider text-amber-200/90">
              Featured Project
            </p>
            <h3 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              {featuredProject.title}
            </h3>
            <p className="mt-1 text-lg text-stone-300">{featuredProject.subtitle}</p>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center px-6 py-3 bg-white text-stone-900 font-medium rounded-sm hover:bg-stone-100 transition-colors"
            >
              View Property Details
            </Link>
          </div>
        </article>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-serif text-xl font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-stone-300">{project.location}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
