/* eslint-disable @next/next/no-img-element */
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import type { MetaData } from '@/types/meta'
import { Check, Copy, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface MetaResultsProps {
  metaData: MetaData
}

export default function MetaResults({ metaData }: MetaResultsProps) {
  const [copiedFields, setCopiedFields] = useState<{ [key: string]: boolean }>(
    {}
  )

  const handleCopy = (text: string | undefined, field: string) => {
    const contentToCopy = text || ''
    navigator.clipboard.writeText(contentToCopy)
    setCopiedFields({ ...copiedFields, [field]: true })

    if (contentToCopy) {
      toast.success('Copied to clipboard!')
    } else {
      toast.success('Copied empty content!')
    }

    setTimeout(() => {
      setCopiedFields({ ...copiedFields, [field]: false })
    }, 2000)
  }

  const metaExplanations: { [key: string]: string } = {
    title:
      "The title of the webpage, typically displayed in the browser's title bar or tab.",
    description:
      "A brief summary of the webpage's content, often used in search engine results.",
    keywords: "Relevant words or phrases that describe the webpage's content.",
    author:
      "The creator or organization responsible for the webpage's content.",
    favicon:
      "Icons associated with the website, displayed in the browser's address bar, bookmarks, or tabs.",
    charset: 'The character encoding of the webpage.',
    viewport: 'Controls how the webpage is displayed on mobile devices.',
    generator: 'The software used to generate the webpage.',
    theme: 'The color theme of the webpage.',
    canonical: 'The preferred URL of the webpage.',
    language: 'The language of the webpage content.',
    ogTitle:
      'The title of the webpage when shared on social media platforms (Open Graph).',
    ogDescription:
      'A description of the webpage when shared on social media platforms (Open Graph).',
    ogImage:
      'An image representing the webpage when shared on social media platforms (Open Graph).',
    twitterCard:
      'Specifies the type of Twitter Card to be created when the webpage is shared on Twitter.',
    twitterTitle: 'The title of the webpage when shared on Twitter.',
    twitterDescription: 'A description of the webpage when shared on Twitter.',
    twitterImage: 'An image representing the webpage when shared on Twitter.'
  }

  // Extract icons array from metaData
  const { icons, ...metaInfo } = metaData

  // Define all possible meta tags to display, even if empty
  const allMetaTags = [
    'title',
    'description',
    'keywords',
    'author',
    'favicon',
    'charset',
    'viewport',
    'robots',
    'generator',
    'theme',
    'canonical',
    'language',
    'ogTitle',
    'ogDescription',
    'ogImage',
    'twitterCard',
    'twitterTitle',
    'twitterDescription',
    'twitterImage'
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meta Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {allMetaTags.map((key) => (
              <li key={key} className="border-b pb-3 last:border-b-0 last:pb-0">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center">
                    <h3 className="mr-2 text-lg font-medium capitalize">
                      {key}
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0"
                          >
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right" className="max-w-[300px]">
                          <p className="break-words">
                            {metaExplanations[key] ||
                              `Information about the ${key}`}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(metaInfo[key], key)}
                  >
                    {copiedFields[key] ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {key === 'favicon' && icons && icons.length > 0 ? (
                  <div className="mt-2">
                    <div className="mb-2 flex items-start gap-2">
                      <div className="relative h-6 w-6 flex-shrink-0 overflow-hidden rounded border">
                        <img
                          src={metaInfo.favicon || '/placeholder.svg'}
                          alt="Primary Favicon"
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src =
                              '/placeholder.svg?height=24&width=24'
                          }}
                        />
                      </div>
                      <p className="break-all text-sm">
                        {metaInfo.favicon || (
                          <span className="italic text-gray-400">
                            Not available
                          </span>
                        )}
                      </p>
                    </div>
                    <div className="mt-3">
                      <p className="mb-2 text-sm font-medium">All icons:</p>
                      <ScrollArea className="w-full whitespace-nowrap rounded-md border">
                        <div className="flex gap-4 p-4">
                          {icons.map((icon, index) => (
                            <div
                              key={index}
                              className="flex flex-shrink-0 flex-col items-center"
                            >
                              <div className="relative mb-2 h-16 w-16 overflow-hidden rounded border">
                                <img
                                  src={icon || '/placeholder.svg'}
                                  alt={`Icon ${index + 1}`}
                                  className="h-full w-full object-contain"
                                  onError={(e) => {
                                    e.currentTarget.src =
                                      '/placeholder.svg?height=64&width=64'
                                  }}
                                />
                              </div>
                              <div className="flex items-center">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleCopy(icon, `icon-${index}`)
                                  }
                                >
                                  {copiedFields[`icon-${index}`] ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0"
                                      >
                                        <HelpCircle className="h-4 w-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-[300px]">
                                      <p className="break-words">
                                        Icon URL: {icon}
                                      </p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                ) : (
                  <div className="break-words text-sm">
                    {metaInfo[key] ? (
                      <p className="whitespace-pre-wrap break-all">
                        {metaInfo[key]}
                      </p>
                    ) : (
                      <span className="italic text-gray-400">
                        Not available
                      </span>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
