# HOSTEL BOOKING SYSTEM - COMPREHENSIVE GUIDE

## PROJECT OVERVIEW
A modern, responsive hostel booking platform allowing users to browse hostels, view rooms, check availability, make reservations, and manage bookings. The system includes user authentication, admin dashboard, payment integration, and real-time availability management.

---

## TECH STACK

### Frontend
- **Framework**: React 18+ with Vite
- **Language**: JavaScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React Context API + React Query (TanStack Query)
- **Routing**: React Router v6+
- **Forms**: React Hook Form + Zod validation
- **Date Handling**: date-fns
- **Charts**: Recharts (for admin analytics)

### Backend (Future)
- **API**: REST/GraphQL
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT
- **Payment**: Stripe/PayPal integration/Daraja Api

---

## PROJECT STRUCTURE

```
src/
├── assets/                 # Images, fonts, static assets
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Layout components
│   ├── forms/            # Form components
│   ├── cards/            # Card components
│   └── common/           # Common shared components
├── pages/                # Page components
│   ├── public/           # Public pages
│   ├── auth/             # Authentication pages
│   ├── user/             # User dashboard pages
│   └── admin/            # Admin dashboard pages
├── hooks/                # Custom React hooks
├── contexts/             # React Context providers
├── lib/                  # Utility functions
├── services/             # API services
├── types/                # TypeScript type definitions
├── constants/            # Constants and enums
├── styles/               # Global styles
└── App.tsx               # Main app component
```

---

## THEME & STYLING

### Color Palette
```typescript
// Primary Colors
primary: {
  50: '#eff6ff',
  100: '#dbeafe',
  200: '#bfdbfe',
  300: '#93c5fd',
  400: '#60a5fa',
  500: '#3b82f6',  // Main primary
  600: '#2563eb',
  700: '#1d4ed8',
  800: '#1e40af',
  900: '#1e3a8a',
}

// Secondary/Accent
accent: {
  50: '#fdf4ff',
  100: '#fae8ff',
  200: '#f5d0fe',
  300: '#f0abfc',
  400: '#e879f9',
  500: '#d946ef',  // Main accent
  600: '#c026d3',
  700: '#a21caf',
  800: '#86198f',
  900: '#701a75',
}

// Neutral/Background
neutral: {
  50: '#fafafa',
  100: '#f5f5f5',
  200: '#e5e5e5',
  300: '#d4d4d4',
  400: '#a3a3a3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',
}

// Semantic Colors
success: '#22c55e'
warning: '#f59e0b'
error: '#ef4444'
info: '#3b82f6'
```

### Typography
```typescript
// Font Families
fontSans: 'Inter, system-ui, sans-serif'
fontHeading: 'Inter, system-ui, sans-serif'
fontMono: 'JetBrains Mono, monospace'

// Font Sizes
text-xs: '0.75rem'    // 12px
text-sm: '0.875rem'   // 14px
text-base: '1rem'     // 16px
text-lg: '1.125rem'   // 18px
text-xl: '1.25rem'    // 20px
text-2xl: '1.5rem'    // 24px
text-3xl: '1.875rem'  // 30px
text-4xl: '2.25rem'   // 36px
```

### Spacing Scale
```typescript
spacing: {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
}
```

### Border Radius
```typescript
radius: {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
}
```

### Shadows
```typescript
shadows: {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
}
```

---

## SCREENS & PAGES

### 1. LANDING PAGE (/)
**Purpose**: Main landing page showcasing hostels and key features

**Components**:
- `Navbar` - Navigation with logo, menu, auth buttons
- `HeroSection` - Hero banner with search form
- `SearchForm` - Location, dates, guests search
- `FeaturedHostels` - Carousel of top-rated hostels
- `PopularDestinations` - Grid of popular locations
- `HowItWorks` - Step-by-step process explanation
- `Testimonials` - User reviews carousel
- `CTASection` - Call-to-action banner
- `Footer` - Links, social media, newsletter

**Pseudocode Flow**:
```
LOAD Landing Page
  → Render Navbar with user auth state
  → Render Hero with background image
  → Render SearchForm (location, check-in, check-out, guests)
  → Fetch and display FeaturedHostels (top 6)
  → Fetch and display PopularDestinations
  → Render HowItWorks (3 steps)
  → Render Testimonials (scrolling carousel)
  → Render CTASection
  → Render Footer
```

---

### 2. HOSTEL LISTING PAGE (/hostels)
**Purpose**: Search results page with filters and hostel cards

**Components**:
- `Navbar`
- `SearchFilters` - Sidebar with filters
  - LocationFilter
  - PriceRangeFilter
  - RatingFilter
  - AmenityFilter (WiFi, AC, Kitchen, etc.)
  - RoomTypeFilter (Dorm, Private, Suite)
  - GuestRatingFilter
- `HostelGrid` - Grid of hostel cards
- `HostelCard` - Individual hostel card
  - HostelImage (gallery)
  - HostelInfo (name, location, rating)
  - HostelPrice (per night)
  - HostelAmenities (icons)
  - QuickViewButton
  - BookNowButton
- `Pagination`
- `MapToggle` - Toggle map/list view
- `SortOptions` - Sort by price, rating, popularity
- `Footer`

**Pseudocode Flow**:
```
LOAD Hostel Listing
  → Parse URL search params (location, dates, guests)
  → Fetch hostels based on filters
  → Render SearchFilters sidebar
  → Render SortOptions dropdown
  → Render HostelGrid with filtered results
  → Each HostelCard displays:
    - Main image with gallery preview
    - Hostel name and location
    - Rating (stars + number of reviews)
    - Price per night
    - Key amenities (first 4)
    - "View Details" button
    - "Book Now" button
  → Render Pagination
  → Render Footer
```

---

### 3. HOSTEL DETAIL PAGE (/hostels/:id)
**Purpose**: Detailed view of a single hostel with booking

**Components**:
- `Navbar`
- `HostelHeader` - Breadcrumbs, hostel name, location
- `HostelGallery` - Image gallery with lightbox
- `HostelInfo` - Description, facilities, policies
- `HostelAmenities` - Full amenities list with icons
- `RoomTypes` - Available room types
  - `RoomTypeCard` - Individual room type
    - Room images
    - Room description
    - Capacity
    - Price per night
    - Available beds
    - SelectButton
- `ReviewsSection` - Reviews summary and list
  - `ReviewCard` - Individual review
  - `ReviewSummary` - Rating breakdown
  - `WriteReviewButton`
- `LocationSection` - Map, nearby attractions
- `BookingSidebar` - Sticky booking form
  - Date picker (check-in, check-out)
  - Guest selector
  - Room type selector
  - Price breakdown
  - "Reserve Now" button
- `SimilarHostels` - Related hostels
- `Footer`

**Pseudocode Flow**:
```
LOAD Hostel Detail
  → Fetch hostel data by ID
  → Fetch room types and availability
  → Fetch reviews
  → Render HostelHeader (breadcrumbs, name, location)
  → Render HostelGallery (main image + thumbnails + lightbox)
  → Render HostelInfo (description, check-in/out times, policies)
  → Render HostelAmenities (grid of amenity icons + labels)
  → Render RoomTypes (list of available rooms)
    - Each RoomTypeCard shows:
      - Room images
      - Room type name
      - Capacity (x guests)
      - Price per night
      - Number of beds available
      - "Select" button
  → Render ReviewsSection
    - Overall rating display
    - Rating breakdown chart
    - List of ReviewCard components
  → Render LocationSection (Google Maps embed)
  → Render BookingSidebar (sticky right panel)
    - DateRangePicker
    - GuestCounter
    - RoomTypeDropdown
    - Price calculation
    - "Reserve Now" button (opens booking modal)
  → Render SimilarHostels
  → Render Footer
```

---

### 4. BOOKING FLOW

### 4a. BOOKING MODAL (Modal)
**Purpose**: Multi-step booking process

**Components**:
- `BookingModal` - Modal container
- `StepIndicator` - Progress steps (1. Guest Info → 2. Payment → 3. Confirmation)
- `GuestInfoForm` - Step 1
  - PersonalDetails (name, email, phone)
  - GuestDetails (number of guests, names)
  - SpecialRequests (textarea)
  - "Continue to Payment" button
- `PaymentForm` - Step 2
  - PaymentMethodSelector (Card, PayPal, Bank Transfer)
  - CardDetailsForm (card number, expiry, CVV)
  - BillingAddress
  - PriceSummary
  - "Complete Booking" button
- `ConfirmationView` - Step 3
  - Success animation
  - BookingReference
  - BookingSummary
  - "View My Bookings" button
  - "Book Another" button

**Pseudocode Flow**:
```
OPEN Booking Modal
  → Initialize booking state (hostel, room, dates, guests)
  → Render StepIndicator (current step highlighted)
  → STEP 1: GuestInfoForm
    - Render PersonalDetails inputs
    - Render GuestDetails inputs
    - Render SpecialRequests textarea
    - Validate form
    - On submit: move to Step 2
  → STEP 2: PaymentForm
    - Render PaymentMethodSelector
    - If Card: render CardDetailsForm
    - Render BillingAddress
    - Render PriceSummary (subtotal, taxes, fees, total)
    - Validate payment
    - On submit: process payment → move to Step 3
  → STEP 3: ConfirmationView
    - Show success animation
    - Display booking reference number
    - Display booking summary
    - Send confirmation email
    - On "View My Bookings": redirect to /user/bookings
    - On "Book Another": close modal
```

---

### 5. AUTHENTICATION PAGES

### 5a. LOGIN PAGE (/login)
**Components**:
- `AuthLayout` - Centered card layout
- `LoginForm`
  - EmailInput
  - PasswordInput
  - RememberMeCheckbox
  - ForgotPasswordLink
  - SubmitButton
- `SocialLoginButtons` - Google, Facebook, Apple
- `Divider` - "Or continue with"
- `SignupLink` - "Don't have an account? Sign up"

**Pseudocode Flow**:
```
LOAD Login Page
  → Render AuthLayout with branding
  → Render LoginForm
    - Email input with validation
    - Password input with show/hide toggle
    - Remember me checkbox
    - "Forgot password?" link
    - "Login" button
  → Render SocialLoginButtons (Google, Facebook, Apple)
  → Render Divider
  → Render SignupLink
  → On form submit:
    - Validate inputs
    - Call login API
    - On success: redirect to dashboard or previous page
    - On error: show error message
```

---

### 5b. SIGNUP PAGE (/signup)
**Components**:
- `AuthLayout`
- `SignupForm`
  - NameInput
  - EmailInput
  - PasswordInput
  - ConfirmPasswordInput
  - TermsCheckbox
  - SubmitButton
- `SocialLoginButtons`
- `LoginLink` - "Already have an account? Login"

**Pseudocode Flow**:
```
LOAD Signup Page
  → Render AuthLayout with branding
  → Render SignupForm
    - Full name input
    - Email input
    - Password input with strength indicator
    - Confirm password input
    - Terms & conditions checkbox
    - "Sign Up" button
  → Render SocialLoginButtons
  → Render LoginLink
  → On form submit:
    - Validate all inputs
    - Check password match
    - Call signup API
    - On success: send verification email
    - Redirect to email verification page
```

---

### 5c. FORGOT PASSWORD PAGE (/forgot-password)
**Components**:
- `AuthLayout`
- `ForgotPasswordForm`
  - EmailInput
  - SubmitButton
- `BackToLoginLink`

**Pseudocode Flow**:
```
LOAD Forgot Password
  → Render AuthLayout
  → Render ForgotPasswordForm
    - Email input
    - "Send Reset Link" button
  → On submit:
    - Validate email
    - Call forgot password API
    - Show success message
    - Send reset email
```

---

### 5d. RESET PASSWORD PAGE (/reset-password/:token)
**Components**:
- `AuthLayout`
- `ResetPasswordForm`
  - NewPasswordInput
  - ConfirmPasswordInput
  - SubmitButton
- `BackToLoginLink`

**Pseudocode Flow**:
```
LOAD Reset Password
  → Validate token from URL
  → Render AuthLayout
  → Render ResetPasswordForm
    - New password input
    - Confirm password input
    - "Reset Password" button
  → On submit:
    - Validate passwords match
    - Call reset password API with token
    - On success: redirect to login
```

---

### 6. USER DASHBOARD

### 6a. USER DASHBOARD HOME (/user/dashboard)
**Components**:
- `UserLayout` - Sidebar navigation + main content
- `UserSidebar` - Navigation menu
  - DashboardLink
  - MyBookingsLink
  - MyProfileLink
  - MyReviewsLink
  - MyWishlistLink
  - SettingsLink
  - LogoutButton
- `DashboardOverview`
  - WelcomeBanner
  - StatsCards
    - TotalBookingsCard
    - UpcomingTripsCard
    - TotalSpentCard
    - LoyaltyPointsCard
  - UpcomingBookingsList
  - RecentActivityList

**Pseudocode Flow**:
```
LOAD User Dashboard
  → Check authentication
  → Fetch user data
  → Render UserLayout with sidebar
  → Render DashboardOverview
    - Welcome banner with user name
    - StatsCards grid:
      - Total bookings count
      - Upcoming trips count
      - Total spent amount
      - Loyalty points
    - UpcomingBookingsList (next 3 bookings)
      - Each booking shows hostel, dates, status
    - RecentActivityList (recent actions)
```

---

### 6b. MY BOOKINGS PAGE (/user/bookings)
**Components**:
- `UserLayout`
- `BookingsHeader` - Title, search, filter
- `BookingsTabs` - All, Upcoming, Completed, Cancelled
- `BookingsList`
- `BookingCard` - Individual booking
  - HostelInfo (image, name, location)
  - BookingDetails (dates, room type, guests)
  - BookingStatus (confirmed, pending, cancelled)
  - PriceSummary
  - ActionButtons (View, Cancel, Modify)
- `BookingDetailModal` - Full booking details

**Pseudocode Flow**:
```
LOAD My Bookings
  → Fetch user bookings
  → Render UserLayout
  → Render BookingsHeader
  → Render BookingsTabs (default: All)
  → Render BookingsList filtered by tab
    - Each BookingCard displays:
      - Hostel image and name
      - Check-in/check-out dates
      - Room type and guests
      - Status badge (confirmed/pending/cancelled)
      - Total price
      - Action buttons (View, Cancel, Modify)
  → On tab change: filter bookings
  → On "View": open BookingDetailModal
  → On "Cancel": show confirmation modal
```

---

### 6c. BOOKING DETAIL PAGE (/user/bookings/:id)
**Components**:
- `UserLayout`
- `BookingDetailHeader` - Breadcrumbs, status
- `BookingSummaryCard` - Key booking info
- `HostelInfoCard` - Hostel details
- `GuestDetailsCard` - Guest information
- `PaymentSummaryCard` - Payment breakdown
- `TimelineCard` - Booking status timeline
- `ActionButtons`
  - ModifyBookingButton
  - CancelBookingButton
  - DownloadReceiptButton
  - ContactHostelButton

**Pseudocode Flow**:
```
LOAD Booking Detail
  → Fetch booking by ID
  → Render UserLayout
  → Render BookingDetailHeader
  → Render BookingSummaryCard
    - Booking reference
    - Status badge
    - Check-in/check-out
    - Room type
    - Guests
  → Render HostelInfoCard
    - Hostel image
    - Hostel name
    - Address
    - Contact info
  → Render GuestDetailsCard
    - Primary guest name
    - Email
    - Phone
    - Special requests
  → Render PaymentSummaryCard
    - Room charges
    - Taxes
    - Fees
    - Total paid
  → Render TimelineCard
    - Booking created
    - Payment confirmed
    - Check-in (future)
    - Check-out (future)
  → Render ActionButtons based on status
```

---

### 6d. USER PROFILE PAGE (/user/profile)
**Components**:
- `UserLayout`
- `ProfileHeader` - Avatar, name, edit button
- `ProfileForm`
  - PersonalInfoSection
    - NameInput
    - EmailInput (read-only)
    - PhoneInput
    - DateOfBirthInput
    - NationalitySelect
  - AddressSection
    - StreetInput
    - CityInput
    - StateInput
    - CountrySelect
    - ZipCodeInput
  - PreferencesSection
    - LanguageSelect
    - CurrencySelect
    - NotificationPreferences (checkboxes)
  - SaveButton
- `ChangePasswordSection`
  - CurrentPasswordInput
  - NewPasswordInput
  - ConfirmPasswordInput
  - UpdateButton

**Pseudocode Flow**:
```
LOAD User Profile
  → Fetch user profile data
  → Render UserLayout
  → Render ProfileHeader (avatar + name)
  → Render ProfileForm
    - PersonalInfoSection (editable fields)
    - AddressSection (editable fields)
    - PreferencesSection (language, currency, notifications)
    - Save button
  → Render ChangePasswordSection
  → On form submit:
    - Validate all fields
    - Call update profile API
    - Show success message
```

---

### 6e. MY REVIEWS PAGE (/user/reviews)
**Components**:
- `UserLayout`
- `ReviewsHeader` - Title, stats
- `ReviewsTabs` - All, Pending, Published
- `ReviewsList`
- `ReviewCard` - Individual review
  - HostelInfo
  - RatingDisplay (stars)
  - ReviewText
  - ReviewDate
  - StatusBadge
  - EditButton
  - DeleteButton
- `WriteReviewModal` - Write/edit review form

**Pseudocode Flow**:
```
LOAD My Reviews
  → Fetch user reviews
  → Render UserLayout
  → Render ReviewsHeader (total reviews, average rating)
  → Render ReviewsTabs
  → Render ReviewsList filtered by tab
    - Each ReviewCard displays:
      - Hostel name and image
      - Star rating
      - Review text
      - Date posted
      - Status (published/pending)
      - Edit/Delete buttons
  → On "Write Review": open WriteReviewModal
```

---

### 6f. MY WISHLIST PAGE (/user/wishlist)
**Components**:
- `UserLayout`
- `WishlistHeader` - Title, count
- `WishlistGrid`
- `WishlistCard` - Saved hostel
  - HostelImage
  - HostelInfo
  - RemoveButton
  - BookNowButton
- `EmptyWishlistState` - When no items

**Pseudocode Flow**:
```
LOAD My Wishlist
  → Fetch user wishlist
  → Render UserLayout
  → Render WishlistHeader
  → If wishlist empty:
    - Render EmptyWishlistState
  → Else:
    - Render WishlistGrid
      - Each WishlistCard shows:
        - Hostel image
        - Hostel name and location
        - Rating
        - Price per night
        - Remove button
        - "Book Now" button
```

---

### 6g. USER SETTINGS PAGE (/user/settings)
**Components**:
- `UserLayout`
- `SettingsHeader`
- `SettingsSections`
  - AccountSettings
    - EmailPreferences
    - PasswordSettings
    - TwoFactorAuth (toggle)
  - PrivacySettings
    - ProfileVisibility
    - DataSharing (toggles)
  - NotificationSettings
    - EmailNotifications (checkboxes)
    - SMSNotifications (checkboxes)
    - PushNotifications (checkboxes)
  - PaymentMethods
    - SavedCardsList
    - AddCardButton
  - DangerZone
    - DeleteAccountButton
    - DeactivateAccountButton

**Pseudocode Flow**:
```
LOAD User Settings
  → Fetch user settings
  → Render UserLayout
  → Render SettingsHeader
  → Render AccountSettings
    - Email preferences
    - Change password link
    - 2FA toggle
  → Render PrivacySettings
    - Profile visibility options
    - Data sharing toggles
  → Render NotificationSettings
    - Email notification checkboxes
    - SMS notification checkboxes
    - Push notification checkboxes
  → Render PaymentMethods
    - List of saved cards
    - Add new card button
  → Render DangerZone
    - Delete account button (with confirmation)
```

---

### 7. ADMIN DASHBOARD

### 7a. ADMIN DASHBOARD HOME (/admin/dashboard)
**Components**:
- `AdminLayout` - Sidebar navigation + main content
- `AdminSidebar` - Navigation menu
  - DashboardLink
  - HostelsLink
  - BookingsLink
  - UsersLink
  - ReviewsLink
  - AnalyticsLink
  - SettingsLink
  - LogoutButton
- `AdminOverview`
  - StatsCards
    - TotalRevenueCard
    - TotalBookingsCard
    - TotalHostelsCard
    - TotalUsersCard
    - OccupancyRateCard
    - AverageRatingCard
  - RevenueChart (Line chart - monthly)
  - BookingsChart (Bar chart - daily/weekly)
  - RecentBookingsTable
  - TopHostelsTable

**Pseudocode Flow**:
```
LOAD Admin Dashboard
  → Check admin authentication
  → Fetch dashboard stats
  → Render AdminLayout
  → Render AdminOverview
    - StatsCards grid (6 cards)
      - Total revenue (current month)
      - Total bookings (current month)
      - Total hostels
      - Total users
      - Occupancy rate (%)
      - Average rating
    - RevenueChart (line chart, last 6 months)
    - BookingsChart (bar chart, last 30 days)
    - RecentBookingsTable (last 10 bookings)
    - TopHostelsTable (top 5 by revenue)
```

---

### 7b. MANAGE HOSTELS (/admin/hostels)
**Components**:
- `AdminLayout`
- `HostelsHeader` - Title, search, "Add Hostel" button
- `HostelsTable`
  - HostelRow
    - HostelImage
    - HostelName
    - Location
    - Rating
    - Status (Active/Inactive)
    - Actions (Edit, Delete, View)
- `HostelFilters` - Status, location, rating
- `Pagination`
- `AddHostelModal` - Add new hostel form
- `EditHostelModal` - Edit hostel form

**Pseudocode Flow**:
```
LOAD Manage Hostels
  → Fetch all hostels
  → Render AdminLayout
  → Render HostelsHeader
  → Render HostelsFilters
  → Render HostelsTable
    - Each HostelRow shows:
      - Thumbnail image
      - Hostel name
      - Location
      - Rating
      - Status badge
      - Action buttons (Edit, Delete, View)
  → On "Add Hostel": open AddHostelModal
  → On "Edit": open EditHostelModal with hostel data
  → On "Delete": show confirmation modal
```

---

### 7c. ADD/EDIT HOSTEL FORM (Modal)
**Components**:
- `HostelFormModal`
- `FormSteps` - Multi-step form
  - Step 1: BasicInfo
    - NameInput
    - LocationInput (with autocomplete)
    - DescriptionTextarea
    - CategorySelect (Budget, Mid-range, Luxury)
  - Step 2: ContactInfo
    - PhoneInput
    - EmailInput
    - WebsiteInput
    - AddressTextarea
  - Step 3: Amenities
    - AmenityCheckboxes (WiFi, AC, Kitchen, etc.)
    - CustomAmenityInput
  - Step 4: Images
    - ImageUploader (drag & drop)
    - ImageGalleryPreview
    - SetMainImageButton
  - Step 5: Policies
    - CheckInTimeInput
    - CheckOutTimeInput
    - CancellationPolicySelect
    - HouseRulesTextarea
  - Step 6: RoomTypes
    - RoomTypeList
    - AddRoomTypeButton
- `FormNavigation` - Previous/Next/Submit buttons

**Pseudocode Flow**:
```
OPEN Add/Edit Hostel Modal
  → Initialize form state
  → Render FormSteps
  → STEP 1: BasicInfo
    - Name, location, description, category
    - "Next" button
  → STEP 2: ContactInfo
    - Phone, email, website, address
    - "Previous" and "Next" buttons
  → STEP 3: Amenities
    - Amenity checkboxes (20+ options)
    - Custom amenity input
    - "Previous" and "Next" buttons
  → STEP 4: Images
    - Image uploader (drag & drop)
    - Image gallery preview
    - Set main image
    - "Previous" and "Next" buttons
  → STEP 5: Policies
    - Check-in/out times
    - Cancellation policy
    - House rules
    - "Previous" and "Next" buttons
  → STEP 6: RoomTypes
    - List of room types
    - Add room type button
    - "Previous" and "Submit" buttons
  → On submit:
    - Validate all steps
    - Call create/update hostel API
    - Show success message
    - Close modal
```

---

### 7d. MANAGE ROOM TYPES (/admin/hostels/:id/rooms)
**Components**:
- `AdminLayout`
- `RoomsHeader` - Hostel name, "Add Room" button
- `RoomsTable`
  - RoomRow
    - RoomType
    - Capacity
    - PricePerNight
    - TotalBeds
    - AvailableBeds
    - Actions (Edit, Delete)
- `AddRoomModal` - Add room type form
- `EditRoomModal` - Edit room type form

**Pseudocode Flow**:
```
LOAD Manage Room Types
  → Fetch hostel room types
  → Render AdminLayout
  → Render RoomsHeader (hostel name)
  → Render RoomsTable
    - Each RoomRow shows:
      - Room type name
      - Capacity (x guests)
      - Price per night
      - Total beds
      - Available beds
      - Action buttons (Edit, Delete)
  → On "Add Room": open AddRoomModal
  → On "Edit": open EditRoomModal
```

---

### 7e. MANAGE BOOKINGS (/admin/bookings)
**Components**:
- `AdminLayout`
- `BookingsHeader` - Title, search, filters
- `BookingsFilters` - Date range, status, hostel
- `BookingsTable`
  - BookingRow
    - BookingReference
    - GuestName
    - HostelName
    - CheckInDate
    - CheckOutDate
    - TotalAmount
    - Status
    - Actions (View, Cancel, Modify)
- `BookingDetailModal` - Full booking details
- `ExportButton` - Export to CSV/Excel

**Pseudocode Flow**:
```
LOAD Manage Bookings
  → Fetch all bookings
  → Render AdminLayout
  → Render BookingsHeader
  → Render BookingsFilters
  → Render BookingsTable
    - Each BookingRow shows:
      - Booking reference
      - Guest name
      - Hostel name
      - Check-in/check-out dates
      - Total amount
      - Status badge
      - Action buttons
  → On filter change: refetch bookings
  → On "View": open BookingDetailModal
  → On "Export": download CSV/Excel
```

---

### 7f. MANAGE USERS (/admin/users)
**Components**:
- `AdminLayout`
- `UsersHeader` - Title, search, "Add User" button
- `UsersFilters` - Role, status, registration date
- `UsersTable`
  - UserRow
    - UserAvatar
    - UserName
    - Email
    - Role (User/Admin)
    - Status (Active/Inactive)
    - RegistrationDate
    - Actions (Edit, Delete, Block)
- `AddUserModal` - Add new user form
- `EditUserModal` - Edit user form

**Pseudocode Flow**:
```
LOAD Manage Users
  → Fetch all users
  → Render AdminLayout
  → Render UsersHeader
  → Render UsersFilters
  → Render UsersTable
    - Each UserRow shows:
      - Avatar
      - Name
      - Email
      - Role badge
      - Status badge
      - Registration date
      - Action buttons
  → On "Add User": open AddUserModal
  → On "Edit": open EditUserModal
  → On "Block/Unblock": toggle user status
```

---

### 7g. MANAGE REVIEWS (/admin/reviews)
**Components**:
- `AdminLayout`
- `ReviewsHeader` - Title, filters
- `ReviewsFilters` - Rating, status, hostel
- `ReviewsTable`
  - ReviewRow
    - ReviewerName
    - HostelName
    - Rating
    - ReviewText (truncated)
    - Status (Approved/Pending/Rejected)
    - Date
    - Actions (Approve, Reject, Delete)
- `ReviewDetailModal` - Full review details

**Pseudocode Flow**:
```
LOAD Manage Reviews
  → Fetch all reviews
  → Render AdminLayout
  → Render ReviewsHeader
  → Render ReviewsFilters
  → Render ReviewsTable
    - Each ReviewRow shows:
      - Reviewer name
      - Hostel name
      - Star rating
      - Review text (truncated)
      - Status badge
      - Date
      - Action buttons (Approve, Reject, Delete)
  → On "Approve": update status to approved
  → On "Reject": update status to rejected
  → On "Delete": show confirmation
```

---

### 7h. ANALYTICS PAGE (/admin/analytics)
**Components**:
- `AdminLayout`
- `AnalyticsHeader` - Title, date range selector
- `AnalyticsGrid`
  - RevenueChart (Line - monthly trend)
  - BookingsChart (Bar - daily/weekly)
  - OccupancyRateChart (Line - monthly)
  - AverageRatingChart (Line - monthly)
  - TopHostelsChart (Pie - revenue distribution)
  - GuestDemographicsChart (Bar - age/location)
- `AnalyticsTable`
  - RevenueByHostel
  - RevenueByRoomType
  - BookingSourceTable (Direct, OTA, etc.)

**Pseudocode Flow**:
```
LOAD Analytics
  → Fetch analytics data
  → Render AdminLayout
  → Render AnalyticsHeader
  → Render AnalyticsGrid
    - RevenueChart (line chart, selectable date range)
    - BookingsChart (bar chart)
    - OccupancyRateChart (line chart)
    - AverageRatingChart (line chart)
    - TopHostelsChart (pie chart)
    - GuestDemographicsChart (bar chart)
  → Render AnalyticsTables
    - Revenue by hostel
    - Revenue by room type
    - Booking sources
```

---

### 7i. ADMIN SETTINGS PAGE (/admin/settings)
**Components**:
- `AdminLayout`
- `SettingsHeader`
- `SettingsTabs` - General, Payment, Email, Security
- `GeneralSettings`
  - SiteNameInput
  - SiteLogoUploader
  - CurrencySelect
  - LanguageSelect
  - TimeZoneSelect
- `PaymentSettings`
  - StripePublicKeyInput
  - StripeSecretKeyInput
  - PayPalClientIdInput
  - PaymentMethods (checkboxes)
- `EmailSettings`
  - SMTPHostInput
  - SMTPPortInput
  - SMTPUserInput
  - SMTPPasswordInput
  - EmailFromInput
  - TestEmailButton
- `SecuritySettings`
  - SessionTimeoutInput
  - TwoFactorAuthToggle
  - IPWhitelistTextarea
  - LoginAttemptsInput

**Pseudocode Flow**:
```
LOAD Admin Settings
  → Fetch settings
  → Render AdminLayout
  → Render SettingsHeader
  → Render SettingsTabs
  → Render GeneralSettings
    - Site name, logo, currency, language, timezone
  → Render PaymentSettings
    - Stripe keys, PayPal client ID
    - Payment method checkboxes
  → Render EmailSettings
    - SMTP configuration
    - Test email button
  → Render SecuritySettings
    - Session timeout
    - 2FA toggle
    - IP whitelist
    - Max login attempts
  → On save: update settings
```

---

## REUSABLE UI COMPONENTS

### Layout Components
- `Container` - Max-width container with padding
- `Section` - Vertical section with spacing
- `Grid` - CSS Grid wrapper
- `Flex` - Flexbox wrapper
- `Stack` - Vertical stack with spacing
- `Divider` - Horizontal/vertical divider

### Navigation Components
- `Navbar` - Main navigation bar
- `Sidebar` - Collapsible sidebar
- `Breadcrumb` - Breadcrumb navigation
- `Pagination` - Pagination controls
- `Tabs` - Tab navigation
- `Menu` - Dropdown menu
- `Stepper` - Step indicator

### Form Components
- `Input` - Text input field
- `Textarea` - Multi-line text input
- `Select` - Dropdown select
- `Checkbox` - Checkbox field
- `RadioGroup` - Radio button group
- `Switch` - Toggle switch
- `DatePicker` - Date picker
- `DateRangePicker` - Date range picker
- `TimePicker` - Time picker
- `FileUploader` - File upload with drag & drop
- `FormLabel` - Label for form fields
- `FormError` - Error message display
- `FormHelper` - Helper text

### Data Display Components
- `Card` - Card container
- `Badge` - Status/label badge
- `Avatar` - User avatar
- `Chip` - Small tag/chip
- `Table` - Data table
- `Tooltip` - Tooltip on hover
- `Popover` - Popover content
- `Progress` - Progress bar
- `Skeleton` - Loading skeleton
- `EmptyState` - Empty state illustration
- `Rating` - Star rating display
- `Price` - Formatted price display

### Feedback Components
- `Button` - Button with variants
- `IconButton` - Icon-only button
- `ButtonGroup` - Group of buttons
- `Alert` - Alert banner
- `Toast` - Toast notification
- `Modal` - Modal dialog
- `Dialog` - Confirmation dialog
- `Drawer` - Slide-out drawer
- `LoadingSpinner` - Loading indicator
- `ProgressBar` - Progress indicator

### Media Components
- `Image` - Optimized image
- `ImageGallery` - Image gallery with lightbox
- `VideoPlayer` - Video player
- `Carousel` - Image/content carousel
- `Map` - Map embed (Google Maps)

---

## DATA MODELS

### User
```typescript
interface User {
  id: string
  email: string
  password: string (hashed)
  firstName: string
  lastName: string
  phone?: string
  dateOfBirth?: Date
  nationality?: string
  avatar?: string
  role: 'user' | 'admin'
  status: 'active' | 'inactive' | 'blocked'
  emailVerified: boolean
  createdAt: Date
  updatedAt: Date
}

interface UserProfile {
  userId: string
  address?: {
    street: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  preferences: {
    language: string
    currency: string
    notifications: {
      email: boolean
      sms: boolean
      push: boolean
    }
  }
  loyaltyPoints: number
}
```

### Hostel
```typescript
interface Hostel {
  id: string
  name: string
  description: string
  category: 'budget' | 'mid-range' | 'luxury'
  location: {
    address: string
    city: string
    state: string
    country: string
    zipCode: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  contact: {
    phone: string
    email: string
    website?: string
  }
  amenities: string[]
  images: string[]
  mainImage: string
  policies: {
    checkInTime: string
    checkOutTime: string
    cancellationPolicy: string
    houseRules: string
  }
  rating: {
    overall: number
    cleanliness: number
    location: number
    staff: number
    facilities: number
    value: number
  }
  reviewCount: number
  status: 'active' | 'inactive'
  createdBy: string
  createdAt: Date
  updatedAt: Date
}
```

### RoomType
```typescript
interface RoomType {
  id: string
  hostelId: string
  name: string
  description: string
  type: 'dorm' | 'private' | 'suite' | 'family'
  capacity: number
  bedCount: number
  bedType: string
  size: number (sq ft)
  pricePerNight: number
  amenities: string[]
  images: string[]
  availableBeds: number
  totalBeds: number
  status: 'active' | 'inactive'
  createdAt: Date
  updatedAt: Date
}
```

### Booking
```typescript
interface Booking {
  id: string
  referenceNumber: string
  userId: string
  hostelId: string
  roomTypeId: string
  checkInDate: Date
  checkOutDate: Date
  guestCount: number
  guests: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }[]
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no-show'
  payment: {
    method: 'card' | 'paypal' | 'bank_transfer'
    amount: number
    currency: string
    paidAt: Date
    transactionId: string
  }
  priceBreakdown: {
    roomCharges: number
    taxes: number
    fees: number
    discount: number
    total: number
  }
  createdAt: Date
  updatedAt: Date
}
```

### Review
```typescript
interface Review {
  id: string
  userId: string
  hostelId: string
  bookingId?: string
  rating: {
    overall: number
    cleanliness: number
    location: number
    staff: number
    facilities: number
    value: number
  }
  title: string
  content: string
  images?: string[]
  status: 'pending' | 'approved' | 'rejected'
  helpfulCount: number
  createdAt: Date
  updatedAt: Date
}
```

### Wishlist
```typescript
interface Wishlist {
  id: string
  userId: string
  hostelId: string
  createdAt: Date
}
```

---

## API ENDPOINTS

### Authentication
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/forgot-password
POST /api/auth/reset-password
POST /api/auth/verify-email
GET  /api/auth/me
```

### Hostels
```
GET    /api/hostels
GET    /api/hostels/:id
POST   /api/hostels (admin)
PUT    /api/hostels/:id (admin)
DELETE /api/hostels/:id (admin)
GET    /api/hostels/:id/rooms
GET    /api/hostels/:id/reviews
GET    /api/hostels/:id/availability
```

### Room Types
```
GET    /api/rooms/:id
POST   /api/rooms (admin)
PUT    /api/rooms/:id (admin)
DELETE /api/rooms/:id (admin)
PATCH  /api/rooms/:id/availability (admin)
```

### Bookings
```
GET    /api/bookings
GET    /api/bookings/:id
POST   /api/bookings
PUT    /api/bookings/:id
DELETE /api/bookings/:id
PATCH  /api/bookings/:id/cancel
GET    /api/bookings/:id/confirmation
```

### Reviews
```
GET    /api/reviews
GET    /api/reviews/:id
POST   /api/reviews
PUT    /api/reviews/:id
DELETE /api/reviews/:id
PATCH  /api/reviews/:id/approve (admin)
PATCH  /api/reviews/:id/reject (admin)
```

### Wishlist
```
GET    /api/wishlist
POST   /api/wishlist
DELETE /api/wishlist/:hostelId
```

### Users (Admin)
```
GET    /api/users
GET    /api/users/:id
POST   /api/users (admin)
PUT    /api/users/:id (admin)
DELETE /api/users/:id (admin)
PATCH  /api/users/:id/block (admin)
PATCH  /api/users/:id/unblock (admin)
```

### Analytics (Admin)
```
GET /api/analytics/revenue
GET /api/analytics/bookings
GET /api/analytics/occupancy
GET /api/analytics/ratings
GET /api/analytics/hostels
GET /api/analytics/demographics
```

### Settings (Admin)
```
GET    /api/settings
PUT    /api/settings
POST   /api/settings/test-email
```

---

## USER FLOWS

### 1. Guest Booking Flow
```
1. User lands on homepage
2. User searches for hostels (location, dates, guests)
3. User views search results with filters
4. User clicks on a hostel to view details
5. User browses hostel info, amenities, reviews
6. User selects room type and dates
7. User clicks "Reserve Now"
8. Booking modal opens
9. Step 1: User enters guest information
10. Step 2: User enters payment details
11. Step 3: Payment is processed
12. Booking confirmation displayed
13. Confirmation email sent
14. User redirected to "My Bookings"
```

### 2. User Registration Flow
```
1. User clicks "Sign Up" from navbar
2. User fills registration form
3. User submits form
4. Account created
5. Verification email sent
6. User clicks verification link
7. Email verified
8. User redirected to login
9. User logs in
10. Redirected to dashboard
```

### 3. Admin Add Hostel Flow
```
1. Admin logs in
2. Admin navigates to "Manage Hostels"
3. Admin clicks "Add Hostel"
4. Multi-step form opens
5. Step 1: Basic information
6. Step 2: Contact information
7. Step 3: Amenities selection
8. Step 4: Image upload
9. Step 5: Policies configuration
10. Step 6: Room types setup
11. Admin submits form
12. Hostel created
13. Success message displayed
```

### 4. Booking Modification Flow
```
1. User navigates to "My Bookings"
2. User clicks on a booking
3. User views booking details
4. User clicks "Modify Booking"
5. Modification modal opens
6. User changes dates or room type
7. Price difference calculated
8. User confirms modification
9. Additional payment processed (if any)
10. Booking updated
11. Confirmation email sent
```

### 5. Review Submission Flow
```
1. User navigates to "My Reviews"
2. User clicks "Write Review"
4. User selects hostel from past bookings
5. User fills review form
   - Overall rating
   - Category ratings
   - Review title
   - Review content
   - Upload images (optional)
6. User submits review
7. Review saved with "pending" status
8. Admin notified
9. Admin reviews and approves/rejects
10. If approved: review published
11. Hostel rating updated
```

---

## KEY FEATURES

### For Users
- **Search & Filter**: Advanced search with location, dates, guests, price, rating, amenities
- **Hostel Discovery**: Detailed hostel pages with galleries, amenities, reviews
- **Real-time Availability**: Live room availability and pricing
- **Secure Booking**: Multi-step booking with secure payment
- **Booking Management**: View, modify, cancel bookings
- **Wishlist**: Save favorite hostels
- **Reviews**: Write and read reviews
- **User Profile**: Manage personal information and preferences
- **Email Notifications**: Booking confirmations, reminders, updates

### For Admins
- **Dashboard**: Overview of key metrics and analytics
- **Hostel Management**: Add, edit, deactivate hostels
- **Room Management**: Configure room types and availability
- **Booking Management**: View, modify, cancel bookings
- **User Management**: Manage users, block/unblock accounts
- **Review Moderation**: Approve/reject reviews
- **Analytics**: Revenue, occupancy, ratings, demographics
- **Settings**: Configure site-wide settings
- **Payment Integration**: Manage payment methods

---

## ACCESSIBILITY & RESPONSIVENESS

### Breakpoints
```typescript
breakpoints: {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Laptop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
}
```

### Accessibility Features
- ARIA labels on all interactive elements
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus indicators
- Skip to main content link
- Alt text on all images
- Color contrast compliance (WCAG AA)

---

## PERFORMANCE OPTIMIZATIONS

- **Code Splitting**: Route-based code splitting with React.lazy
- **Image Optimization**: Lazy loading, WebP format, responsive images
- **Caching**: API response caching with React Query
- **Bundle Size**: Tree shaking, minification, gzip compression
- **CDN**: Static assets served via CDN
- **Pagination**: Server-side pagination for large lists
- **Debouncing**: Search input debouncing
- **Virtual Scrolling**: For long lists (optional)

---

## SECURITY CONSIDERATIONS

- **Authentication**: JWT tokens with refresh token rotation
- **Authorization**: Role-based access control (RBAC)
- **Input Validation**: Zod schema validation on all inputs
- **XSS Prevention**: React's built-in XSS protection
- **CSRF Protection**: CSRF tokens for state-changing operations
- **Rate Limiting**: API rate limiting
- **Password Security**: Bcrypt hashing, minimum requirements
- **HTTPS**: All communications over HTTPS
- **Data Encryption**: Sensitive data encryption at rest
- **SQL Injection Prevention**: Parameterized queries
- **File Upload Security**: File type validation, size limits

---

## DEPLOYMENT CHECKLIST

- Environment variables configuration
- Database migrations
- Build optimization
- CDN setup
- SSL certificate
- Domain configuration
- Error monitoring (Sentry)
- Analytics (Google Analytics)
- Performance monitoring
- Backup strategy
- CI/CD pipeline

---

## NEXT STEPS

1. Set up React Vite project with TypeScript
2. Install and configure Tailwind CSS
3. Set up shadcn/ui components
4. Configure React Router
5. Set up React Query for data fetching
6. Create base layout components
7. Implement authentication flow
8. Build public pages (landing, listing, detail)
9. Build user dashboard
10. Build admin dashboard
11. Integrate payment gateway
12. Add analytics and monitoring
13. Test all user flows
14. Deploy to production

---

This guide provides a comprehensive overview of the Hostel Booking System. Each component, page, and feature has been detailed to ensure a complete understanding before development begins.
