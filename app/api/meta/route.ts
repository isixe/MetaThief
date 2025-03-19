import { NextResponse } from 'next/server'

// All supported meta tags
const SUPPORTED_META_TAGS = [
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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const metaParams = searchParams
      .get('meta')
      ?.split(',')
      .map((param) => param.trim())

    // Validate URL parameter
    if (!url) {
      return NextResponse.json(
        {
          error: 'Missing URL parameter',
          example: '/api/meta?url=https://example.com&meta=title,description'
        },
        { status: 400 }
      )
    }

    if (!url.startsWith('http')) {
      return NextResponse.json(
        {
          error: 'Invalid URL. URL must start with http:// or https://',
          example: '/api/meta?url=https://example.com'
        },
        { status: 400 }
      )
    }

    // Validate meta parameters
    if (metaParams) {
      const invalidParams = metaParams.filter(
        (param) => !SUPPORTED_META_TAGS.includes(param)
      )
      if (invalidParams.length > 0) {
        return NextResponse.json(
          {
            error: `Invalid meta parameters: ${invalidParams.join(', ')}`,
            supportedParams: SUPPORTED_META_TAGS
          },
          { status: 400 }
        )
      }
    }

    // Fetch the HTML content
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(
        `Failed to fetch URL: ${response.status} ${response.statusText}`
      )
    }

    const html = await response.text()
    const baseUrl = new URL(url)

    // Helper function to resolve relative URLs
    const resolveUrl = (href: string) => {
      if (!href) return ''
      try {
        return new URL(href, url).href
      } catch (e) {
        if (href.startsWith('/')) {
          return `${baseUrl.origin}${href}`
        } else {
          return `${url.replace(/\/$/, '')}/${href.replace(/^\//, '')}`
        }
      }
    }

    // Helper function to extract content from HTML tags
    const extractTag = (tag: string, html: string): string => {
      const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'is')
      const match = html.match(regex)
      return match ? match[1].trim() : ''
    }

    // Helper function to extract attribute from HTML tags
    const extractAttribute = (
      tag: string,
      attribute: string,
      html: string
    ): string => {
      const regex = new RegExp(
        `<${tag}[^>]*${attribute}=["']([^"']*)["'][^>]*>`,
        'i'
      )
      const match = html.match(regex)
      return match ? match[1] : ''
    }

    // Helper function to extract meta tag content
    const extractMetaContent = (
      name: string,
      html: string,
      property = false
    ): string => {
      const attributeType = property ? 'property' : 'name'
      const regex = new RegExp(
        `<meta[^>]*${attributeType}=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>`,
        'i'
      )
      const match = html.match(regex)
      if (match) return match[1]

      // Try the reverse order (content attribute before name/property)
      const reverseRegex = new RegExp(
        `<meta[^>]*content=["']([^"']*)["'][^>]*${attributeType}=["']${name}["'][^>]*>`,
        'i'
      )
      const reverseMatch = html.match(reverseRegex)
      return reverseMatch ? reverseMatch[1] : ''
    }

    // Helper function to extract link href
    const extractLinkHref = (rel: string, html: string): string => {
      const regex = new RegExp(
        `<link[^>]*rel=["']${rel}["'][^>]*href=["']([^"']*)["'][^>]*>`,
        'i'
      )
      const match = html.match(regex)
      if (match) return match[1]

      // Try the reverse order (href attribute before rel)
      const reverseRegex = new RegExp(
        `<link[^>]*href=["']([^"']*)["'][^>]*rel=["']${rel}["'][^>]*>`,
        'i'
      )
      const reverseMatch = html.match(reverseRegex)
      return reverseMatch ? reverseMatch[1] : ''
    }

    // Helper function to extract all matching links
    const extractAllLinks = (relPattern: string, html: string): string[] => {
      const results: string[] = []
      const regex = new RegExp(
        `<link[^>]*rel=["']([^"']*${relPattern}[^"']*)["'][^>]*href=["']([^"']*)["'][^>]*>`,
        'gi'
      )
      let match

      while ((match = regex.exec(html)) !== null) {
        results.push(match[2])
      }

      // Try the reverse order (href attribute before rel)
      const reverseRegex = new RegExp(
        `<link[^>]*href=["']([^"']*)["'][^>]*rel=["']([^"']*${relPattern}[^"']*)["'][^>]*>`,
        'gi'
      )
      while ((match = reverseRegex.exec(html)) !== null) {
        results.push(match[1])
      }

      return results
    }

    // Extract charset
    let charset = ''
    const charsetMatch = html.match(/<meta[^>]*charset=["']([^"']*)["'][^>]*>/i)
    if (charsetMatch) {
      charset = charsetMatch[1]
    } else {
      const contentTypeMatch = html.match(
        /<meta[^>]*http-equiv=["']Content-Type["'][^>]*content=["']([^"']*)["'][^>]*>/i
      )
      if (contentTypeMatch && contentTypeMatch[1].includes('charset=')) {
        charset = contentTypeMatch[1].split('charset=')[1]
      }
    }

    // Extract HTML lang attribute
    const langMatch = html.match(/<html[^>]*lang=["']([^"']*)["'][^>]*>/i)
    const language = langMatch ? langMatch[1] : ''

    // Find favicon
    let favicon = ''
    const iconHref =
      extractLinkHref('icon', html) || extractLinkHref('shortcut icon', html)
    if (iconHref) {
      favicon = resolveUrl(iconHref)
    }
    if (!favicon) {
      const appleTouchIconHref = extractLinkHref('apple-touch-icon', html)
      if (appleTouchIconHref) {
        favicon = resolveUrl(appleTouchIconHref)
      }
    }
    if (!favicon) {
      if (!favicon) {
        // Try multiple common favicon formats
        const commonFaviconFormats = [
          'favicon.ico',
          'favicon.png',
          'favicon.svg'
        ]

        // Use Promise.any to get the first successful response
        try {
          const checkFavicon = async (format: string) => {
            const faviconUrl = `${baseUrl.origin}/${format}`
            const response = await fetch(faviconUrl, { method: 'HEAD' })
            if (response.ok) {
              return faviconUrl
            }
            throw new Error(`Favicon not found: ${format}`)
          }

          // We'll use Promise.allSettled and then find the first successful one
          const faviconPromises = commonFaviconFormats.map((format) =>
            checkFavicon(format)
          )
          favicon = await Promise.any(faviconPromises)
        } catch (error) {
          // If all formats fail, default to favicon.ico
          favicon = `${baseUrl.origin}/favicon.ico`
          console.log(
            'Could not verify favicon existence, defaulting to favicon.ico'
          )
        }
      }
    }

    // Directly fetch robots.txt from the domain root
    let robotsContent = ''
    try {
      const robotsUrl = `${baseUrl.origin}/robots.txt`
      const robotsResponse = await fetch(robotsUrl)
      if (robotsResponse.ok) {
        robotsContent = await robotsResponse.text()
      }
    } catch (error) {
      console.error('Error fetching robots.txt:', error)
    }

    const metaData: { [key: string]: string } = {
      title: extractTag('title', html),
      description: extractMetaContent('description', html),
      keywords: extractMetaContent('keywords', html),
      author: extractMetaContent('author', html),
      favicon: favicon,
      charset: charset,
      viewport: extractMetaContent('viewport', html),
      robots: robotsContent,
      generator: extractMetaContent('generator', html),
      theme: extractMetaContent('theme-color', html),
      canonical: extractLinkHref('canonical', html),
      language: language,
      ogTitle: extractMetaContent('og:title', html, true),
      ogDescription: extractMetaContent('og:description', html, true),
      ogImage: extractMetaContent('og:image', html, true),
      twitterCard: extractMetaContent('twitter:card', html),
      twitterTitle: extractMetaContent('twitter:title', html),
      twitterDescription: extractMetaContent('twitter:description', html),
      twitterImage: extractMetaContent('twitter:image', html)
    }

    // Collect all icons
    const icons: string[] = []
    if (favicon && !icons.includes(favicon)) {
      icons.push(favicon)
    }

    const iconLinks = extractAllLinks('icon', html)
    const appleTouchIconLinks = extractAllLinks('apple-touch-icon', html)

    ;[...iconLinks, ...appleTouchIconLinks].forEach((href) => {
      if (href) {
        const fullUrl = resolveUrl(href)
        if (fullUrl && !icons.includes(fullUrl)) {
          icons.push(fullUrl)
        }
      }
    })

    // If meta parameters are specified, only return requested fields
    if (metaParams) {
      const filteredData: { [key: string]: any } = {}
      metaParams.forEach((param) => {
        if (param === 'favicon') {
          filteredData[param] = metaData[param]
          filteredData.icons = icons
        } else {
          filteredData[param] = metaData[param]
        }
      })
      return NextResponse.json(filteredData)
    }

    // Return all meta information
    return NextResponse.json({ ...metaData, icons })
  } catch (error) {
    console.error('Error fetching meta data:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch meta data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
