/**
 * AdminLayout.jsx - Layout wrapper for admin dashboard pages
 * Dark sidebar navigation with stats and admin menu.
 */

import { NavLink, useNavigate } from 'react-router-dom'
import {
    LayoutDashboard, Hotel, BookOpen, Users, Star,
    LogOut, ChevronRight, BarChart3, Menu, X
} from 'lucide-react'
import { useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from '../../contexts/AuthContext'

// Admin sidebar navigation links
const ADMIN_NAV = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: Hotel, label: 'Hostels', to: '/admin/hostels' },
    { icon: BookOpen, label: 'Bookings', to: '/admin/bookings' },
    { icon: Users, label: 'Users', to: '/admin/users' },
    { icon: Star, label: 'Reviews', to: '/admin/reviews' },
    { icon: BarChart3, label: 'Analytics', to: '/admin/analytics' },
]

/**
 * AdminLayout wraps all admin dashboard pages.
 * @param {React.ReactNode} children
 */
function AdminLayout({ children }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(true)

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            <Navbar />
            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} shrink-0 bg-gray-900 dark:bg-gray-950 transition-all duration-300 hidden md:flex flex-col`}>
                    {/* Toggle button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex items-center justify-center h-12 w-full border-b border-gray-700 text-gray-400 hover:text-white transition-colors"
                    >
                        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>

                    {/* Admin info */}
                    {sidebarOpen && (
                        <div className="p-4 border-b border-gray-700">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-sm font-bold text-white shrink-0">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-400">Administrator</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="flex-1 py-4">
                        {ADMIN_NAV.map(({ icon: Icon, label, to }) => (
                            <NavLink
                                key={to}
                                to={to}
                                title={!sidebarOpen ? label : undefined}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isActive
                                        ? 'bg-blue-600/20 text-blue-400 border-r-2 border-blue-400'
                                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                                    }`
                                }
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                {sidebarOpen && label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="border-t border-gray-700">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-400 hover:bg-gray-800 hover:text-red-400 transition-colors"
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            {sidebarOpen && 'Sign Out'}
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 min-w-0 p-6 overflow-auto animate-fade-in">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default AdminLayout
