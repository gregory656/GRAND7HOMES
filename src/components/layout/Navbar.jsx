/**
 * Navbar.jsx - Main navigation bar with logo, search, auth, and booking cart
 * Lucide React icons are imported here (Search, ShoppingCart, User, Menu, Heart, X, Hotel)
 * Responsive: hamburger menu on mobile, full nav on desktop.
 */

import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
    Search, ShoppingCart, User, Menu, Heart,
    X, Hotel, ChevronDown, LogOut, LayoutDashboard, BookOpen
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { useBooking } from '../../contexts/BookingContext'
import Button from '../ui/Button'
import { NAV_LINKS } from '../../constants'

/**
 * Main application navbar.
 * Shows logo, navigation links, search bar, auth buttons, and booking cart icon.
 */
function Navbar() {
    const { user, isAuthenticated, isAdmin, logout } = useAuth()
    const { itemCount } = useBooking()
    const navigate = useNavigate()

    const [mobileOpen, setMobileOpen] = useState(false)
    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            navigate(`/hostels?location=${encodeURIComponent(searchQuery.trim())}`)
            setSearchQuery('')
            setMobileOpen(false)
        }
    }

    // Handle logout
    const handleLogout = () => {
        logout()
        setUserMenuOpen(false)
        navigate('/')
    }

    return (
        <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between gap-4">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                            <Hotel className="h-5 w-5 text-gray-700" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">
                            Grand<span className="text-gradient">7</span>Homes
                        </span>
                    </Link>

                    {/* Desktop Search Bar */}
                    <form onSubmit={handleSearch} className="hidden flex-1 max-w-md md:flex">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search destinations..."
                                className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600/20"
                            />
                        </div>
                    </form>

                    {/* Desktop Nav Links */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <NavLink
                                key={link.href}
                                to={link.href}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
                                        ? 'bg-gray-50 text-gray-800'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2">
{/* Booking Cart */}
                        <Link to="/booking" className="relative">
                            <Button variant="ghost" size="icon" aria-label="Booking cart">
                                <ShoppingCart className="h-5 w-5" />
                                {itemCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-700 border border-gray-200">
                                        {itemCount}
                                    </span>
                                )}
                            </Button>
                        </Link>

                        {/* Auth Section */}
                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white"
                                >
                                    <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-primary text-xs font-bold text-gray-700">
                                        {user?.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden sm:inline">{user?.name?.split(' ')[0]}</span>
                                    <ChevronDown className="h-3 w-3" />
                                </button>

                                {/* User Dropdown Menu */}
                                {userMenuOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                                        <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-gray-200 bg-white py-1 shadow-xl animate-fade-in">
                                            <div className="border-b border-gray-100 px-4 py-3">
                                                <p className="font-semibold text-gray-900">{user?.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                                            </div>
                                            {isAdmin && (
                                                <Link to="/admin/dashboard" onClick={() => setUserMenuOpen(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-white">
                                                    <LayoutDashboard className="h-4 w-4" /> Admin Dashboard
                                                </Link>
                                            )}
                                            <Link to="/user/dashboard" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-white">
                                                <User className="h-4 w-4" /> My Dashboard
                                            </Link>
                                            <Link to="/user/bookings" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-white">
                                                <BookOpen className="h-4 w-4" /> My Bookings
                                            </Link>
                                            <Link to="/user/wishlist" onClick={() => setUserMenuOpen(false)}
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-white">
                                                <Heart className="h-4 w-4" /> Wishlist
                                            </Link>
                                            <div className="border-t border-gray-100 mt-1 pt-1">
                                                <button onClick={handleLogout}
                                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                                                    <LogOut className="h-4 w-4" /> Sign Out
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-2">
                                <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
                                <Button size="sm" onClick={() => navigate('/signup')}>Sign Up</Button>
                            </div>
                        )}

                        {/* Mobile Hamburger */}
                        <Button
                            variant="ghost" size="icon"
                            className="lg:hidden"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="border-t border-gray-200 py-4 animate-fade-in">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search destinations..."
                                    className="w-full rounded-full border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm"
                                />
                            </div>
                        </form>

                        {/* Mobile Nav Links */}
                        <nav className="space-y-1">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.href}
                                    to={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={({ isActive }) =>
                                        `block px-4 py-2.5 rounded-lg text-sm font-medium ${isActive
                                            ? 'bg-gray-50 text-gray-800'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>

                        {/* Mobile Auth */}
                        {!isAuthenticated && (
                            <div className="mt-4 flex gap-2 pt-4 border-t border-gray-200">
                                <Button variant="outline" className="w-full" onClick={() => { navigate('/login'); setMobileOpen(false) }}>Login</Button>
                                <Button className="w-full" onClick={() => { navigate('/signup'); setMobileOpen(false) }}>Sign Up</Button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    )
}

export default Navbar
