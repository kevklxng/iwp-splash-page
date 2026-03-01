import Hero from '../components/Hero'
import Stats from '../components/Stats'
import HomeAbout from '../components/HomeAbout'
import HomeProcess from '../components/HomeProcess'
import PageMeta from '../components/PageMeta'

export default function HomePage() {
  return (
    <>
      <PageMeta
        title="Templeton Custom Homes"
        description="Templeton Custom Homes - Crafting exceptional custom homes with precision and care. Design-build builder serving Newport Beach & Costa Mesa."
        path="/"
      />
      <Hero />
      <Stats />
      <HomeAbout />
      <HomeProcess />
    </>
  )
}
