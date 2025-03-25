'use client'

import { cn } from '@/lib/utils'
import { DialogTitle } from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Dialog, DialogContent } from './dialog'

interface ImagePreviewProps {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
}

export function ImagePreview({
  src,
  alt,
  className,
  fallbackSrc = '/placeholder.svg'
}: ImagePreviewProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="relative">
        <Image
          src={src || fallbackSrc}
          alt={alt}
          className={cn(
            'h-full w-full cursor-pointer object-contain',
            className
          )}
          width={100}
          height={100}
          onClick={() => setIsOpen(true)}
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg'
          }}
        />
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className="max-w-3xl overflow-hidden border-0 bg-transparent p-0">
          <div className="relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            <Image
              src={src || fallbackSrc}
              alt={alt}
              className="h-auto max-h-[80vh] w-full object-contain"
              width={1200}
              height={800}
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
