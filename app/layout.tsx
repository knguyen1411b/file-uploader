import type { Metadata } from 'next'

import './globals.css'
import { ThemeProvider } from './provider'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased custom-font">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'File Uploader - Knguyen1411b',
  description: 'A simple and modern file uploader built with Next.js, TailwindCSS, and ShadCN UI',
  keywords: ['Next.js', 'File Uploader', 'ShadCN', 'TailwindCSS', 'Upload'],
  authors: [{ name: 'Khanh Nguyen', url: 'https://knguyen1411b.vercel.app' }],
  openGraph: {
    title: 'File Uploader - Knguyen1411b',
    description: 'Upload and share your files instantly.',
    url: 'https://your-app-url.com',
    siteName: 'File Uploader',
    locale: 'en_US',
    type: 'website'
  }
}
