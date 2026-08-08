'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps } from 'react'

export function Link({ to, ...props }: Omit<ComponentProps<typeof NextLink>, 'href'> & { to: string }) {
  // Map 'to' parameter to Next.js's 'href'
  return <NextLink href={to} {...props} />
}

export function useLocation() {
  const pathname = usePathname()
  return { pathname }
}
