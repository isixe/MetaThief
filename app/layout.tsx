import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Script from 'next/script'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto')
  const host = headersList.get('host')
  const url = `${protocol}://${host}`

  return {
    title: 'MetaThief',
    keywords: 'metadata, metathief, metadata viewer, metadata checker',
    description: 'Enter a URL to quickly get metadata details for any website.',
    alternates: {
      canonical: url
    },
    openGraph: {
      title: 'MetaThief',
      description:
        'Enter a URL to quickly get metadata details for any website.',
      url,
      siteName: 'MetaThief',
      locale: 'en',
      images: `${url}/preview.jpg`
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const analyticsScript = process.env.ANALYTICS_SCRIPT ?? ''

  return (
    <html lang="en">
      <head>
        {analyticsScript && (
          <Script
            src={analyticsScript}
            id="analytics"
            data-website-id="metathief"
            defer
          />
        )}
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
