import type { Metadata, Viewport } from 'next'
import { Geist, Metal_Mania } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const metalMania = Metal_Mania({
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Copenhell Schedule 2025',
  description: 'Copenhell Schedule 2025',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${metalMania.className} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  )
}
