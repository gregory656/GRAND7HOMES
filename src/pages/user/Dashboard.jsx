/**
 * Dashboard.jsx - User dashboard home page
 * Shows stats cards, upcoming bookings, and recent activity.
 * This uses React Context API for authentication.
 * Lucide React icons: Package, Calendar, DollarSign, Award, Clock, TrendingUp
 */

import { Link } from 'react-router-dom'
import { Package, Calendar, DollarSign, Award, Clock, TrendingUp, ArrowRight } from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { useAuth } from '../../contexts/AuthContext'
import { MOCK_BOOKINGS, STATUS_COLORS } from '../../constants'
import { formatPrice, formatDate } from '../../lib/utils'

/**
 * Stats card component for the dashboard overview.
 */
function StatCard({ icon: Icon, label, value, sub, color }) {
    return (
        <div className={`rounded-2xl p-5 ${color}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium opacity-80">{label}</p>
                    <p className="text-3xl font-extrabold mt-1">{value}</p>
                    {sub && <p className="text-xs opacity-70 mt-1">{sub}</p>}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
        </div>
    )
}

function Dashboard() {
    // This uses React Context API for authentication
    const { user } = useAuth()
    const upcomingBookings = MOCK_BOOKINGS.filter((b) => b.status === 'upcoming' || b.status === 'confirmed')
    const totalSpent = MOCK_BOOKINGS.filter((b) => b.status !== 'cancelled').reduce((s, b) => s + b.totalAmount, 0)

    return (
        <UserLayout>
            {/* Welcome Banner */}
            <div className="gradient-primary rounded-2xl p-6 text-white mb-6 relative overflow-hidden">
                <div className="absolute right-0 top-0 opacity-10 text-[120px] font-extrabold leading-none select-none">G7</div>
                <p className="text-blue-100 text-sm mb-1">Welcome back 👋</p>
                <h1 className="text-2xl font-bold">{user?.name || 'Traveller'}</h1>
                <p className="text-blue-100 text-sm mt-1">Ready for your next adventure? You have {upcomingBookings.length} upcoming trip{upcomingBookings.length !== 1 ? 's' : ''}.</p>
                <Link to="/hostels" className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium hover:bg-white/30 transition-colors">
                    Browse Hostels <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </div>

            {/* Stats Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-4">
                <StatCard
                    icon={Package} label="Total Bookings" value={MOCK_BOOKINGS.length}
                    sub="All time" color="bg-blue-600 text-white"
                />
                <StatCard
                    icon={Calendar} label="Upcoming Trips" value={upcomingBookings.length}
                    sub="Next 30 days" color="bg-purple-600 text-white"
                />
                <StatCard
                    icon={DollarSign} label="Total Spent" value={formatPrice(totalSpent)}
                    sub="All bookings" color="bg-emerald-600 text-white"
                />
                <StatCard
                    icon={Award} label="Loyalty Points" value={user?.loyaltyPoints || 450}
                    sub="Available points" color="bg-amber-500 text-white"
                />
            </div>

            {/* Upcoming Bookings */}
            <Card className="mb-6">
                <CardHeader className="flex-row items-center justify-between">
                    <CardTitle className="text-base">Upcoming Bookings</CardTitle>
                    <Link to="/user/bookings" className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                        View all <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </CardHeader>
                <CardContent className="pt-0">
                    {upcomingBookings.length === 0 ? (
                        <div className="py-10 text-center">
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">No upcoming trips yet.</p>
                            <Link to="/hostels" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Browse Hostels</Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {upcomingBookings.map((booking) => {
                                const statusInfo = STATUS_COLORS[booking.status] || STATUS_COLORS.confirmed
                                return (
                                    <Link key={booking.id} to={`/user/bookings/${booking.id}`}>
                                        <div className="flex items-center gap-4 rounded-xl border border-gray-100 dark:border-gray-700 p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                            <img src={booking.hostelImage} alt="" className="h-14 w-14 rounded-xl object-cover shrink-0" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{booking.hostelName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                    {formatDate(booking.checkIn)} → {formatDate(booking.checkOut)} · {booking.roomType}
                                                </p>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className={`inline-block text-xs font-semibold rounded-full px-2 py-0.5 ${statusInfo.bg} ${statusInfo.text}`}>
                                                    {statusInfo.label}
                                                </span>
                                                <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{formatPrice(booking.totalAmount)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="space-y-3">
                        {[
                            { icon: '📋', text: 'Booking confirmed — Nairobi Central Backpackers', time: '2 days ago' },
                            { icon: '💳', text: 'Payment of KES 8,800 processed', time: '2 days ago' },
                            { icon: '⭐', text: 'You reviewed Nakuru Safari Base (5 stars)', time: '1 week ago' },
                            { icon: '🏨', text: 'Completed stay at Nakuru Safari Base', time: '1 week ago' },
                        ].map((a, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-xl">{a.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-700 dark:text-gray-300 truncate">{a.text}</p>
                                    <p className="text-xs text-gray-400 dark:text-gray-500">{a.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </UserLayout>
    )
}

export default Dashboard
