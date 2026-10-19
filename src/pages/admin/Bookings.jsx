/**
 * AdminBookings.jsx - Manage all bookings admin page
 */

import { useState } from 'react'
import { Search, Download, Eye, X } from 'lucide-react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { MOCK_BOOKINGS, STATUS_COLORS } from '../../constants'
import { formatPrice, formatDate } from '../../lib/utils'

function AdminBookings() {
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    const filtered = MOCK_BOOKINGS.filter((b) => {
        const matchSearch = b.guestName.toLowerCase().includes(search.toLowerCase()) || b.referenceNo.toLowerCase().includes(search.toLowerCase())
        const matchStatus = statusFilter === 'all' || b.status === statusFilter
        return matchSearch && matchStatus
    })

    return (
        <AdminLayout>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage Bookings</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{MOCK_BOOKINGS.length} total bookings</p>
                </div>
                <Button variant="outline"><Download className="h-4 w-4" />Export CSV</Button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-5">
                <div className="relative flex-1 min-w-[200px] max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by guest or ref..."
                        className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none"
                    />
                </div>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 focus:outline-none">
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                                {['Reference', 'Guest', 'Hostel', 'Check-in', 'Check-out', 'Amount', 'Status', 'Actions'].map((h) => (
                                    <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {filtered.map((b) => {
                                const s = STATUS_COLORS[b.status]
                                return (
                                    <tr key={b.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                        <td className="py-3 px-4 font-mono text-xs">{b.referenceNo}</td>
                                        <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">{b.guestName}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400 max-w-[140px] truncate">{b.hostelName}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{formatDate(b.checkIn)}</td>
                                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{formatDate(b.checkOut)}</td>
                                        <td className="py-3 px-4 font-semibold">{formatPrice(b.totalAmount)}</td>
                                        <td className="py-3 px-4">
                                            <span className={`text-xs font-bold rounded-full px-2.5 py-0.5 ${s?.bg} ${s?.text}`}>{s?.label}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex gap-1">
                                                <Button size="icon" variant="ghost" className="h-7 w-7"><Eye className="h-3.5 w-3.5 text-blue-500" /></Button>
                                                {b.status !== 'cancelled' && b.status !== 'completed' && (
                                                    <Button size="icon" variant="ghost" className="h-7 w-7"><X className="h-3.5 w-3.5 text-red-500" /></Button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </AdminLayout>
    )
}

export default AdminBookings
