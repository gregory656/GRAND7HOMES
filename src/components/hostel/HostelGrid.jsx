/**
 * HostelGrid.jsx - Grid layout for displaying multiple hostel cards
 * Includes loading skeleton state and empty state.
 * This component uses React Query for data fetching.
 */

import HostelCard from './HostelCard'
import { SectionLoader } from '../ui/Spinner'
import { Hotel, Search } from 'lucide-react'
import Button from '../ui/Button'
import { Link } from 'react-router-dom'

/**
 * Loading skeleton that mimics the HostelCard layout.
 */
function HostelCardSkeleton() {
    return (
        <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700 animate-pulse">
            <div className="h-52 bg-gray-200 dark:bg-gray-700" />
            <div className="p-4 space-y-3">
                <div className="h-3 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="flex gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-8 w-24 rounded-lg bg-gray-200 dark:bg-gray-700" />
                </div>
            </div>
        </div>
    )
}

/**
 * Empty state shown when no hostels match the current filters.
 */
function EmptyState({ onClearFilters }) {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 mb-4">
                <Search className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No hostels found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                We couldn't find any hostels matching your search criteria. Try adjusting your filters.
            </p>
            <div className="flex gap-3">
                {onClearFilters && (
                    <Button variant="outline" onClick={onClearFilters}>Clear Filters</Button>
                )}
                <Link to="/hostels">
                    <Button>Browse All Hostels</Button>
                </Link>
            </div>
        </div>
    )
}

/**
 * HostelGrid renders hostel cards in a responsive grid.
 * Shows skeletons while loading, empty state when no results.
 * @param {Array} hostels - Array of hostel objects
 * @param {boolean} isLoading - Show loading skeletons
 * @param {function} onClearFilters - Callback to clear filters (for empty state)
 * @param {function} onWishlist - Callback for wishlist toggle
 */
function HostelGrid({ hostels = [], isLoading = false, onClearFilters, onWishlist }) {
    if (isLoading) {
        return (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <HostelCardSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (!hostels.length) {
        return (
            <div className="grid">
                <EmptyState onClearFilters={onClearFilters} />
            </div>
        )
    }

    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {hostels.map((hostel) => (
                <HostelCard key={hostel.id} hostel={hostel} onWishlist={onWishlist} />
            ))}
        </div>
    )
}

export default HostelGrid
