/**
 * UserLayout.jsx - Layout wrapper for authenticated user dashboard pages
 * Includes a sidebar with navigation and a main content area.
 */

import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, BookOpen, User, Star, Heart,
    Settings, LogOut, ChevronRight
} from 'lucide-react'
import Navbar from './Navbar'
import { useAuth } from '../../contexts/AuthContext'

// Sidebar navigation links for the user dashboard
const USER_NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/user/dashboard' },
    { icon: BookOpen, label: 'My Bookings', to: '/user/bookings' },
    { icon: User, label: 'Profile', to: '/user/profile' },
    { icon: Star, label: 'My Reviews', to: '/user/reviews' },
    { icon: Heart, label: 'Wishlist', to: '/user/wishlist' },
    { icon: Settings, label: 'Settings', to: '/user/settings' },
]

/**
 * UserLayout wraps all user dashboard pages with the sidebar and navbar.
 * @param {React.ReactNode} children - Page content to render in the main area
 */
function UserLayout({ children }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex gap-8">

                    {/* Sidebar */}
                    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2">
                        {/* User info card */}
                        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 mb-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full gradient-primary text-lg font-bold text-white">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation links */}
                        <nav className="rounded-xl border border-gray-200 bg-white py-2 dark:border-gray-700 dark:bg-gray-800">
                            {USER_NAV.map(({ icon: Icon, label, to }) => (
                                <NavLink
                                    key={to}
                                    to={to}
                                    className={({ isActive }) =>
                                        `flex items-center justify-between px-4 py-2.5 text-sm transition-colors ${isActive
                                            ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900/20 dark:text-blue-400'
                                            : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'
                                        }`
                                    }
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </div>
                                    <ChevronRight className="h-3 w-3 opacity-50" />
                                </NavLink>
                            ))}
                            <div className="border-t border-gray-100 dark:border-gray-700 mt-1 pt-1">
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 animate-fade-in">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default UserLayout
