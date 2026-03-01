import About from '../components/About'
import PageMeta from '../components/PageMeta'

export default function AboutPage() {
  return (
    <main className="pt-20">
      <PageMeta
        title="About"
        description="Learn about Templeton Custom Homes - design-build custom home builders. Craftsmanship, partnership, and integrity in Newport Beach and Costa Mesa."
        path="/about"
      />
      <About />
    </main>
  )
}
