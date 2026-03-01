import Services from '../components/Services'
import PageMeta from '../components/PageMeta'

export default function ServicesPage() {
  return (
    <main className="pt-20">
      <PageMeta
        title="Services"
        description="Custom home design and construction, new builds, renovations, and additions. Full-service design-build in Newport Beach and Costa Mesa."
        path="/services"
      />
      <Services />
    </main>
  )
}
