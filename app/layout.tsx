import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import { Toaster } from '@/components/ui/toaster'
import '@/styles/global.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MetaThief',
  description:
    'Enter a URL to quickly get metadata, icons, and social media preview data for any website.'
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
