/**
 * REST API Client for the Hostel Booking Platform
 * This file sets up an Axios instance with authentication interceptors.
 * All API calls from service files should use this instance.
 */

import axios from 'axios'

// Base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Create Axios instance with base configuration
const api = axios.create({
    baseURL: API_URL,
    timeout: 15000,
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * Request interceptor
 * Attaches the JWT token from localStorage to every outgoing request
 */
api.interceptors.request.use(
    (config) => {
        // Get JWT token stored during login
        const token = localStorage.getItem('authToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

/**
 * Response interceptor
 * Handles 401 Unauthorized globally - redirects to login page
 * Handles other API errors and extracts readable error messages
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // If JWT expired or invalid, clear auth data and redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken')
            localStorage.removeItem('authUser')
            window.location.href = '/login'
        }
        // Extract a readable error message from the response
        const message =
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'An unexpected error occurred'
        return Promise.reject(new Error(message))
    }
)

export default api
