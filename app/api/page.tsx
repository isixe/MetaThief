import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4">
      <h1 className="mb-8 text-4xl font-bold">API Documentation</h1>

      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              The MetaThief API allows you to fetch meta information from any
              website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Base URL:{' '}
              <code className="rounded bg-muted px-2 py-1">/api/meta</code>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Get Meta Information
                </h3>
                <code className="mb-2 block rounded bg-muted p-2">
                  GET /api/meta?url=https://example.com
                </code>
                <p className="mb-2">
                  Fetches all meta information from the specified URL.
                </p>

                <h4 className="mb-2 mt-4 font-medium">Query Parameters:</h4>
                <ul className="list-disc space-y-2 pl-6">
                  <li>
                    <code className="bg-muted px-1">url</code> (required) - The
                    URL to fetch meta information from
                  </li>
                  <li>
                    <code className="bg-muted px-1">meta</code> (optional) -
                    Comma-separated list of specific meta tags to fetch
                  </li>
                </ul>

                <h4 className="mb-2 mt-4 font-medium">Examples:</h4>
                <div className="space-y-2">
                  <p>Fetch all meta information:</p>
                  <code className="block rounded bg-muted p-2">
                    /api/meta?url=https://example.com
                  </code>

                  <p className="mt-4">Fetch specific meta tags:</p>
                  <code className="block rounded bg-muted p-2">
                    /api/meta?url=https://example.com&meta=title,description,favicon
                  </code>
                </div>

                <h4 className="mb-2 mt-4 font-medium">Supported Meta Tags:</h4>
                <ul className="grid list-disc grid-cols-2 gap-2 pl-6 md:grid-cols-3">
                  <li>title</li>
                  <li>description</li>
                  <li>keywords</li>
                  <li>author</li>
                  <li>favicon</li>
                  <li>charset</li>
                  <li>viewport</li>
                  <li>robots</li>
                  <li>generator</li>
                  <li>theme</li>
                  <li>canonical</li>
                  <li>language</li>
                  <li>ogTitle</li>
                  <li>ogDescription</li>
                  <li>ogImage</li>
                  <li>twitterCard</li>
                  <li>twitterTitle</li>
                  <li>twitterDescription</li>
                  <li>twitterImage</li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="mb-2 font-medium">Response Format:</h4>
                <pre className="overflow-x-auto rounded bg-muted p-4">
                  {`{
  "title": "Example Website",
  "description": "Website description",
  "favicon": "https://example.com/favicon.ico",
  "icons": [
    "https://example.com/favicon.ico",
    "https://example.com/apple-touch-icon.png"
  ],
  // ... other meta tags
}`}
                </pre>
              </div>

              <div className="mt-6">
                <h4 className="mb-2 font-medium">Error Response:</h4>
                <pre className="overflow-x-auto rounded bg-muted p-4">
                  {`{
  "error": "Error message",
  "message": "Detailed error description"
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
