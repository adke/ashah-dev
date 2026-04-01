import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-inter'
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: 'adish.dev',
  description:
    'Portfolio of Adish Shah, Computer Engineering student at Waterloo. Experience across web, APIs, cloud, and applied ML.',
  keywords: [
    'Adish Shah',
    'Computer Engineering',
    'University of Waterloo',
    'Software Engineer',
    'React',
    'TypeScript',
    'Python',
    'Machine Learning',
    'LLM',
  ],
  authors: [{ name: 'Adish Shah' }],
  creator: 'Adish Shah',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    title: 'Adish Shah | Computer Engineering · Software Engineer',
    description: 'Computer Engineering at Waterloo. Building software across the stack and in ML-adjacent roles.',
    siteName: 'Adish Shah',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adish Shah | Computer Engineering · Software Engineer',
    description: 'Computer Engineering at Waterloo. Full-stack engineering and applied ML experience.',
  },
  icons: {
    icon: '/logos/adish-tab-logo.png',
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f5f3ef',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
