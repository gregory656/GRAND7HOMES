/**
 * bookingService.js - REST API calls for booking operations
 * All booking-related API requests are centralized here.
 */

import api from '../lib/api'
import { MOCK_BOOKINGS } from '../constants'
import { generateBookingRef } from '../lib/utils'

/**
 * Create a new booking
 * REST API: POST /api/bookings
 * @param {object} bookingData - Full booking details
 * @returns {Promise<object>} Created booking with reference number
 */
export async function createBooking(bookingData) {
    try {
        const response = await api.post('/bookings', bookingData)
        return response.data
    } catch {
        // Development fallback: simulate booking creation
        return {
            ...bookingData,
            id: 'b' + Date.now(),
            referenceNo: generateBookingRef(),
            status: 'confirmed',
            createdAt: new Date().toISOString(),
        }
    }
}

/**
 * Get all bookings for the current authenticated user
 * REST API: GET /api/bookings/user
 * @returns {Promise<Array>} List of user bookings
 */
export async function getUserBookings() {
    try {
        const response = await api.get('/bookings/user')
        return response.data
    } catch {
        return MOCK_BOOKINGS
    }
}

/**
 * Get a specific booking by ID
 * REST API: GET /api/bookings/:id
 * @param {string} id - Booking ID
 * @returns {Promise<object>} Booking details
 */
export async function getBookingById(id) {
    try {
        const response = await api.get(`/bookings/${id}`)
        return response.data
    } catch {
        return MOCK_BOOKINGS.find((b) => b.id === id) || null
    }
}

/**
 * Cancel a booking
 * REST API: PATCH /api/bookings/:id/cancel
 * @param {string} id - Booking ID
 * @returns {Promise<object>} Updated booking
 */
export async function cancelBooking(id) {
    try {
        const response = await api.patch(`/bookings/${id}/cancel`)
        return response.data
    } catch {
        return { id, status: 'cancelled' }
    }
}

/**
 * Modify a booking (dates or guests)
 * REST API: PATCH /api/bookings/:id
 * @param {string} id - Booking ID
 * @param {object} updates - Fields to update
 */
export async function modifyBooking(id, updates) {
    try {
        const response = await api.patch(`/bookings/${id}`, updates)
        return response.data
    } catch {
        return { id, ...updates }
    }
}
