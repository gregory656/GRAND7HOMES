/**
 * Home.jsx - Landing page for Grand7Homes Hostel Booking Platform
 * Contains: Hero, Featured Hostels, Popular Destinations, How It Works, Testimonials, CTA
 * React Query is used for data fetching (getFeaturedHostels)
 * Lucide React icons are imported here (Search, Calendar, Users, MapPin, Star, Check, ArrowRight, ChevronRight)
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
    Search, Calendar, Users, MapPin, Star, ArrowRight,
    Check, Shield, Award, Zap, ChevronRight
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import HostelCard from '../../components/hostel/HostelCard'
import Button from '../../components/ui/Button'
import { getFeaturedHostels } from '../../services/hostelService'
import {
    POPULAR_DESTINATIONS, TESTIMONIALS, HOW_IT_WORKS, MOCK_HOSTELS
} from '../../constants'
import { formatPrice } from '../../lib/utils'

/**
 * Hero search form component embedded in the hero section.
 */
function HeroSearchForm() {
    const navigate = useNavigate()
    const [location, setLocation] = useState('')
    const [checkIn, setCheckIn] = useState('')
    const [checkOut, setCheckOut] = useState('')
    const [guests, setGuests] = useState(1)

    const handleSearch = (e) => {
        e.preventDefault()
        const params = new URLSearchParams()
        if (location) params.set('location', location)
        if (checkIn) params.set('checkIn', checkIn)
        if (checkOut) params.set('checkOut', checkOut)
        if (guests) params.set('guests', guests)
        navigate(`/hostels?${params.toString()}`)
    }

    const today = new Date().toISOString().split('T')[0]
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

    return (
        <form
            onSubmit={handleSearch}
            className="rounded-2xl border border-gray-200 bg-white p-2 shadow-sm"
        >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {/* Location */}
                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                    <MapPin className="h-5 w-5 text-gray-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <label className="block text-xs font-medium text-gray-500">Destination</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Where are you going?"
                            className="w-full text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Check-in */}
                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                    <Calendar className="h-5 w-5 text-gray-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <label className="block text-xs font-medium text-gray-500">Check-in</label>
                        <input
                            type="date"
                            value={checkIn}
                            min={today}
                            onChange={(e) => setCheckIn(e.target.value)}
                            className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Check-out */}
                <div className="flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                    <Calendar className="h-5 w-5 text-gray-600 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <label className="block text-xs font-medium text-gray-500">Check-out</label>
                        <input
                            type="date"
                            value={checkOut}
                            min={checkIn || tomorrow}
                            onChange={(e) => setCheckOut(e.target.value)}
                            className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent"
                        />
                    </div>
                </div>

                {/* Guests + Search button */}
                <div className="flex items-center gap-2">
                    <div className="flex flex-1 items-center gap-3 rounded-xl bg-white px-4 py-3">
                        <Users className="h-5 w-5 text-gray-600 shrink-0" />
                        <div className="flex-1 min-w-0">
                            <label className="block text-xs font-medium text-gray-500">Guests</label>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(Number(e.target.value))}
                                className="w-full text-sm font-medium text-gray-900 focus:outline-none bg-transparent"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <Button type="submit" size="lg" className="shrink-0 h-14 w-14 !px-0 !rounded-xl">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </form>
    )
}

/**
 * Home (Landing) Page
 */
function Home() {
    // React Query is used for data fetching
    const { data: featuredHostels = MOCK_HOSTELS.slice(0, 6), isLoading } = useQuery({
        queryKey: ['featuredHostels'],
        queryFn: getFeaturedHostels,
        staleTime: 5 * 60 * 1000,
    })

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* ── Hero Section ─────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-white">
                {/* Content */}
                <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
                    <div className="max-w-3xl">
                        {/* Tag */}
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm text-gray-700">
                            <Award className="h-4 w-4 text-gray-500" />
                            Kenya's #1 Hostel Booking Platform
                        </div>
                        {/* Heading */}
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl leading-tight mb-4">
                            Find Your Perfect <span className="text-gray-500">Hostel</span> in Kenya
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 max-w-2xl">
                            Discover budget-friendly stays, authentic experiences, and amazing communities across Kenya. Book with real reviews, real photos, and real prices.
                        </p>

                        {/* Search Form */}
                        <HeroSearchForm />

                        {/* Trust signals */}
                        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                            {[
                                { icon: Check, text: 'Best Price Guarantee' },
                                { icon: Shield, text: 'Secure Booking' },
                                { icon: Zap, text: 'Instant Confirmation' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} className="flex items-center gap-1.5">
                                    <Icon className="h-3.5 w-3.5 text-gray-500" />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Stats Banner ────────────────────────────────────────── */}
            <section className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-8 py-10 md:grid-cols-4">
                        {[
                            { value: '500+', label: 'Hostels Listed' },
                            { value: '50K+', label: 'Happy Travellers' },
                            { value: '47', label: 'Counties Covered' },
                            { value: '4.8★', label: 'Average Rating' },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center">
                                <p className="text-3xl font-extrabold text-gray-800">{value}</p>
                                <p className="text-sm text-gray-500 mt-1">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Featured Hostels ─────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-end justify-between mb-10">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-1">Top Picks</p>
                            <h2 className="text-3xl font-bold text-gray-900">Featured Hostels</h2>
                        </div>
                        <Link to="/hostels" className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-800 hover:gap-2 transition-all">
                            View all <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {isLoading
                            ? Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="rounded-2xl bg-gray-100 h-80 animate-pulse" />
                            ))
                            : featuredHostels.slice(0, 6).map((hostel) => (
                                <HostelCard key={hostel.id} hostel={hostel} />
                            ))
                        }
                    </div>

                    <div className="mt-10 text-center sm:hidden">
                        <Link to="/hostels">
                            <Button variant="outline" size="lg">View All Hostels</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Popular Destinations ─────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-1">Explore Kenya</p>
                        <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {POPULAR_DESTINATIONS.map((dest) => (
                            <Link
                                key={dest.id}
                                to={`/hostels?location=${dest.city}`}
                                className="group relative rounded-2xl overflow-hidden h-48 cursor-pointer"
                            >
                                <img
                                    src={dest.image}
                                    alt={dest.city}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="font-bold text-white text-lg leading-tight">{dest.city}</p>
                                    <p className="text-sm text-white/80">{dest.hostelCount} hostels</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How It Works ─────────────────────────────────────────── */}
            <section className="py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-1">Simple Process</p>
                        <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
                    </div>
                    <div className="grid gap-8 md:grid-cols-3">
                        {HOW_IT_WORKS.map(({ step, title, description }) => (
                            <div key={step} className="text-center">
                                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-sm shadow-gray-200">
                                    <span className="text-2xl font-extrabold text-gray-700">{step}</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Testimonials ─────────────────────────────────────────── */}
            <section className="py-20 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <p className="text-sm font-semibold uppercase tracking-wider text-gray-800 mb-1">Reviews</p>
                        <h2 className="text-3xl font-bold text-gray-900">What Travellers Say</h2>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {TESTIMONIALS.map((t) => (
                            <div key={t.id} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                                <div className="flex gap-0.5 mb-3">
                                    {Array.from({ length: t.rating }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-gray-500" />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-4">"{t.text}"</p>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-sm font-bold text-gray-700">
                                        {t.avatar}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                                        <p className="text-xs text-gray-500">{t.country}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Section ──────────────────────────────────────────── */}
            <section className="border-t border-gray-200 bg-white py-20">
                <div className="mx-auto max-w-3xl px-4 text-center">
                    <h2 className="mb-4 text-4xl font-extrabold text-gray-900">Ready for Your Next Adventure?</h2>
                    <p className="mb-10 text-xl text-gray-600">Join thousands of travellers who discover Kenya's best hostels with Grand7Homes.</p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <Link to="/hostels"><Button size="xl" variant="outline" className="w-full sm:w-auto">Browse Hostels <ChevronRight className="h-5 w-5" /></Button></Link>
                        <Link to="/signup"><Button size="xl" className="w-full sm:w-auto">Sign Up Free</Button></Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Home
