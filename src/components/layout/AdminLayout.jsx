/**
 * AdminLayout.jsx - Layout wrapper for admin dashboard pages
 * Light sidebar navigation with stats and admin menu.
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
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <div className="flex flex-1">

                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'w-64' : 'w-16'} shrink-0 border-r border-gray-200 bg-white transition-all duration-300 hidden md:flex flex-col`}>
                    {/* Toggle button */}
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="flex items-center justify-center h-12 w-full border-b border-gray-200 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>

                    {/* Admin info */}
                    {sidebarOpen && (
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-sm font-bold text-gray-700 shrink-0">
                                    {user?.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">{user?.name}</p>
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
                                        ? 'bg-gray-100 text-gray-900 border-r-2 border-gray-400'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                <Icon className="h-5 w-5 shrink-0" />
                                {sidebarOpen && label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Logout */}
                    <div className="border-t border-gray-200">
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 hover:text-red-500 transition-colors"
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
