/**
 * BookingContext - React Context API for booking/cart management
 * Acts like a shopping cart but for hostel bookings.
 * Manages booking items (hostel + room + dates + guests) and persists to localStorage.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { calculateNights } from '../lib/utils'

// Create the context
const BookingContext = createContext(null)

/**
 * BookingProvider wraps the app to provide global booking cart state.
 * @param {React.ReactNode} children
 */
export function BookingProvider({ children }) {
    // Initialize booking items from localStorage (persists across refreshes)
    const [bookingItems, setBookingItems] = useState(() => {
        try {
            const stored = localStorage.getItem('bookingCart')
            return stored ? JSON.parse(stored) : []
        } catch {
            return []
        }
    })

    // Persist booking items to localStorage on every change
    useEffect(() => {
        localStorage.setItem('bookingCart', JSON.stringify(bookingItems))
    }, [bookingItems])

    /**
     * Add a hostel/room booking to the cart.
     * If already in cart, replaces instead of duplicating.
     * @param {object} item - { hostelId, hostelName, hostelImage, roomType, checkIn, checkOut, guests, pricePerNight }
     */
    const addToBooking = useCallback((item) => {
        const nights = calculateNights(item.checkIn, item.checkOut)
        const newItem = {
            ...item,
            id: `${item.hostelId}-${item.roomType.id}-${Date.now()}`,
            nights,
            totalPrice: item.pricePerNight * nights,
        }
        setBookingItems((prev) => {
            // Replace if same hostel+roomType combination already exists
            const exists = prev.findIndex(
                (b) => b.hostelId === item.hostelId && b.roomType.id === item.roomType.id
            )
            if (exists >= 0) {
                const updated = [...prev]
                updated[exists] = newItem
                return updated
            }
            return [...prev, newItem]
        })
    }, [])

    /**
     * Remove a booking item from the cart by item id.
     * @param {string} itemId
     */
    const removeFromBooking = useCallback((itemId) => {
        setBookingItems((prev) => prev.filter((item) => item.id !== itemId))
    }, [])

    /**
     * Update dates for an existing booking item.
     * @param {string} itemId
     * @param {string} checkIn
     * @param {string} checkOut
     */
    const updateDates = useCallback((itemId, checkIn, checkOut) => {
        setBookingItems((prev) =>
            prev.map((item) => {
                if (item.id !== itemId) return item
                const nights = calculateNights(checkIn, checkOut)
                return { ...item, checkIn, checkOut, nights, totalPrice: item.pricePerNight * nights }
            })
        )
    }, [])

    /**
     * Update guest count for an existing booking item.
     * @param {string} itemId
     * @param {number} guests
     */
    const updateGuests = useCallback((itemId, guests) => {
        setBookingItems((prev) =>
            prev.map((item) => (item.id === itemId ? { ...item, guests } : item))
        )
    }, [])

    /**
     * Clear the entire booking cart.
     */
    const clearBooking = useCallback(() => {
        setBookingItems([])
    }, [])

    // Calculate totals
    const subtotal = bookingItems.reduce((sum, item) => sum + item.totalPrice, 0)
    const taxRate = 0.16 // 16% VAT (Kenya)
    const taxes = Math.round(subtotal * taxRate)
    const serviceFee = Math.round(subtotal * 0.05) // 5% service fee
    const total = subtotal + taxes + serviceFee
    const itemCount = bookingItems.length

    const value = {
        bookingItems,
        itemCount,
        subtotal,
        taxes,
        serviceFee,
        total,
        addToBooking,
        removeFromBooking,
        updateDates,
        updateGuests,
        clearBooking,
    }

    return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

/**
 * useBooking hook - Access booking cart context in any component.
 */
export function useBooking() {
    const context = useContext(BookingContext)
    if (!context) throw new Error('useBooking must be used within a BookingProvider')
    return context
}
