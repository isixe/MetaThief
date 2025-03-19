'use client'

import MetaResults from '@/components/meta/meta-results'
import MetaForm from '@/components/meta/meta-search'
import type { MetaData } from '@/types/meta'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function Home() {
  const [metaData, setMetaData] = useState<MetaData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (data: MetaData | null) => {
    setMetaData(data)
    setHasSearched(true)
  }

  return (
    <main className="min-h-screen">
      <div
        className={`container mx-auto p-4 transition-all duration-500 ease-out ${hasSearched ? '' : 'flex h-screen flex-col items-center justify-center'} `}
      >
        <div
          className={`origin-top transition-all duration-500 ease-out ${hasSearched ? 'translate-y-0 scale-100' : '-translate-y-1/4 scale-125'} `}
        >
          <h1 className="mb-4 text-center text-4xl font-bold">MetaThief</h1>
          <p
            className={`mb-8 text-center text-sm text-muted-foreground transition-all duration-500`}
          >
            Enter a URL to quickly get metadata, icons, and social media preview
            data for any website.
          </p>
          <MetaForm
            setMetaData={handleSearch}
            setError={setError}
            compact={hasSearched}
          />
        </div>
        <div
          className={`transition-all delay-200 duration-500 ease-out ${hasSearched ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} `}
        >
          {metaData && <MetaResults metaData={metaData} />}
        </div>
      </div>
      <Toaster />
    </main>
  )
}
