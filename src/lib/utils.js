/**
 * Utility functions for the Hostel Booking Platform
 * This file provides className merging using clsx and tailwind-merge
 */

import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind CSS class names, resolving conflicts intelligently.
 * Uses clsx for conditional classes and tailwind-merge to handle duplicate/conflicting Tailwind classes.
 * @param  {...any} inputs - Class name strings, objects, or arrays
 * @returns {string} - Merged class name string
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Format a price with currency symbol
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (default: 'KES')
 * @returns {string} Formatted price string
 */
export function formatPrice(amount, currency = 'KES') {
    if (currency === 'KES') {
        return `KES ${amount.toLocaleString()}`
    }
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(amount)
}

/**
 * Format a date to a readable string
 * @param {Date|string} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

/**
 * Calculate number of nights between two dates
 * @param {Date|string} checkIn - Check-in date
 * @param {Date|string} checkOut - Check-out date
 * @returns {number} Number of nights
 */
export function calculateNights(checkIn, checkOut) {
    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const diff = end.getTime() - start.getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/**
 * Generate a booking reference number
 * @returns {string} Booking reference like GH-2024-123456
 */
export function generateBookingRef() {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 900000) + 100000
    return `GH-${year}-${random}`
}

/**
 * Truncate text to a maximum length, appending ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum character length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 100) {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '…'
}
