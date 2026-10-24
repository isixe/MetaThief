'use client'

import type React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { MetaData } from '@/types/meta'
import { Search } from 'lucide-react'
import { useState } from 'react'

interface MetaFormProps {
  setMetaData: (data: MetaData | null, sourceUrl?: string) => void
  compact?: boolean
}

const normalizeUrl = (value: string) => {
  const trimmed = value.trim()
  if (!trimmed) return ''
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)) return ''
  return `https://${trimmed.replace(/^\/+/, '')}`
}

const isValidUrl = (value: string) => {
  try {
    const { protocol } = new URL(value)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

export default function MetaForm({
  setMetaData,
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

    const targetUrl = normalizeUrl(url)
    if (!isValidUrl(targetUrl)) {
      setShowError(true)
      setErrorMessage(
        'Please enter a valid URL or domain (e.g., example.com or https://example.com/page)'
      )
      return
    }

    setIsLoading(true)
    setShowError(false)

    try {
      const response = await fetch(
        `/api/meta?url=${encodeURIComponent(targetUrl)}`
      )
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch meta data')
      }

      const data = await response.json()
      setUrl(targetUrl)
      setMetaData(data, targetUrl)
    } catch (error) {
      setShowError(true)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Invalid URL or unable to fetch meta data. Please try again.'
      )
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
            type="text"
            inputMode="url"
            autoComplete="url"
            placeholder="Enter a URL or domain (e.g., example.com/page)"
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
