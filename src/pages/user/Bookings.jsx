/**
 * Bookings.jsx - My bookings page with tabs and booking cards
 * React Query is used for data fetching.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, MapPin, Users, Eye, X, Edit } from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { Card } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { SectionLoader } from '../../components/ui/Spinner'
import { getUserBookings } from '../../services/bookingService'
import { MOCK_BOOKINGS, STATUS_COLORS } from '../../constants'
import { formatPrice, formatDate } from '../../lib/utils'

const TABS = ['All', 'Upcoming', 'Completed', 'Cancelled']

function Bookings() {
    const [activeTab, setActiveTab] = useState('All')

    // React Query is used for data fetching
    const { data: bookings = MOCK_BOOKINGS, isLoading } = useQuery({
        queryKey: ['userBookings'],
        queryFn: getUserBookings,
        staleTime: 2 * 60 * 1000,
    })

    const filtered = bookings.filter((b) => {
        if (activeTab === 'All') return true
        return b.status.toLowerCase() === activeTab.toLowerCase() ||
            (activeTab === 'Upcoming' && b.status === 'confirmed')
    })

    return (
        <UserLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-6">
                {TABS.map((tab) => {
                    const count = tab === 'All' ? bookings.length : bookings.filter((b) => b.status.toLowerCase() === tab.toLowerCase() || (tab === 'Upcoming' && b.status === 'confirmed')).length
                    return (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 rounded-lg py-2 px-3 text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-white shadow text-gray-900 dark:bg-gray-700 dark:text-white'
                                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                                }`}
                        >
                            {tab} {count > 0 && <span className="ml-1 text-xs opacity-60">({count})</span>}
                        </button>
                    )
                })}
            </div>

            {isLoading ? (
                <SectionLoader />
            ) : filtered.length === 0 ? (
                <div className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-16 text-center">
                    <p className="text-gray-500 dark:text-gray-400 mb-3">No {activeTab.toLowerCase()} bookings.</p>
                    <Link to="/hostels"><Button variant="gradient">Browse Hostels</Button></Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map((booking) => {
                        const statusInfo = STATUS_COLORS[booking.status] || STATUS_COLORS.confirmed
                        return (
                            <div key={booking.id} className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                                <div className="flex flex-col sm:flex-row">
                                    <img src={booking.hostelImage} alt="" className="h-44 sm:h-auto sm:w-40 object-cover shrink-0" />
                                    <div className="flex-1 p-5">
                                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Ref: {booking.referenceNo}</p>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{booking.hostelName}</h3>
                                                <p className="text-sm text-blue-600 dark:text-blue-400">{booking.roomType}</p>
                                            </div>
                                            <span className={`text-xs font-bold rounded-full px-3 py-1 ${statusInfo.bg} ${statusInfo.text}`}>
                                                {statusInfo.label}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-6 gap-y-1.5 mb-4 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-blue-500" />{formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}</div>
                                            <div className="flex items-center gap-1.5"><Users className="h-4 w-4 text-blue-500" />{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</div>
                                            <div className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-blue-500" />{booking.hostelLocation}</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <p className="font-bold text-gray-900 dark:text-white">{formatPrice(booking.totalAmount)}</p>
                                            <div className="flex gap-2">
                                                <Link to={`/user/bookings/${booking.id}`}>
                                                    <Button size="sm" variant="outline"><Eye className="h-3.5 w-3.5" />View</Button>
                                                </Link>
                                                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                                    <Button size="sm" variant="destructive"><X className="h-3.5 w-3.5" />Cancel</Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </UserLayout>
    )
}

export default Bookings
