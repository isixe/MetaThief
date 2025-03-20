'use client'

import MetaResults from '@/components/meta/meta-results'
import MetaForm from '@/components/meta/meta-search'
import type { MetaData } from '@/types/meta'
import { useState } from 'react'

export default function Home() {
  const [metaData, setMetaData] = useState<MetaData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (data: MetaData | null) => {
    setMetaData(data)
    setHasSearched(true)
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <div
        className={`container mx-auto px-4 py-4 transition-all duration-500 ease-out md:p-4 ${
          hasSearched
            ? ''
            : 'flex min-h-screen flex-col items-center justify-center'
        }`}
      >
        <div
          className={`max-w-full origin-top transition-all duration-500 ease-out ${
            hasSearched
              ? 'translate-y-0 scale-100'
              : '-translate-y-1/4 scale-110 p-5 sm:scale-125'
          }`}
        >
          <h1 className="mb-4 text-center text-3xl font-bold sm:text-4xl">
            MetaThief
          </h1>
          <p
            className={`mb-6 px-2 text-center text-xs text-muted-foreground transition-all duration-500 sm:mb-8 sm:text-sm`}
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
          className={`transition-all delay-200 duration-500 ease-out ${
            hasSearched
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          {metaData && <MetaResults metaData={metaData} />}
        </div>
      </div>
    </main>
  )
}
