import React from 'react'
import Providers from '../../components/Providers'
import { notFound } from 'next/navigation'

interface Props {
  children: React.ReactNode
  params: { lng: string }
}

const SUPPORTED = ['en', 'de']

export default async function LocaleLayout({ children, params }: Props) {
  const { lng } = params
  if (!SUPPORTED.includes(lng)) return notFound()

  // load messages (simple JSON files in /locales)
  let messages: Record<string, string> = {}
  try {
    messages = (await import(`../../locales/${lng}.json`)).default
  } catch (e) {
    messages = {}
  }

  return (
    <html lang={lng}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
