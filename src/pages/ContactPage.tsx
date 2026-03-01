import Contact from '../components/Contact'
import PageMeta from '../components/PageMeta'

export default function ContactPage() {
  return (
    <main className="pt-20">
      <PageMeta
        title="Contact"
        description="Get in touch with Templeton Custom Homes. Start your custom home project with a free consultation. Newport Beach & Costa Mesa."
        path="/contact"
      />
      <Contact />
    </main>
  )
}
