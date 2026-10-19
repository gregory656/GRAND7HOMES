/**
 * Footer.jsx - Application footer with company info and navigation links
 * Lucide React icons are imported here (Hotel, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube)
 */

import { Link } from 'react-router-dom'
import { Hotel, Mail, Phone, MapPin, CircleUserRound, MessageCircle, Camera, CirclePlay, Heart } from 'lucide-react'

/**
 * Footer component with company info, quick links, and social media icons.
 */
function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="border-t border-gray-200 bg-white text-gray-600">
            {/* Main footer content */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                                <Hotel className="h-5 w-5 text-gray-700" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">
                                Grand<span className="text-gray-500">7</span>Homes
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-600 mb-6">
                            Discover amazing hostels across Kenya. Budget-friendly stays with real reviews from real travellers.
                        </p>
                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {[
                                { Icon: CircleUserRound, href: '#', label: 'Facebook' },
                                { Icon: MessageCircle, href: '#', label: 'Twitter' },
                                { Icon: Camera, href: '#', label: 'Instagram' },
                                { Icon: CirclePlay, href: '#', label: 'YouTube' },
                            ].map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-900"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Explore</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Browse Hostels', to: '/hostels' },
                                { label: 'Popular Destinations', to: '/hostels' },
                                { label: 'Last-Minute Deals', to: '/hostels' },
                                { label: 'Group Bookings', to: '/hostels' },
                                { label: 'My Wishlist', to: '/user/wishlist' },
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Support</h3>
                        <ul className="space-y-2.5">
                            {[
                                { label: 'Help Center', to: '#' },
                                { label: 'Cancellation Policy', to: '#' },
                                { label: 'Privacy Policy', to: '#' },
                                { label: 'Terms of Service', to: '#' },
                                { label: 'List Your Hostel', to: '#' },
                            ].map(({ label, to }) => (
                                <li key={label}>
                                    <Link to={to} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Contact</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="h-4 w-4 mt-0.5 text-gray-600 shrink-0" />
                                <span className="text-sm text-gray-600">Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="h-4 w-4 text-gray-600 shrink-0" />
                                <a href="tel:+254700000000" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    +254 700 000 000
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-600 shrink-0" />
                                <a href="mailto:hello@grand7homes.co.ke" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                                    hello@grand7homes.co.ke
                                </a>
                            </li>
                        </ul>

                        {/* Newsletter */}
                        <div className="mt-6">
                            <p className="text-sm font-medium text-gray-900 mb-2">Newsletter</p>
                            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-900 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 border border-gray-200 transition-colors"
                                >
                                    Join
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-200">
                <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
                    <p className="text-xs text-gray-500">
                        © {currentYear} Grand7Homes. All rights reserved.
                    </p>
                    <p className="flex items-center gap-1 text-xs text-gray-500">
                        Made with <Heart className="h-3 w-3 text-red-400" /> in Kenya
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
