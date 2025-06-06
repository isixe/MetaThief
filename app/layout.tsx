import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/global.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const protocol = headersList.get('x-forwarded-proto') || 'http'
  const host = headersList.get('host') || 'localhost:3000'
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
      images: '/preview.jpg'
    }
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body>
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}
