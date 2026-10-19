/**
 * HostelCard.jsx - Individual hostel listing card
 * Displays hostel image, name, location, rating, price, amenities, and action buttons.
 * Lucide React icons are imported here (Star, Heart, MapPin, Calendar, Users)
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Heart, MapPin, Wifi, Car, Coffee, Waves } from 'lucide-react'
import { cn, formatPrice } from '../../lib/utils'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

// Map amenity names to icons (showing first 4)
const AMENITY_ICONS = { WiFi: Wifi, Parking: Car, Coffee, Pool: Waves, Bar: Coffee }

/**
 * HostelCard displays a single hostel in a grid/list layout.
 * @param {object} hostel - Hostel data object
 * @param {function} onWishlist - Callback when wishlist button clicked
 */
function HostelCard({ hostel, onWishlist }) {
    const [wishlisted, setWishlisted] = useState(hostel.isWishlisted || false)
    const [imgError, setImgError] = useState(false)

    const handleWishlist = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setWishlisted(!wishlisted)
        onWishlist?.(hostel.id, !wishlisted)
    }

    // Render star ratings
    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={cn(
                    'h-3.5 w-3.5',
                    i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                )}
            />
        ))
    }

    return (
        <Link to={`/hostels/${hostel.id}`} className="group block">
            <div className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">

                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                    <img
                        src={imgError ? 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80' : hostel.images[0]}
                        alt={hostel.name}
                        onError={() => setImgError(true)}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                        <Badge variant={hostel.category === 'Budget' ? 'primary' : hostel.category === 'Luxury' ? 'accent' : 'success'}>
                            {hostel.category}
                        </Badge>
                    </div>

                    {/* Wishlist button */}
                    <button
                        onClick={handleWishlist}
                        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow transition-transform hover:scale-110"
                        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart
                            className={cn(
                                'h-4 w-4 transition-colors',
                                wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                            )}
                        />
                    </button>
                </div>

                {/* Card Body */}
                <div className="p-4">
                    {/* Location */}
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                        <MapPin className="h-3.5 w-3.5 text-gray-600" />
                        {hostel.location}
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-gray-900 text-base leading-tight mb-2 group-hover:text-gray-800 transition-colors line-clamp-2">
                        {hostel.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5 mb-3">
                        <div className="flex items-center gap-0.5">{renderStars(hostel.rating)}</div>
                        <span className="text-sm font-semibold text-gray-900">{hostel.rating}</span>
                        <span className="text-xs text-gray-500">({hostel.reviewCount} reviews)</span>
                    </div>

                    {/* Amenities (first 4) */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {hostel.amenities.slice(0, 4).map((amenity) => (
                            <span
                                key={amenity}
                                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                            >
                                {amenity}
                            </span>
                        ))}
                        {hostel.amenities.length > 4 && (
                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                                +{hostel.amenities.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Price + Action */}
                    <div className="flex items-center justify-between">
                        <div>
                            <span className="text-lg font-bold text-gray-800">
                                {formatPrice(hostel.pricePerNight)}
                            </span>
                            <span className="text-xs text-gray-500"> / night</span>
                        </div>
                        <Button size="sm" variant="gradient" className="shrink-0">
                            View Details
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HostelCard
