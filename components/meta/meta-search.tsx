'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { MetaData } from '@/types/meta'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface MetaFormProps {
  setMetaData: (data: MetaData | null) => void
  setError: (error: string | null) => void
  compact?: boolean
}

export default function MetaForm({
  setMetaData,
  setError,
  compact = false
}: MetaFormProps) {
  const [url, setUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(
    'Invalid URL or unable to fetch meta data. Please try again.'
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic URL validation
    const urlPattern = /^https?:\/\/\S+/
    if (!url.trim() || !urlPattern.test(url)) {
      setShowError(true)
      setErrorMessage(
        'Please enter a valid URL starting with http:// or https://'
      )
      return
    }

    setIsLoading(true)
    setShowError(false)
    setError(null)

    try {
      const response = await fetch(`/api/meta?url=${encodeURIComponent(url)}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch meta data')
      }

      console.log(response.text)
      const data = await response.json()
      setMetaData(data)
    } catch (error) {
      setShowError(true)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Invalid URL or unable to fetch meta data. Please try again.'
      )
      setError(errorMessage)
      setMetaData(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`transition-all duration-500 ease-out ${compact ? 'w-full' : 'mx-auto w-full max-w-xl'}`}
    >
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="Enter website URL (e.g., https://example.com)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="flex-grow outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Fetching...' : <Search className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mt-2 h-6">
          {showError && (
            <p
              className="text-xs text-red-500"
              style={{ visibility: showError ? 'visible' : 'hidden' }}
            >
              {errorMessage}
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
