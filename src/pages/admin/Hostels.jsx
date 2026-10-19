/**
 * AdminHostels.jsx - Manage hostels admin page
 */

import { useState } from 'react'
import { Plus, Edit, Trash2, Eye, Search, Star } from 'lucide-react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Card } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { MOCK_HOSTELS } from '../../constants'
import { formatPrice } from '../../lib/utils'

function AdminHostels() {
    const [search, setSearch] = useState('')
    const filtered = MOCK_HOSTELS.filter((h) =>
        h.name.toLowerCase().includes(search.toLowerCase()) ||
        h.city.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <AdminLayout>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Manage Hostels</h1>
                    <p className="text-sm text-gray-500">{MOCK_HOSTELS.length} hostels listed</p>
                </div>
                <Button variant="gradient"><Plus className="h-4 w-4" />Add Hostel</Button>
            </div>

            {/* Search & Filter */}
            <div className="flex gap-3 mb-5">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search hostels..."
                        className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-gray-600"
                    />
                </div>
            </div>

            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {['Hostel', 'Location', 'Category', 'Rating', 'Price/Night', 'Status', 'Actions'].map((h) => (
                                    <th key={h} className="py-3 px-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filtered.map((hostel) => (
                                <tr key={hostel.id} className="hover:bg-white transition-colors">
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-3">
                                            <img src={hostel.images[0]} alt="" className="h-10 w-10 rounded-xl object-cover shrink-0" />
                                            <p className="font-medium text-gray-900 max-w-[160px] truncate">{hostel.name}</p>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-gray-600">{hostel.city}</td>
                                    <td className="py-3 px-4">
                                        <Badge variant={hostel.category === 'Budget' ? 'primary' : 'accent'}>{hostel.category}</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" /><span className="font-medium">{hostel.rating}</span></div>
                                    </td>
                                    <td className="py-3 px-4 font-medium text-gray-900">{formatPrice(hostel.pricePerNight)}</td>
                                    <td className="py-3 px-4"><Badge variant="success">Active</Badge></td>
                                    <td className="py-3 px-4">
                                        <div className="flex gap-1">
                                            <Button size="icon" variant="ghost" className="h-8 w-8"><Eye className="h-3.5 w-3.5 text-gray-600" /></Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8"><Edit className="h-3.5 w-3.5 text-gray-500" /></Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8"><Trash2 className="h-3.5 w-3.5 text-red-500" /></Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </AdminLayout>
    )
}

export default AdminHostels
