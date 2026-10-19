/**
 * hostelService.js - REST API calls for hostel operations
 * All hostel-related API requests are centralized here.
 * Falls back to mock data during development when API is unavailable.
 */

import api from '../lib/api'
import { MOCK_HOSTELS } from '../constants'

/**
 * Get all hostels with optional filters
 * REST API: GET /api/hostels
 * @param {object} params - Filter params (location, minPrice, maxPrice, rating, amenities, roomType, page, limit, sortBy)
 * @returns {Promise<{hostels: Array, total: number, page: number}>}
 */
export async function getHostels(params = {}) {
    try {
        const response = await api.get('/hostels', { params })
        return response.data
    } catch {
        // Development fallback: filter mock data client-side
        let filtered = [...MOCK_HOSTELS]
        if (params.location) {
            filtered = filtered.filter((h) =>
                h.city.toLowerCase().includes(params.location.toLowerCase()) ||
                h.location.toLowerCase().includes(params.location.toLowerCase())
            )
        }
        if (params.minPrice) filtered = filtered.filter((h) => h.pricePerNight >= params.minPrice)
        if (params.maxPrice) filtered = filtered.filter((h) => h.pricePerNight <= params.maxPrice)
        if (params.rating) filtered = filtered.filter((h) => h.rating >= params.rating)
        if (params.category) filtered = filtered.filter((h) => h.category === params.category)
        if (params.sortBy === 'price_asc') filtered.sort((a, b) => a.pricePerNight - b.pricePerNight)
        if (params.sortBy === 'price_desc') filtered.sort((a, b) => b.pricePerNight - a.pricePerNight)
        if (params.sortBy === 'rating') filtered.sort((a, b) => b.rating - a.rating)

        return { hostels: filtered, total: filtered.length, page: 1 }
    }
}

/**
 * Get a single hostel by ID
 * REST API: GET /api/hostels/:id
 * @param {string} id - Hostel ID
 * @returns {Promise<object>} Hostel object
 */
export async function getHostelById(id) {
    try {
        const response = await api.get(`/hostels/${id}`)
        return response.data
    } catch {
        return MOCK_HOSTELS.find((h) => h.id === id) || null
    }
}

/**
 * Get hostels by location search
 * REST API: GET /api/hostels?location=query
 * @param {string} location - Location search string
 */
export async function getHostelsByLocation(location) {
    return getHostels({ location })
}

/**
 * Search hostels with a general query
 * REST API: GET /api/hostels/search?q=query
 * @param {string} query - Search query
 */
export async function searchHostels(query) {
    try {
        const response = await api.get('/hostels/search', { params: { q: query } })
        return response.data
    } catch {
        const q = query.toLowerCase()
        return MOCK_HOSTELS.filter(
            (h) =>
                h.name.toLowerCase().includes(q) ||
                h.city.toLowerCase().includes(q) ||
                h.location.toLowerCase().includes(q) ||
                h.tags?.some((t) => t.toLowerCase().includes(q))
        )
    }
}

/**
 * Get featured hostels for the homepage
 * REST API: GET /api/hostels?featured=true
 */
export async function getFeaturedHostels() {
    try {
        const response = await api.get('/hostels', { params: { featured: true, limit: 6 } })
        return response.data.hostels
    } catch {
        return MOCK_HOSTELS.filter((h) => h.isFeatured)
    }
}

/**
 * Toggle wishlist status for a hostel
 * REST API: POST /api/hostels/:id/wishlist
 * @param {string} hostelId
 */
export async function toggleWishlist(hostelId) {
    try {
        const response = await api.post(`/hostels/${hostelId}/wishlist`)
        return response.data
    } catch {
        return { wishlisted: true }
    }
}
