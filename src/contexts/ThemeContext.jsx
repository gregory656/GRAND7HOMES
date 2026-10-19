/**
 * ThemeContext - React Context API for dark/light mode
 * Persists the user's theme preference to localStorage.
 * Applies the 'dark' class to the document root element for Tailwind dark mode.
 */

import { createContext, useContext, useState, useEffect } from 'react'

// Create the context
const ThemeContext = createContext(null)

/**
 * ThemeProvider wraps the app to provide theme management globally.
 * @param {React.ReactNode} children
 */
export function ThemeProvider({ children }) {
    // Initialize theme from localStorage or system preference
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme')
        if (stored) return stored
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })

    // Apply theme class to the document root (used by Tailwind's dark: variant)
    useEffect(() => {
        const root = document.documentElement
        if (theme === 'dark') {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
        localStorage.setItem('theme', theme)
    }, [theme])

    /**
     * Toggle between light and dark theme.
     */
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    /**
     * Set a specific theme.
     * @param {'light'|'dark'} newTheme
     */
    const setSpecificTheme = (newTheme) => {
        setTheme(newTheme)
    }

    const value = {
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        setTheme: setSpecificTheme,
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

/**
 * useTheme hook - Access theme context in any component.
 */
export function useTheme() {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('useTheme must be used within a ThemeProvider')
    return context
}
