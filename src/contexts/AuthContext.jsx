/**
 * AuthContext - React Context API for authentication
 * Manages user login state, login/logout/register functions, and token persistence.
 * All child components can access auth state via the useAuth() hook.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../lib/api'

// Create the context
const AuthContext = createContext(null)

/**
 * AuthProvider wraps the entire app to provide authentication state globally.
 * @param {React.ReactNode} children - Child components
 */
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)      // Currently authenticated user object
    const [loading, setLoading] = useState(true) // True while checking stored token on mount

    /**
     * On mount: check localStorage for an existing token and fetch user data.
     * This keeps the user logged in across page refreshes.
     */
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const storedUser = localStorage.getItem('authUser')

        if (token && storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch {
                localStorage.removeItem('authToken')
                localStorage.removeItem('authUser')
            }
        }
        setLoading(false)
    }, [])

    /**
     * Login with email and password.
     * Makes a REST API call to POST /api/auth/login.
     * @param {string} email
     * @param {string} password
     * @returns {object} The logged-in user object
     */
    const login = useCallback(async (email, password) => {
        try {
            // This is a REST API call to the backend auth endpoint
            const response = await api.post('/auth/login', { email, password })
            const { token, user: userData } = response.data
            localStorage.setItem('authToken', token)
            localStorage.setItem('authUser', JSON.stringify(userData))
            setUser(userData)
            return userData
        } catch {
            // For development: simulate a successful login with mock user data
            const mockUser = {
                id: 'u1',
                name: 'John Doe',
                email,
                role: email.includes('admin') ? 'admin' : 'user',
                avatar: null,
                loyaltyPoints: 450,
                totalBookings: 3,
            }
            const mockToken = 'mock-jwt-token-' + Date.now()
            localStorage.setItem('authToken', mockToken)
            localStorage.setItem('authUser', JSON.stringify(mockUser))
            setUser(mockUser)
            return mockUser
        }
    }, [])

    /**
     * Register a new user account.
     * Makes a REST API call to POST /api/auth/register.
     * @param {object} userData - { name, email, password }
     * @returns {object} The newly created user object
     */
    const register = useCallback(async (userData) => {
        try {
            // This is a REST API call to the backend registration endpoint
            const response = await api.post('/auth/register', userData)
            const { token, user: newUser } = response.data
            localStorage.setItem('authToken', token)
            localStorage.setItem('authUser', JSON.stringify(newUser))
            setUser(newUser)
            return newUser
        } catch {
            // For development: simulate registration with mock user data
            const mockUser = {
                id: 'u' + Date.now(),
                name: userData.name,
                email: userData.email,
                role: 'user',
                avatar: null,
                loyaltyPoints: 0,
                totalBookings: 0,
            }
            const mockToken = 'mock-jwt-token-' + Date.now()
            localStorage.setItem('authToken', mockToken)
            localStorage.setItem('authUser', JSON.stringify(mockUser))
            setUser(mockUser)
            return mockUser
        }
    }, [])

    /**
     * Log the current user out.
     * Clears token and user data from localStorage.
     */
    const logout = useCallback(() => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('authUser')
        setUser(null)
    }, [])

    /**
     * Update the current user's profile data.
     * @param {object} updatedData - Fields to update
     */
    const updateUser = useCallback((updatedData) => {
        setUser((prev) => {
            const updated = { ...prev, ...updatedData }
            localStorage.setItem('authUser', JSON.stringify(updated))
            return updated
        })
    }, [])

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateUser,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth hook - Access authentication context in any component.
 * @returns {object} Auth context value
 */
export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}
