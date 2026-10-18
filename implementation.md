# HOSTEL BOOKING E-COMMERCE PLATFORM - IMPLEMENTATION PROMPT FOR AI

You are an expert frontend developer. Your task is to build a complete, functional e-commerce website for a hostel booking platform. This is a hostel booking system that operates like an e-commerce site where users can browse hostels, view rooms, check availability, make reservations, and manage bookings.

## PROJECT OVERVIEW
Build a modern, responsive hostel booking e-commerce platform with user authentication, product (hostel/room) browsing, shopping cart (booking cart), checkout process (booking flow), and user dashboard. Focus on clean, well-structured code with proper comments explaining what each part does.

## TECH STACK TO USE
- React 18+ with Vite
- JavaScript (not TypeScript)
- Tailwind CSS (install via npm)
- shadcn/ui components (Radix UI primitives)
- Lucide React for icons
- React Context API for state management
- React Query (TanStack Query) for data fetching
- React Router v6+ for routing
- React Hook Form + Zod for form validation
- date-fns for date handling
- Recharts for admin analytics

## PROJECT STRUCTURE TO CREATE

Create the following folder structure:

```
src/
├── assets/                 # Images, fonts, static assets
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components (Button, Card, Input, etc.)
│   ├── layout/           # Layout components (Navbar, Footer, Sidebar)
│   ├── hostel/           # Hostel-related components
│   ├── booking/          # Booking cart components
│   └── common/           # Common shared components
├── pages/                # Page components
│   ├── public/           # Public pages (Home, Hostels, About)
│   ├── auth/             # Authentication pages (Login, Signup)
│   ├── user/             # User dashboard pages
│   └── admin/            # Admin dashboard pages
├── hooks/                # Custom React hooks
├── contexts/             # React Context providers
├── lib/                  # Utility functions and configurations
├── services/             # API service layer (REST API calls)
├── constants/            # Constants and enums
├── styles/               # Global styles
└── App.jsx               # Main app component
```

## PHASE 1: PROJECT SETUP

1. Initialize a new Vite React project
2. Install Tailwind CSS via npm and configure it
3. Set up shadcn/ui components
4. Install all required dependencies:
   - react-router-dom
   - @tanstack/react-query
   - react-hook-form
   - zod
   - @hookform/resolvers
   - lucide-react
   - date-fns
   - recharts
   - axios
   - clsx
   - tailwind-merge

## PHASE 2: CORE CONFIGURATION FILES

Create these configuration files with clean code and comments:

### tailwind.config.js
- Configure Tailwind with custom color palette using CSS variables
- Set up primary, secondary, accent, destructive, muted colors
- Configure border radius values

### src/index.css
- Add Tailwind directives
- Define CSS variables for light and dark themes
- Set up base styles

### src/lib/utils.js
- Create a utility function for merging Tailwind classes using clsx and tailwind-merge
- Add comments explaining this is for className merging

### src/lib/api.js
- Set up Axios instance with base configuration
- Add request interceptor to attach JWT token from localStorage
- Add response interceptor for error handling (401 redirect to login)
- Comment: This is a REST API client setup

### .env.example
- Create template for environment variables
- Include placeholders for API URL, Stripe keys, PayPal keys, Cloudinary keys
- Comment: These will be added later when API keys are available

## PHASE 3: CONTEXT API PROVIDERS

Create React Context providers for global state management:

### src/contexts/AuthContext.jsx
- Create AuthContext using React Context API
- Implement user authentication state (user, loading)
- Add login, logout, register functions
- Use useEffect to check for existing token on mount
- Make REST API calls to /auth/login, /auth/register, /auth/me
- Comment: This is a React Context API for authentication

### src/contexts/BookingContext.jsx
- Create BookingContext (similar to CartContext but for bookings)
- Manage booking items (hostels, rooms, dates, guests)
- Implement addToBooking, removeFromBooking, updateDates, clearBooking
- Calculate booking total
- Persist to localStorage
- Comment: This is a React Context API for booking management

### src/contexts/ThemeContext.jsx
- Create ThemeContext for dark/light mode
- Implement toggleTheme function
- Persist theme preference to localStorage
- Comment: This is a React Context API for theme management

## PHASE 4: API SERVICE LAYER

Create service files for REST API calls:

### src/services/hostelService.js
- Create functions for hostel-related API calls
- getHostels(params) - GET /api/hostels with filters
- getHostelById(id) - GET /api/hostels/:id
- getHostelsByLocation(location) - GET /api/hostels?location=location
- searchHostels(query) - GET /api/hostels/search
- getCategories() - GET /api/categories
- Comment: This file contains REST API calls for hostel operations

### src/services/bookingService.js
- Create functions for booking-related API calls
- createBooking(bookingData) - POST /api/bookings
- getUserBookings() - GET /api/bookings/user
- getBookingById(id) - GET /api/bookings/:id
- cancelBooking(id) - PATCH /api/bookings/:id/cancel
- Comment: This file contains REST API calls for booking operations

### src/services/paymentService.js
- Create functions for payment operations (planned)
- createPaymentIntent(amount, currency) - POST /api/payments/create-intent
- confirmPayment(paymentIntentId, paymentMethodId) - POST /api/payments/confirm
- processPayPalPayment(orderId) - POST /api/payments/paypal
- Comment: STRIPE API KEYS TO BE ADDED HERE when available

## PHASE 5: REUSABLE UI COMPONENTS (shadcn/ui)

Create these UI components using shadcn/ui patterns:

### src/components/ui/Button.jsx
- Create reusable Button component with variants (default, destructive, outline, secondary, ghost, link)
- Use class-variance-authority for variant management
- Add sizes (default, sm, lg, icon)
- Comment: This is a shadcn/ui component built with Radix UI primitives

### src/components/ui/Card.jsx
- Create Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter components
- Comment: This is a shadcn/ui component built with Radix UI primitives

### src/components/ui/Input.jsx
- Create reusable Input component
- Comment: This is a shadcn/ui component built with Radix UI primitives

### src/components/ui/Select.jsx
- Create Select component for dropdowns
- Comment: This is a shadcn/ui component built with Radix UI primitives

### src/components/ui/DatePicker.jsx
- Create DatePicker component for date selection
- Comment: This is a shadcn/ui component built with Radix UI primitives

## PHASE 6: LAYOUT COMPONENTS

### src/components/layout/Navbar.jsx
- Create main navigation bar with logo
- Add search bar for hostels
- Include navigation links (Home, Hostels, About, Contact)
- Add user authentication buttons (Login/Signup or User profile)
- Include booking cart icon with item count
- Add theme toggle button
- Import Lucide React icons (Search, ShoppingCart, User, Menu, Heart, Moon, Sun)
- Comment: Lucide React icons are imported here

### src/components/layout/Footer.jsx
- Create footer with company info
- Add quick links section
- Include customer service links
- Add contact information
- Add social media icons using Lucide React
- Comment: Lucide React icons are imported here

## PHASE 7: HOSTEL COMPONENTS

### src/components/hostel/HostelCard.jsx
- Create hostel card component displaying:
  - Hostel image with gallery preview
  - Hostel name and location
  - Rating with stars
  - Price per night
  - Key amenities (first 4)
  - "View Details" button
  - "Book Now" button
- Import Lucide React icons (Star, Heart, MapPin)
- Comment: Lucide React icons are imported here

### src/components/hostel/HostelGrid.jsx
- Create grid component to display multiple hostel cards
- Add loading skeleton state
- Add empty state when no hostels found
- Comment: This component uses React Query for data fetching

## PHASE 8: BOOKING COMPONENTS

### src/components/booking/BookingItem.jsx
- Create booking item component showing:
  - Hostel image and name
  - Check-in and check-out dates
  - Room type and guest count
  - Price per night
  - Quantity controls
  - Remove button
- Import Lucide React icons (Calendar, Users, Trash2, Minus, Plus)
- Comment: Lucide React icons are imported here

### src/components/booking/BookingSummary.jsx
- Create booking summary component showing:
  - List of all booking items
  - Subtotal calculation
  - Taxes and fees
  - Total amount
  - "Proceed to Checkout" button

## PHASE 9: PUBLIC PAGES

### src/pages/public/Home.jsx
- Create landing page with:
  - Hero section with search form (location, dates, guests)
  - Featured hostels section
  - Popular destinations section
  - How it works section
  - Testimonials section
  - Call-to-action section
- Use React Query to fetch featured hostels
- Import Lucide React icons (Search, Calendar, Users, MapPin, Star, Check, ArrowRight)
- Comment: React Query is used for data fetching

### src/pages/public/Hostels.jsx
- Create hostels listing page with:
  - Search filters sidebar (location, price range, rating, amenities, room type)
  - Sort options dropdown
  - Hostel grid display
  - Pagination
- Use React Query to fetch hostels with filters
- Import Lucide React icons (SlidersHorizontal, Filter)
- Comment: React Query is used for data fetching

### src/pages/public/HostelDetail.jsx
- Create single hostel detail page with:
  - Image gallery with lightbox
  - Hostel information (description, policies, facilities)
  - Amenities list with icons
  - Room types available
  - Reviews section
  - Location section with map
  - Booking sidebar (sticky) with date picker, guest selector, room type selector
- Use React Query to fetch hostel data
- Import Lucide React icons (Star, MapPin, Calendar, Users, Heart, Share2, Wifi, Parking, Coffee)
- Comment: React Query is used for data fetching

### src/pages/public/Booking.jsx
- Create booking cart page showing:
  - List of all booking items
  - Booking summary with totals
  - "Proceed to Checkout" button
  - Empty state when no bookings
- Use BookingContext
- Comment: This uses React Context API for booking state

## PHASE 10: AUTHENTICATION PAGES

### src/pages/auth/Login.jsx
- Create login page with:
  - Email and password inputs
  - Remember me checkbox
  - Forgot password link
  - Login button
  - Link to signup page
- Use React Hook Form with Zod validation
- Create Zod schema for email and password validation
- Comment: This uses Zod for form validation and React Hook Form

### src/pages/auth/Signup.jsx
- Create signup page with:
  - Name, email, password, confirm password inputs
  - Terms and conditions checkbox
  - Signup button
  - Link to login page
- Use React Hook Form with Zod validation
- Create Zod schema for all fields with password match validation
- Comment: This uses Zod for form validation and React Hook Form

### src/pages/auth/ForgotPassword.jsx
- Create forgot password page with email input
- Comment: This uses Zod for form validation

## PHASE 11: CHECKOUT PAGE

### src/pages/public/Checkout.jsx
- Create checkout page with:
  - Guest information form (name, email, phone)
  - Guest details (number of guests, names)
  - Special requests textarea
  - Payment method selector (Card, PayPal)
  - Card details form (card number, expiry, CVV)
  - Billing address form
  - Booking summary sidebar
  - "Complete Booking" button
- Use React Hook Form with Zod validation
- Create comprehensive Zod schema for all fields
- Comment: This uses Zod for form validation, React Hook Form, and will integrate Stripe API when keys are available

## PHASE 12: USER DASHBOARD PAGES

### src/pages/user/Dashboard.jsx
- Create user dashboard home with:
  - Welcome banner
  - Stats cards (total bookings, upcoming trips, total spent, loyalty points)
  - Upcoming bookings list
  - Recent activity list
- Use AuthContext
- Import Lucide React icons (Package, Calendar, DollarSign, Award, Clock)
- Comment: This uses React Context API for authentication

### src/pages/user/Bookings.jsx
- Create my bookings page with:
  - Tabs (All, Upcoming, Completed, Cancelled)
  - Booking list with status badges
  - View, cancel, modify buttons
- Use React Query to fetch user bookings
- Comment: React Query is used for data fetching

### src/pages/user/BookingDetail.jsx
- Create booking detail page with:
  - Booking summary card
  - Hostel information card
  - Guest details card
  - Payment summary card
  - Timeline card showing booking status
  - Action buttons (modify, cancel, download receipt)
- Use React Query to fetch booking by ID
- Comment: React Query is used for data fetching

### src/pages/user/Profile.jsx
- Create user profile page with:
  - Profile form (personal info, address, preferences)
  - Change password section
- Use React Hook Form with Zod validation
- Comment: This uses Zod for form validation and React Hook Form

### src/pages/user/Wishlist.jsx
- Create wishlist page showing saved hostels
- Use React Query to fetch wishlist
- Comment: React Query is used for data fetching

## PHASE 13: ADMIN DASHBOARD (Planned for later)

### src/pages/admin/Dashboard.jsx
- Create admin dashboard with:
  - Stats cards (total revenue, bookings, hostels, users, occupancy rate, average rating)
  - Revenue chart using Recharts
  - Bookings chart using Recharts
  - Recent bookings table
  - Top hostels table
- Import Recharts components (LineChart, BarChart, PieChart)
- Comment: This uses Recharts for analytics visualization

### src/pages/admin/Hostels.jsx
- Create manage hostels page with:
  - Hostels table with actions
  - Add hostel button
  - Edit hostel modal
  - Delete hostel confirmation

### src/pages/admin/Bookings.jsx
- Create manage bookings page with:
  - Bookings table with filters
  - View booking details modal
  - Export to CSV button

## PHASE 14: ROUTING CONFIGURATION

### src/App.jsx
- Set up React Router with BrowserRouter
- Configure QueryClient for React Query
- Wrap app with ThemeProvider, AuthProvider, BookingProvider
- Define all routes:
  - Public: /, /hostels, /hostels/:id, /booking, /checkout
  - Auth: /login, /signup, /forgot-password
  - User: /user/dashboard, /user/bookings, /user/bookings/:id, /user/profile, /user/wishlist
  - Admin: /admin/dashboard, /admin/hostels, /admin/bookings
- Create ProtectedRoute component for authenticated routes
- Comment: This uses React Router for navigation and React Query for data fetching

## PHASE 15: BACKEND API PLAN (Document only, don't implement)

Document the planned REST API endpoints:

### Authentication Endpoints
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- GET /api/auth/me

### Hostels Endpoints
- GET /api/hostels (with filters)
- GET /api/hostels/:id
- POST /api/hostels (admin)
- PUT /api/hostels/:id (admin)
- DELETE /api/hostels/:id (admin)

### Bookings Endpoints
- POST /api/bookings
- GET /api/bookings/user
- GET /api/bookings/:id
- PATCH /api/bookings/:id/cancel

### Payments Endpoints
- POST /api/payments/create-intent (Stripe)
- POST /api/payments/confirm
- POST /api/payments/paypal

### Reviews Endpoints
- GET /api/reviews
- POST /api/reviews
- PATCH /api/reviews/:id/approve (admin)

### Database Schema (Document)
- Users table
- Hostels table
- RoomTypes table
- Bookings table
- Reviews table
- Wishlist table

### Environment Variables (Document)
- VITE_API_URL
- VITE_STRIPE_PUBLIC_KEY
- VITE_PAYPAL_CLIENT_ID
- VITE_CLOUDINARY_CLOUD_NAME
- DATABASE_URL
- JWT_SECRET
- STRIPE_SECRET_KEY
- PAYPAL_CLIENT_SECRET

## CODING REQUIREMENTS

1. Write clean, readable code with proper indentation
2. Add comments explaining:
   - What each file does
   - What each function does
   - When using external libraries (e.g., "This is a REST API call", "This uses Zod validation", "Lucide React icons are imported here", "This is a React Context API", "React Query is used for data fetching")
3. Use functional components with hooks
4. Follow React best practices
5. Use Tailwind CSS for all styling
6. Make the design responsive (mobile-first)
7. Handle loading and error states properly
8. Use proper TypeScript-like JSDoc comments for function parameters
9. Keep components small and focused
10. Use meaningful variable and function names

## IMPORTANT NOTES

- Focus on frontend implementation only
- Backend API endpoints are planned but not implemented
- Payment integrations (Stripe, PayPal) are prepared but will work when API keys are added
- All API calls should use the service layer
- Use React Query for all data fetching
- Use React Context API for global state
- Use Zod for all form validation
- Use Lucide React for all icons
- Use shadcn/ui patterns for UI components
- The code should be production-ready and well-documented

## DELIVERABLES

Create all the files listed above with clean, commented code. Each file should have:
1. A comment at the top explaining what the file does
2. Comments for each major function/component
3. Comments when using specific libraries or patterns
4. Proper error handling
5. Loading states where appropriate

The resulting application should be a fully functional frontend that can connect to a backend API when available.
