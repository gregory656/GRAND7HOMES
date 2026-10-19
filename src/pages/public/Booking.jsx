/**
 * Booking.jsx - Booking cart page (like a shopping cart for hostel bookings)
 * Shows all booking items, summary with totals, and proceed to checkout button.
 * This uses React Context API for booking state.
 */

import { Link, useNavigate } from 'react-router-dom'
import {
    ShoppingCart, Trash2, Calendar, Users, MapPin,
    ArrowRight, Hotel, Plus, Minus
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import { useBooking } from '../../contexts/BookingContext'
import { useAuth } from '../../contexts/AuthContext'
import { formatPrice, formatDate, calculateNights } from '../../lib/utils'

function Booking() {
    const { bookingItems, itemCount, subtotal, taxes, serviceFee, total, removeFromBooking, updateDates, updateGuests, clearBooking } = useBooking()
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const handleCheckout = () => {
        if (!isAuthenticated) { navigate('/login?redirect=/checkout'); return }
        navigate('/checkout')
    }

    // Empty state
    if (itemCount === 0) {
        return (
            <div className="min-h-screen bg-white">
                <Navbar />
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
                        <ShoppingCart className="h-12 w-12 text-gray-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your booking cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                        Browse our hostels and add a booking to get started on your Kenya adventure.
                    </p>
                    <Link to="/hostels">
                        <Button size="lg" variant="gradient">Browse Hostels</Button>
                    </Link>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Booking Cart <span className="text-gray-400 font-normal">({itemCount})</span>
                    </h1>
                    <button onClick={clearBooking} className="text-sm text-red-500 hover:underline flex items-center gap-1">
                        <Trash2 className="h-3.5 w-3.5" />Clear all
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Booking Items */}
                    <div className="flex-1 space-y-4">
                        {bookingItems.map((item) => (
                            <div key={item.id} className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
                                <div className="flex flex-col sm:flex-row">
                                    {/* Image */}
                                    <div className="relative h-44 sm:h-auto sm:w-48 shrink-0">
                                        <img
                                            src={item.hostelImage}
                                            alt={item.hostelName}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    {/* Details */}
                                    <div className="flex-1 p-5">
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{item.hostelName}</h3>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                                                    <MapPin className="h-3 w-3" />{item.hostelLocation}
                                                </div>
                                                <p className="text-sm text-gray-800 mt-1 font-medium">
                                                    {item.roomType?.name}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeFromBooking(item.id)}
                                                className="text-gray-400 hover:text-red-500 transition-colors"
                                                aria-label="Remove booking"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>

                                        {/* Dates + Guests */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 text-gray-600 shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400">Check-in</p>
                                                    <p className="font-medium text-gray-900">{formatDate(item.checkIn)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="h-4 w-4 text-gray-600 shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400">Check-out</p>
                                                    <p className="font-medium text-gray-900">{formatDate(item.checkOut)}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Users className="h-4 w-4 text-gray-600 shrink-0" />
                                                <div>
                                                    <p className="text-xs text-gray-400">Guests</p>
                                                    <p className="font-medium text-gray-900">{item.guests}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center justify-between">
                                            <p className="text-xs text-gray-500">
                                                {formatPrice(item.pricePerNight)} × {item.nights} night{item.nights > 1 ? 's' : ''}
                                            </p>
                                            <p className="font-bold text-gray-800">
                                                {formatPrice(item.totalPrice)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:w-80 xl:w-96 shrink-0">
                        <div className="sticky top-20 rounded-2xl bg-white border border-gray-200 p-6">
                            <h2 className="text-lg font-bold text-gray-900 mb-5">Booking Summary</h2>

                            {bookingItems.map((item) => (
                                <div key={item.id} className="flex justify-between text-sm text-gray-600 mb-2">
                                    <span className="truncate pr-2">{item.hostelName}</span>
                                    <span className="shrink-0 font-medium">{formatPrice(item.totalPrice)}</span>
                                </div>
                            ))}

                            <div className="mt-4 space-y-2 border-t border-gray-200 pt-4">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Taxes (16%)</span><span>{formatPrice(taxes)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Service fee</span><span>{formatPrice(serviceFee)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-200 pt-3 mt-3">
                                    <span>Total</span><span className="text-gray-800">{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Button className="w-full mt-5" size="lg" variant="gradient" onClick={handleCheckout}>
                                Proceed to Checkout <ArrowRight className="h-4 w-4" />
                            </Button>
                            <p className="text-center text-xs text-gray-500 mt-3">
                                🔒 Secure booking — no charges until confirmation
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Booking
