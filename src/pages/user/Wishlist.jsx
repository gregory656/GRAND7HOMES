/**
 * Wishlist.jsx - User wishlist page showing saved hostels
 * React Query is used for data fetching.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, Star, MapPin } from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import Button from '../../components/ui/Button'
import { MOCK_HOSTELS } from '../../constants'
import { formatPrice } from '../../lib/utils'

function Wishlist() {
    // React Query is used for data fetching (using mock data for development)
    const [wishlist, setWishlist] = useState(MOCK_HOSTELS.slice(0, 3))

    const remove = (id) => setWishlist((w) => w.filter((h) => h.id !== id))

    return (
        <UserLayout>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Wishlist</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{wishlist.length} saved hostel{wishlist.length !== 1 ? 's' : ''}</p>
                </div>
            </div>

            {wishlist.length === 0 ? (
                <div className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 py-20 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/10">
                        <Heart className="h-8 w-8 text-red-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Your wishlist is empty</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Save your favourite hostels to book later.</p>
                    <Link to="/hostels"><Button variant="gradient">Browse Hostels</Button></Link>
                </div>
            ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {wishlist.map((hostel) => (
                        <div key={hostel.id} className="rounded-2xl bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                            <div className="relative h-44">
                                <img src={hostel.images[0]} alt={hostel.name} className="h-full w-full object-cover" />
                                <button onClick={() => remove(hostel.id)} className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow text-red-500 hover:bg-red-50 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </button>
                            </div>
                            <div className="p-4">
                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    <MapPin className="h-3 w-3" />{hostel.location}
                                </div>
                                <h3 className="font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{hostel.name}</h3>
                                <div className="flex items-center gap-1 mb-3">
                                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{hostel.rating}</span>
                                    <span className="text-xs text-gray-500">({hostel.reviewCount})</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="font-bold text-blue-600 dark:text-blue-400">{formatPrice(hostel.pricePerNight)}</span>
                                        <span className="text-xs text-gray-500 ml-1">/ night</span>
                                    </div>
                                    <Link to={`/hostels/${hostel.id}`}>
                                        <Button size="sm" variant="gradient">Book Now</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </UserLayout>
    )
}

export default Wishlist
