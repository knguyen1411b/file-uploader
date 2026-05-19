'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

type ThemeContextValue = {
    resolvedTheme: Theme
    setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getSystemTheme(): Theme {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: Theme) {
    document.documentElement.classList.toggle('dark', theme === 'dark')
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [resolvedTheme, setResolvedTheme] = useState<Theme>(() => {
        if (typeof window === 'undefined') return 'light'
        const stored = window.localStorage.getItem('theme') as Theme | null
        return stored === 'light' || stored === 'dark' ? stored : getSystemTheme()
    })

    useEffect(() => {
        applyTheme(resolvedTheme)

        const media = window.matchMedia('(prefers-color-scheme: dark)')
        const listener = () => {
            const manual = window.localStorage.getItem('theme')
            if (!manual) {
                const systemTheme = getSystemTheme()
                setResolvedTheme(systemTheme)
            }
        }

        media.addEventListener('change', listener)
        return () => media.removeEventListener('change', listener)
    }, [resolvedTheme])

    const setTheme = (theme: Theme) => {
        window.localStorage.setItem('theme', theme)
        setResolvedTheme(theme)
        applyTheme(theme)
    }

    const value = useMemo(() => ({ resolvedTheme, setTheme }), [resolvedTheme])

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider')
    }
    return context
}
