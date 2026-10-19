/**
 * AdminDashboard.jsx - Admin analytics dashboard
 * Uses Recharts for analytics visualization.
 * Lucide React icons: TrendingUp, Hotel, BookOpen, Users, Star, DollarSign, Eye
 */

import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from 'recharts'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { TrendingUp, Hotel, BookOpen, Users, Star, DollarSign, Eye, ArrowUpRight } from 'lucide-react'
import { MOCK_BOOKINGS, MOCK_HOSTELS, STATUS_COLORS } from '../../constants'
import { formatPrice, formatDate } from '../../lib/utils'

// Mock revenue data for charts
const REVENUE_DATA = [
    { month: 'Jul', revenue: 320000, bookings: 45 },
    { month: 'Aug', revenue: 480000, bookings: 62 },
    { month: 'Sep', revenue: 390000, bookings: 51 },
    { month: 'Oct', revenue: 520000, bookings: 74 },
    { month: 'Nov', revenue: 610000, bookings: 89 },
    { month: 'Dec', revenue: 780000, bookings: 112 },
]

const CATEGORY_DATA = [
    { name: 'Budget', value: 45, color: '#3b82f6' },
    { name: 'Mid-range', value: 35, color: '#8b5cf6' },
    { name: 'Luxury', value: 20, color: '#d946ef' },
]

function StatCard({ icon: Icon, label, value, sub, trend }) {
    return (
        <div className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-1">{value}</p>
                    {sub && <p className="text-xs text-green-500 mt-1 flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" />{sub}</p>}
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary">
                    <Icon className="h-6 w-6 text-white" />
                </div>
            </div>
        </div>
    )
}

function AdminDashboard() {
    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Overview of platform performance</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6 xl:grid-cols-3">
                <StatCard icon={DollarSign} label="Revenue (This Month)" value="KES 780,000" sub="+26% vs last month" />
                <StatCard icon={BookOpen} label="Total Bookings" value="112" sub="+18 this week" />
                <StatCard icon={Hotel} label="Active Hostels" value={MOCK_HOSTELS.length} sub="All Kenya" />
                <StatCard icon={Users} label="Registered Users" value="1,234" sub="+45 this week" />
                <StatCard icon={TrendingUp} label="Occupancy Rate" value="73%" sub="+5% vs last month" />
                <StatCard icon={Star} label="Avg Rating" value="4.6 ★" sub="Platform-wide" />
            </div>

            {/* Charts Row */}
            <div className="grid gap-5 lg:grid-cols-3 mb-6">
                {/* Revenue Line Chart - This uses Recharts for analytics visualization */}
                <div className="lg:col-span-2 rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Revenue (Last 6 Months)</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={REVENUE_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v / 1000}K`} />
                            <Tooltip formatter={(v) => [`KES ${v.toLocaleString()}`, 'Revenue']} />
                            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Category Pie Chart */}
                <div className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5">
                    <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Hostel Categories</h2>
                    <ResponsiveContainer width="100%" height={220}>
                        <PieChart>
                            <Pie data={CATEGORY_DATA} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                                {CATEGORY_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                            </Pie>
                            <Legend />
                            <Tooltip formatter={(v) => [`${v}%`, 'Share']} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bookings Bar Chart */}
            <div className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-5 mb-6">
                <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Bookings per Month</h2>
                <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={REVENUE_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="bookings" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Recent Bookings Table */}
            <Card>
                <CardHeader><CardTitle className="text-base">Recent Bookings</CardTitle></CardHeader>
                <CardContent className="pt-0 overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                {['Reference', 'Guest', 'Hostel', 'Check-in', 'Amount', 'Status', 'Actions'].map((h) => (
                                    <th key={h} className="py-2.5 px-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                            {MOCK_BOOKINGS.map((b) => {
                                const s = STATUS_COLORS[b.status] || STATUS_COLORS.confirmed
                                return (
                                    <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="py-3 px-3 font-mono text-xs text-gray-600 dark:text-gray-400">{b.referenceNo}</td>
                                        <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">{b.guestName}</td>
                                        <td className="py-3 px-3 text-gray-600 dark:text-gray-400 max-w-[140px] truncate">{b.hostelName}</td>
                                        <td className="py-3 px-3 text-gray-600 dark:text-gray-400">{formatDate(b.checkIn)}</td>
                                        <td className="py-3 px-3 font-semibold text-gray-900 dark:text-white">{formatPrice(b.totalAmount)}</td>
                                        <td className="py-3 px-3">
                                            <span className={`text-xs font-semibold rounded-full px-2.5 py-0.5 ${s.bg} ${s.text}`}>{s.label}</span>
                                        </td>
                                        <td className="py-3 px-3">
                                            <button className="text-blue-600 hover:underline text-xs flex items-center gap-1"><Eye className="h-3 w-3" />View</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </AdminLayout>
    )
}

export default AdminDashboard
