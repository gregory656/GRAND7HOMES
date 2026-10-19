/**
 * App.jsx - Main application component
 * Sets up React Router with BrowserRouter, React Query, and all Context providers.
 * Defines all application routes.
 * This uses React Router for navigation and React Query for data fetching.
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Context providers - React Context API
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { BookingProvider } from './contexts/BookingContext'

// Loading component
import { PageLoader } from './components/ui/Spinner'

// ── Public Pages ─────────────────────────────────────────────────────────────
import Home from './pages/public/Home'
import Hostels from './pages/public/Hostels'
import HostelDetail from './pages/public/HostelDetail'
import Booking from './pages/public/Booking'
import Checkout from './pages/public/Checkout'

// ── Auth Pages ────────────────────────────────────────────────────────────────
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import ForgotPassword from './pages/auth/ForgotPassword'

// ── User Dashboard Pages ──────────────────────────────────────────────────────
import UserDashboard from './pages/user/Dashboard'
import UserBookings from './pages/user/Bookings'
import BookingDetail from './pages/user/BookingDetail'
import UserProfile from './pages/user/Profile'
import UserWishlist from './pages/user/Wishlist'
import UserReviews from './pages/user/Reviews'
import UserSettings from './pages/user/Settings'

// ── Admin Pages ───────────────────────────────────────────────────────────────
import AdminDashboard from './pages/admin/Dashboard'
import AdminHostels from './pages/admin/Hostels'
import AdminBookings from './pages/admin/Bookings'

// Configure React Query client for data fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})

/**
 * ProtectedRoute - Guards routes that require authentication.
 * Redirects unauthenticated users to /login with a redirect param.
 * @param {boolean} requireAdmin - If true, also checks for admin role.
 */
function ProtectedRoute({ children, requireAdmin = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  if (loading) return <PageLoader />

  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${window.location.pathname}`} replace />
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/user/dashboard" replace />
  }

  return children
}

/**
 * AppRoutes - Contains all route definitions.
 * Separated from App to allow access to AuthContext inside BrowserRouter.
 */
function AppRoutes() {
  return (
    <Routes>
      {/* ── Public Routes ─────────────────────────────────── */}
      <Route path="/" element={<Home />} />
      <Route path="/hostels" element={<Hostels />} />
      <Route path="/hostels/:id" element={<HostelDetail />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/checkout" element={<Checkout />} />

      {/* ── Auth Routes ───────────────────────────────────── */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ── User Dashboard Routes (Protected) ─────────────── */}
      <Route path="/user/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/user/bookings" element={<ProtectedRoute><UserBookings /></ProtectedRoute>} />
      <Route path="/user/bookings/:id" element={<ProtectedRoute><BookingDetail /></ProtectedRoute>} />
      <Route path="/user/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
      <Route path="/user/wishlist" element={<ProtectedRoute><UserWishlist /></ProtectedRoute>} />
      <Route path="/user/reviews" element={<ProtectedRoute><UserReviews /></ProtectedRoute>} />
      <Route path="/user/settings" element={<ProtectedRoute><UserSettings /></ProtectedRoute>} />

      {/* ── Admin Routes (Protected + Admin Only) ────────── */}
      <Route path="/admin/dashboard" element={<ProtectedRoute requireAdmin><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/hostels" element={<ProtectedRoute requireAdmin><AdminHostels /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute requireAdmin><AdminBookings /></ProtectedRoute>} />

      {/* ── Fallback: redirect unknown paths to home ──────── */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

/**
 * App - Root application component.
 * Wraps everything with providers in the correct order:
 *   QueryClientProvider → ThemeProvider → AuthProvider → BookingProvider → Router
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>
          <AuthProvider>
            <BookingProvider>
              <AppRoutes />
            </BookingProvider>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
