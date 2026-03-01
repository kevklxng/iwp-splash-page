import Gallery from '../components/Gallery'
import PageMeta from '../components/PageMeta'

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <PageMeta
        title="Gallery"
        description="View our portfolio of custom homes. A selection of projects we've built in Newport Beach, Costa Mesa, and surrounding areas."
        path="/gallery"
      />
      <Gallery />
    </main>
  )
}
