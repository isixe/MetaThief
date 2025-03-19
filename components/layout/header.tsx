/* eslint-disable @next/next/no-img-element */
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { GithubIcon } from '../icons/github-icon'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center text-xl font-bold">
          <div className="relative flex h-10 w-10 items-center justify-center transition-all duration-500">
            <img
              src="/favicon.ico"
              alt="MetaThief Icon"
              className={`scale-110} max-h-full max-w-full transition-all duration-500`}
            />
          </div>
          <div className="ml-2">MetaThief</div>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/api" className="text-sm hover:underline">
            API Docs
          </Link>
          <Button variant="ghost" size="sm" asChild>
            <Link
              href="https://github.com/isixe/MetaThief"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only md:not-sr-only md:inline-block">
                GitHub
              </span>
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
