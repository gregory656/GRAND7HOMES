/**
 * HostelDetail.jsx - Single hostel detail page
 * Shows image gallery, info, amenities, room types, reviews, location, and a sticky booking sidebar.
 * React Query is used for data fetching (getHostelById)
 * Lucide React icons: Star, MapPin, Calendar, Users, Heart, Share2, Wifi, ChevronLeft, Plus, Minus, Check
 */

import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
    Star, MapPin, Heart, Share2, ChevronLeft, Calendar, Users,
    Wifi, Car, Coffee, Waves, Utensils, Dumbbell, Wind, Shield,
    Clock, Check, X, ChevronRight, Plus, Minus
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { SectionLoader } from '../../components/ui/Spinner'
import { getHostelById } from '../../services/hostelService'
import { useBooking } from '../../contexts/BookingContext'
import { MOCK_HOSTELS, MOCK_REVIEWS } from '../../constants'
import { formatPrice, calculateNights, formatDate } from '../../lib/utils'

// Map amenity names to Lucide icons
const AMENITY_ICON_MAP = {
    WiFi: Wifi, Parking: Car, Coffee, Pool: Waves, Kitchen: Utensils,
    Gym: Dumbbell, AC: Wind, Security: Shield,
}

function AmenityItem({ name }) {
    const Icon = AMENITY_ICON_MAP[name] || Check
    return (
        <div className="flex items-center gap-2.5 py-1.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">{name}</span>
        </div>
    )
}

function StarRating({ rating, size = 'sm' }) {
    const s = size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
                <Star key={i} className={`${s} ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
            ))}
        </div>
    )
}

function HostelDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { addToBooking } = useBooking()

    // Booking sidebar state
    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]
    const [checkIn, setCheckIn] = useState(today)
    const [checkOut, setCheckOut] = useState(tomorrow)
    const [guests, setGuests] = useState(1)
    const [selectedRoom, setSelectedRoom] = useState(null)
    const [activeImg, setActiveImg] = useState(0)
    const [wishlisted, setWishlisted] = useState(false)
    const [bookingAdded, setBookingAdded] = useState(false)

    // React Query is used for data fetching
    const { data: hostel, isLoading, error } = useQuery({
        queryKey: ['hostel', id],
        queryFn: () => getHostelById(id),
        staleTime: 5 * 60 * 1000,
        placeholderData: MOCK_HOSTELS.find((h) => h.id === id),
    })

    const reviews = MOCK_REVIEWS.filter((r) => r.hostelId === id)
    const nights = calculateNights(checkIn, checkOut) || 1
    const room = selectedRoom || hostel?.roomTypes?.[0]
    const subtotal = (room?.pricePerNight || 0) * nights
    const taxes = Math.round(subtotal * 0.16)
    const serviceFee = Math.round(subtotal * 0.05)
    const total = subtotal + taxes + serviceFee

    const handleAddToBooking = () => {
        if (!hostel || !room) return
        addToBooking({
            hostelId: hostel.id,
            hostelName: hostel.name,
            hostelImage: hostel.images[0],
            hostelLocation: hostel.location,
            roomType: room,
            checkIn,
            checkOut,
            guests,
            pricePerNight: room.pricePerNight,
        })
        setBookingAdded(true)
        setTimeout(() => navigate('/booking'), 800)
    }

    if (isLoading) return <><Navbar /><SectionLoader /></>
    if (error || !hostel) return (
        <><Navbar />
            <div className="flex h-96 items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">Hostel not found.</p>
                    <Button onClick={() => navigate('/hostels')}>Back to Hostels</Button>
                </div>
            </div>
        </>
    )

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Navbar />

            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <Link to="/" className="hover:text-blue-600">Home</Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <Link to="/hostels" className="hover:text-blue-600">Hostels</Link>
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="text-gray-900 dark:text-white truncate">{hostel.name}</span>
                </div>

                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">{hostel.name}</h1>
                        <div className="flex flex-wrap items-center gap-4 mt-2">
                            <div className="flex items-center gap-1.5">
                                <StarRating rating={hostel.rating} />
                                <span className="font-semibold text-gray-900 dark:text-white">{hostel.rating}</span>
                                <span className="text-sm text-gray-500">({hostel.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="h-4 w-4 text-blue-500" />
                                {hostel.location}
                            </div>
                            <Badge variant="primary">{hostel.category}</Badge>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setWishlisted(!wishlisted)}>
                            <Heart className={`h-4 w-4 ${wishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                            {wishlisted ? 'Saved' : 'Save'}
                        </Button>
                        <Button variant="outline" size="sm"><Share2 className="h-4 w-4" />Share</Button>
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="mb-8 grid grid-cols-4 gap-2 h-72 sm:h-96 rounded-2xl overflow-hidden">
                    <div className="col-span-4 sm:col-span-3 relative overflow-hidden">
                        <img
                            src={hostel.images[activeImg]}
                            alt={hostel.name}
                            className="h-full w-full object-cover transition-all duration-500"
                        />
                    </div>
                    <div className="hidden sm:flex sm:flex-col gap-2">
                        {hostel.images.slice(0, 3).map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveImg(i)}
                                className={`flex-1 overflow-hidden rounded-lg border-2 transition-all ${activeImg === i ? 'border-blue-500' : 'border-transparent'}`}
                            >
                                <img src={img} alt="" className="h-full w-full object-cover hover:opacity-80 transition-opacity" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Content + Sidebar */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Content */}
                    <div className="flex-1 min-w-0 space-y-10">
                        {/* Description */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About This Hostel</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{hostel.description}</p>
                        </section>

                        {/* Amenities */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Amenities</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                                {hostel.amenities.map((a) => <AmenityItem key={a} name={a} />)}
                            </div>
                        </section>

                        {/* Room Types */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Room Types</h2>
                            <div className="space-y-3">
                                {hostel.roomTypes.map((roomType) => (
                                    <div
                                        key={roomType.id}
                                        onClick={() => setSelectedRoom(roomType)}
                                        className={`rounded-xl border-2 p-4 cursor-pointer transition-all ${(selectedRoom?.id || hostel.roomTypes[0]?.id) === roomType.id
                                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/10'
                                                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-900 dark:text-white">{roomType.name}</h3>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                    Up to {roomType.capacity} guests · {roomType.availableBeds} beds available
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <p className="font-bold text-blue-600 dark:text-blue-400">
                                                    {formatPrice(roomType.pricePerNight)}
                                                </p>
                                                <p className="text-xs text-gray-500">per night</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Policies */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Hostel Policies</h2>
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                                {[
                                    { icon: Clock, label: 'Check-in', value: hostel.checkInTime },
                                    { icon: Clock, label: 'Check-out', value: hostel.checkOutTime },
                                    { icon: X, label: 'Cancellation', value: hostel.cancellationPolicy },
                                ].map(({ icon: Icon, label, value }) => (
                                    <div key={label} className="flex items-center gap-4 p-4">
                                        <Icon className="h-5 w-5 text-gray-400 shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">{value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews */}
                        <section>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                Reviews
                                <span className="ml-2 text-base font-normal text-gray-500">({hostel.reviewCount})</span>
                            </h2>
                            {/* Rating summary */}
                            <div className="flex items-center gap-4 mb-6 rounded-xl bg-blue-50 dark:bg-blue-900/10 p-4">
                                <div className="text-center">
                                    <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">{hostel.rating}</p>
                                    <StarRating rating={hostel.rating} />
                                    <p className="text-xs text-gray-500 mt-1">{hostel.reviewCount} reviews</p>
                                </div>
                                <div className="flex-1 space-y-1.5">
                                    {['Cleanliness', 'Value', 'Location', 'Staff'].map((cat, i) => (
                                        <div key={cat} className="flex items-center gap-2">
                                            <span className="text-xs text-gray-600 dark:text-gray-400 w-20">{cat}</span>
                                            <div className="flex-1 h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                                <div
                                                    className="h-2 rounded-full gradient-primary"
                                                    style={{ width: `${(hostel.rating - i * 0.1) / 5 * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-gray-700 dark:text-gray-300 w-6">
                                                {(hostel.rating - i * 0.1).toFixed(1)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Review cards */}
                            <div className="space-y-4">
                                {reviews.length > 0 ? reviews.map((review) => (
                                    <div key={review.id} className="rounded-xl border border-gray-200 dark:border-gray-700 p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white">
                                                    {review.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white text-sm">{review.user}</p>
                                                    <p className="text-xs text-gray-500">{review.country} · {formatDate(review.date)}</p>
                                                </div>
                                            </div>
                                            <StarRating rating={review.rating} size="sm" />
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{review.text}</p>
                                    </div>
                                )) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">No reviews yet. Be the first to review!</p>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Booking Sidebar (sticky) */}
                    <aside className="w-full lg:w-80 xl:w-96 shrink-0">
                        <div className="sticky top-20 rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 p-5">
                            <div className="flex items-baseline gap-1 mb-5">
                                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatPrice(room?.pricePerNight || hostel.roomTypes[0]?.pricePerNight || 0)}
                                </span>
                                <span className="text-sm text-gray-500">/ night</span>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-2 gap-2 mb-3">
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">CHECK-IN</p>
                                    <input
                                        type="date" value={checkIn} min={today}
                                        onChange={(e) => setCheckIn(e.target.value)}
                                        className="w-full text-sm font-semibold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                                    />
                                </div>
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3">
                                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">CHECK-OUT</p>
                                    <input
                                        type="date" value={checkOut} min={checkIn}
                                        onChange={(e) => setCheckOut(e.target.value)}
                                        className="w-full text-sm font-semibold text-gray-900 dark:text-white bg-transparent focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Guests */}
                            <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-3 mb-3">
                                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">GUESTS</p>
                                <div className="flex items-center justify-between">
                                    <button onClick={() => setGuests(Math.max(1, guests - 1))}
                                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="font-semibold text-gray-900 dark:text-white">{guests} Guest{guests > 1 ? 's' : ''}</span>
                                    <button onClick={() => setGuests(Math.min(room?.capacity || 8, guests + 1))}
                                        className="flex h-7 w-7 items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                        <Plus className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>

                            {/* Price breakdown */}
                            <div className="space-y-2 mb-4 text-sm">
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>{formatPrice(room?.pricePerNight || 0)} × {nights} night{nights > 1 ? 's' : ''}</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Taxes (16% VAT)</span>
                                    <span>{formatPrice(taxes)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Service fee (5%)</span>
                                    <span>{formatPrice(serviceFee)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                                    <span>Total</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                            </div>

                            <Button className="w-full" size="lg" variant="gradient" onClick={handleAddToBooking} loading={bookingAdded}>
                                {bookingAdded ? 'Added! Redirecting…' : 'Reserve Now'}
                            </Button>
                            <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-2">No charges until checkout</p>
                        </div>
                    </aside>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default HostelDetail
