/**
 * Reviews.jsx - User reviews page
 */

import { useState } from 'react'
import { Star, Edit, Trash2, Plus } from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import { MOCK_REVIEWS, MOCK_HOSTELS } from '../../constants'
import { formatDate } from '../../lib/utils'

function Reviews() {
    const [activeTab, setActiveTab] = useState('All')
    const reviews = MOCK_REVIEWS.slice(0, 3).map((r) => ({
        ...r,
        status: r.id === 'rv1' ? 'pending' : 'published',
        hostelName: MOCK_HOSTELS.find((h) => h.id === r.hostelId)?.name || 'Unknown',
        hostelImage: MOCK_HOSTELS.find((h) => h.id === r.hostelId)?.images[0],
    }))

    const filtered = activeTab === 'All' ? reviews : reviews.filter((r) => r.status === activeTab.toLowerCase())
    const avgRating = reviews.reduce((s, r) => s + r.rating, 0) / (reviews.length || 1)

    return (
        <UserLayout>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Reviews</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { label: 'Total Reviews', value: reviews.length },
                    { label: 'Average Rating', value: avgRating.toFixed(1) + '★' },
                    { label: 'Published', value: reviews.filter((r) => r.status === 'published').length },
                ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1 mb-5">
                {['All', 'Published', 'Pending'].map((t) => (
                    <button key={t} onClick={() => setActiveTab(t)}
                        className={`flex-1 rounded-lg py-2 text-sm font-medium transition-all ${activeTab === t ? 'bg-white shadow text-gray-900 dark:bg-gray-700 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {t}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {filtered.map((review) => (
                    <Card key={review.id}>
                        <CardContent className="py-4">
                            <div className="flex gap-3">
                                <img src={review.hostelImage} alt="" className="h-14 w-14 rounded-xl object-cover shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 flex-wrap">
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white text-sm">{review.hostelName}</p>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                {Array.from({ length: review.rating }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />)}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant={review.status === 'published' ? 'success' : 'warning'}>{review.status}</Badge>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">{review.text}</p>
                                    <div className="flex items-center justify-between mt-3">
                                        <p className="text-xs text-gray-400">{formatDate(review.date)}</p>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="ghost"><Edit className="h-3.5 w-3.5" /></Button>
                                            <Button size="sm" variant="ghost" className="text-red-500"><Trash2 className="h-3.5 w-3.5" /></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </UserLayout>
    )
}

export default Reviews
