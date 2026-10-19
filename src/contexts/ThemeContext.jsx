/**
 * ThemeContext - React Context API for dark/light mode
 * Persists the user's theme preference to localStorage.
 * Applies the 'dark' class to the document root element for Tailwind dark mode.
 */

import { createContext, useContext, useEffect } from 'react'

// Create the context
const ThemeContext = createContext(null)

/**
 * ThemeProvider wraps the app to provide theme management globally.
 * @param {React.ReactNode} children
 */
export function ThemeProvider({ children }) {
    // Keep the application in a light theme regardless of saved or system preferences.
    const theme = 'light'

    useEffect(() => {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }, [])

    const toggleTheme = () => {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
    }

    const setSpecificTheme = () => {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
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
