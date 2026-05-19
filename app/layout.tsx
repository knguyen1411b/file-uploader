import type { Metadata } from 'next'

import { Fraunces, Manrope } from 'next/font/google'

import { Toaster } from '@/components/ui/sonner'

import './globals.css'
import { ThemeProvider } from './provider'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-heading' })
const manrope = Manrope({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
    title: 'File Uploader Workspace',
    description: 'Modern file uploader with native API routes, QR share, and premium UI.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${fraunces.variable} ${manrope.variable} antialiased`}>
                <ThemeProvider>
                    {children}
                    <Toaster position="top-center" />
                </ThemeProvider>
            </body>
        </html>
    )
}
