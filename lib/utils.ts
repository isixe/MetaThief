import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveUrl(value: string | undefined, baseUrl?: string) {
  if (!value) return ''
  if (!baseUrl) return value
  try {
    return new URL(value, baseUrl).href
  } catch {
    return value
  }
}
