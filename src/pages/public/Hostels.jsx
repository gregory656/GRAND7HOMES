/**
 * Hostels.jsx - Hostel listing/search results page
 * Includes filter sidebar, sort options, hostel grid, and pagination.
 * React Query is used for data fetching.
 * Lucide React icons: SlidersHorizontal, Filter, ChevronDown, X
 */

import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { SlidersHorizontal, X, ChevronDown, Search } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import HostelGrid from '../../components/hostel/HostelGrid'
import Button from '../../components/ui/Button'
import { getHostels } from '../../services/hostelService'
import { AMENITIES, CATEGORIES } from '../../constants'

const SORT_OPTIONS = [
    { value: 'rating', label: 'Best Rated' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
]

function Hostels() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [showFilters, setShowFilters] = useState(false)

    // Filters state - initialized from URL params
    const [filters, setFilters] = useState({
        location: searchParams.get('location') || '',
        minPrice: '',
        maxPrice: '',
        rating: '',
        category: '',
        amenities: [],
        sortBy: 'rating',
    })
    const [searchInput, setSearchInput] = useState(filters.location)

    // React Query is used for data fetching
    const { data, isLoading } = useQuery({
        queryKey: ['hostels', filters],
        queryFn: () => getHostels(filters),
        staleTime: 2 * 60 * 1000,
    })

    const hostels = data?.hostels || []

    // Sync URL location param to filter
    useEffect(() => {
        const loc = searchParams.get('location')
        if (loc) setFilters((f) => ({ ...f, location: loc }))
    }, [searchParams])

    const updateFilter = (key, value) => setFilters((f) => ({ ...f, [key]: value }))

    const toggleAmenity = (amenity) => {
        setFilters((f) => ({
            ...f,
            amenities: f.amenities.includes(amenity)
                ? f.amenities.filter((a) => a !== amenity)
                : [...f.amenities, amenity],
        }))
    }

    const clearFilters = () => {
        setFilters({ location: '', minPrice: '', maxPrice: '', rating: '', category: '', amenities: [], sortBy: 'rating' })
        setSearchInput('')
        setSearchParams({})
    }

    const handleLocationSearch = (e) => {
        e.preventDefault()
        updateFilter('location', searchInput)
    }

    const hasActiveFilters = filters.location || filters.minPrice || filters.maxPrice || filters.rating || filters.category || filters.amenities.length

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />

            {/* Page Header */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {filters.location ? `Hostels in ${filters.location}` : 'All Hostels'}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                {isLoading ? 'Searching…' : `${hostels.length} hostel${hostels.length !== 1 ? 's' : ''} found`}
                            </p>
                        </div>
                        {/* Sort + Filter toggle */}
                        <div className="flex items-center gap-3">
                            <select
                                value={filters.sortBy}
                                onChange={(e) => updateFilter('sortBy', e.target.value)}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 focus:outline-none"
                            >
                                {SORT_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <Button
                                variant="outline" size="sm"
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center gap-2"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters {hasActiveFilters && `(${[filters.location, filters.category, ...filters.amenities].filter(Boolean).length})`}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex gap-8">

                    {/* Filter Sidebar */}
                    <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0`}>
                        <div className="rounded-xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5 sticky top-20 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="font-semibold text-gray-900 dark:text-white">Filters</h2>
                                {hasActiveFilters && (
                                    <button onClick={clearFilters} className="text-xs text-red-500 hover:underline flex items-center gap-1">
                                        <X className="h-3 w-3" />Clear all
                                    </button>
                                )}
                            </div>

                            {/* Location Search */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location</label>
                                <form onSubmit={handleLocationSearch} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        placeholder="City or area..."
                                        className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:border-blue-500"
                                    />
                                    <Button type="submit" size="icon" className="shrink-0"><Search className="h-4 w-4" /></Button>
                                </form>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price / Night (KES)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={filters.minPrice}
                                        onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : '')}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={filters.maxPrice}
                                        onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : '')}
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Minimum Rating */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min Rating</label>
                                <div className="flex gap-2">
                                    {[3, 3.5, 4, 4.5].map((r) => (
                                        <button
                                            key={r}
                                            onClick={() => updateFilter('rating', filters.rating === r ? '' : r)}
                                            className={`flex-1 rounded-lg border py-1.5 text-xs font-medium transition-colors ${filters.rating === r
                                                    ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20'
                                                    : 'border-gray-300 text-gray-600 hover:border-gray-400 dark:border-gray-600 dark:text-gray-400'
                                                }`}
                                        >
                                            {r}+
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                                <div className="space-y-2">
                                    {CATEGORIES.map((cat) => (
                                        <label key={cat} className="flex items-center gap-2.5 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="category"
                                                value={cat}
                                                checked={filters.category === cat}
                                                onChange={() => updateFilter('category', filters.category === cat ? '' : cat)}
                                                className="text-blue-600"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Amenities */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amenities</label>
                                <div className="space-y-2 max-h-52 overflow-y-auto">
                                    {AMENITIES.slice(0, 14).map((amenity) => (
                                        <label key={amenity} className="flex items-center gap-2.5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={filters.amenities.includes(amenity)}
                                                onChange={() => toggleAmenity(amenity)}
                                                className="text-blue-600 rounded"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Hostel Grid */}
                    <div className="flex-1 min-w-0">
                        <HostelGrid
                            hostels={hostels}
                            isLoading={isLoading}
                            onClearFilters={clearFilters}
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Hostels
