const projects = [
  {
    title: 'Modern Farmhouse',
    location: 'Country Estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
  },
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

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-sm aspect-[4/3]"
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
