import { Helmet } from 'react-helmet-async'

const SITE_NAME = 'Templeton Custom Homes'
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'

type PageMetaProps = {
  title: string
  description: string
  path?: string
  image?: string
}

export default function PageMeta({ title, description, path = '', image = DEFAULT_IMAGE }: PageMetaProps) {
  const siteUrl = typeof import.meta.env.VITE_SITE_URL === 'string' && import.meta.env.VITE_SITE_URL
    ? import.meta.env.VITE_SITE_URL.replace(/\/$/, '')
    : (typeof window !== 'undefined' ? window.location.origin : '')
  const canonicalUrl = `${siteUrl}${path ? (path.startsWith('/') ? path : `/${path}`) : ''}`

  return (
    <Helmet>
      <title>{title === SITE_NAME ? title : `${title} | ${SITE_NAME}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
    </Helmet>
  )
}
