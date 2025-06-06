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
import { ImagePreview } from '@/components/widget/image-preview'
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
    language:
      "Specifies the primary language of the webpage's content using language codes (e.g., 'en' for English).",
    charset:
      "Defines the character encoding used for the webpage, typically 'UTF-8' to support international characters.",
    viewport:
      'Controls how the webpage is displayed on various devices, especially important for responsive design.',
    title:
      "The title of the webpage, displayed in the browser's tab and used in search engine results.",
    description:
      "A concise summary of the webpage's content, often displayed in search engine results.",
    keywords:
      "Relevant words or phrases that describe the webpage's content to help with search engine indexing.",
    favicon:
      'The small icon associated with the website, displayed in browser tabs, bookmarks, and history.',
    author:
      'Identifies the person or organization responsible for creating the webpage content.',
    generator: 'Indicates the software or system used to generate the webpage.',
    theme:
      'Specifies the color theme of the webpage, particularly for mobile browsers.',
    canonical:
      'Indicates the preferred URL for the webpage to prevent duplicate content issues.',
    ogUrl:
      'The canonical URL of the webpage for Open Graph protocol when shared on social media.',
    ogTitle:
      'The title of the webpage when shared on social media platforms using Open Graph protocol.',
    ogSiteName:
      'The name of the overall website when content is shared via Open Graph protocol.',
    ogDescription:
      'A description of the webpage when shared on social media using Open Graph protocol.',
    ogImage:
      'The URL of an image that represents the webpage when shared via Open Graph protocol.',
    ogImageAlt:
      'Alternative text for the Open Graph image for accessibility purposes.',
    ogType:
      "Specifies the type of content being shared (e.g., 'website', 'article') via Open Graph.",
    twitterSite:
      'The Twitter @username of the website or publisher for Twitter Card metadata.',
    twitterCard:
      'Specifies the type of Twitter Card to be used when the webpage is shared on Twitter.',
    twitterTitle: 'The title of the webpage when shared on Twitter.',
    twitterCreator:
      'The Twitter @username of the content creator for attribution in Twitter Cards.',
    twitterDescription: 'A description of the webpage when shared on Twitter.',
    twitterImage:
      'The URL of an image that represents the webpage when shared on Twitter.',
    robots:
      'Provides instructions to search engine crawlers about how to index the webpage.'
  }

  // Extract icons array from metaData
  const { icons, ...metaInfo } = metaData

  // Define all possible meta tags to display, even if empty
  const allMetaTags = [
    'language',
    'charset',
    'viewport',
    'title',
    'description',
    'keywords',
    'favicon',
    'author',
    'generator',
    'theme',
    'canonical',
    'ogUrl',
    'ogTitle',
    'ogSiteName',
    'ogDescription',
    'ogImage',
    'ogImageAlt',
    'ogType',
    'twitterSite',
    'twitterCard',
    'twitterTitle',
    'twitterCreator',
    'twitterDescription',
    'twitterImage',
    'robots'
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
                        <ImagePreview
                          src={metaInfo.favicon || '/placeholder.svg'}
                          alt="Primary Favicon"
                          className="h-full w-full object-contain"
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
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))]">
                          {icons.map((icon, index) => (
                            <div
                              key={index}
                              className="mt-2 flex flex-col items-center"
                            >
                              <div className="relative mb-2 h-16 w-16 rounded border">
                                <ImagePreview
                                  src={icon || '/placeholder.svg'}
                                  alt={`Icon ${index + 1}`}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                              <div className="grid grid-cols-2">
                                <Button
                                  className="px-2"
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
                                      <p className="whitespace-break-spaces break-all">
                                        {icon}
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
