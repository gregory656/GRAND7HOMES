/**
 * Application-wide constants for the Hostel Booking Platform
 * Includes mock data for development (until backend API is available)
 */

// ─── Mock Hostel Data ────────────────────────────────────────────────────────
export const MOCK_HOSTELS = [
    {
        id: '1',
        name: 'Nairobi Central Backpackers',
        location: 'Nairobi, Kenya',
        city: 'Nairobi',
        description: 'A vibrant hostel in the heart of Nairobi, perfect for solo travellers and backpackers. Enjoy rooftop views, a fully equipped kitchen, and daily social events.',
        rating: 4.7,
        reviewCount: 234,
        pricePerNight: 1500,
        currency: 'KES',
        category: 'Budget',
        images: [
            'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80',
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
        ],
        amenities: ['WiFi', 'Kitchen', 'Lounge', 'Lockers', 'Laundry', '24/7 Reception', 'Rooftop', 'Tours'],
        roomTypes: [
            { id: 'r1', name: '8-Bed Dorm', capacity: 8, pricePerNight: 1500, availableBeds: 5, totalBeds: 8 },
            { id: 'r2', name: '4-Bed Dorm', capacity: 4, pricePerNight: 2200, availableBeds: 3, totalBeds: 4 },
            { id: 'r3', name: 'Private Room', capacity: 2, pricePerNight: 4500, availableBeds: 2, totalBeds: 2 },
        ],
        checkInTime: '14:00',
        checkOutTime: '11:00',
        cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
        coordinates: { lat: -1.286389, lng: 36.817223 },
        isFeatured: true,
        isWishlisted: false,
        tags: ['Social', 'Budget', 'City Center'],
    },
    {
        id: '2',
        name: 'Mombasa Beach Haven',
        location: 'Mombasa, Kenya',
        city: 'Mombasa',
        description: 'Wake up to ocean breezes at our beachfront hostel in Mombasa. Perfect for beach lovers and those exploring the Swahili Coast.',
        rating: 4.5,
        reviewCount: 189,
        pricePerNight: 2000,
        currency: 'KES',
        category: 'Mid-range',
        images: [
            'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
            'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        ],
        amenities: ['WiFi', 'Pool', 'Beach Access', 'Bar', 'Restaurant', 'Tours', 'Parking', 'AC'],
        roomTypes: [
            { id: 'r4', name: '6-Bed Dorm', capacity: 6, pricePerNight: 2000, availableBeds: 4, totalBeds: 6 },
            { id: 'r5', name: 'Private Sea View', capacity: 2, pricePerNight: 6500, availableBeds: 1, totalBeds: 2 },
        ],
        checkInTime: '13:00',
        checkOutTime: '10:00',
        cancellationPolicy: 'Free cancellation up to 72 hours before check-in',
        coordinates: { lat: -4.043477, lng: 39.668206 },
        isFeatured: true,
        isWishlisted: false,
        tags: ['Beach', 'Scenic', 'Social'],
    },
    {
        id: '3',
        name: 'Kisumu Lakeside Lodge',
        location: 'Kisumu, Kenya',
        city: 'Kisumu',
        description: 'Relax by the shores of Lake Victoria in our cozy lakeside hostel. Enjoy sunset views, fresh fish dinners, and boat tours.',
        rating: 4.3,
        reviewCount: 98,
        pricePerNight: 1800,
        currency: 'KES',
        category: 'Budget',
        images: [
            'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&q=80',
            'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80',
            'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?w=800&q=80',
        ],
        amenities: ['WiFi', 'Lake View', 'Restaurant', 'Boat Tours', 'Parking', 'Lounge'],
        roomTypes: [
            { id: 'r6', name: '6-Bed Dorm', capacity: 6, pricePerNight: 1800, availableBeds: 6, totalBeds: 6 },
            { id: 'r7', name: 'Private Room', capacity: 2, pricePerNight: 4000, availableBeds: 2, totalBeds: 3 },
        ],
        checkInTime: '14:00',
        checkOutTime: '11:00',
        cancellationPolicy: 'Free cancellation up to 24 hours before check-in',
        coordinates: { lat: -0.091702, lng: 34.767956 },
        isFeatured: false,
        isWishlisted: false,
        tags: ['Lake View', 'Nature', 'Peaceful'],
    },
    {
        id: '4',
        name: 'Nakuru Safari Base',
        location: 'Nakuru, Kenya',
        city: 'Nakuru',
        description: 'Your gateway to Lake Nakuru National Park. Comfortable accommodation with expert safari guides and stunning flamingo views.',
        rating: 4.8,
        reviewCount: 312,
        pricePerNight: 2500,
        currency: 'KES',
        category: 'Mid-range',
        images: [
            'https://images.unsplash.com/photo-1547471080-7cc2c9b37312?w=800&q=80',
            'https://images.unsplash.com/photo-1504233529578-6d46baba6d34?w=800&q=80',
            'https://images.unsplash.com/photo-1484256017452-47f7b1458a0f?w=800&q=80',
        ],
        amenities: ['WiFi', 'Safari Tours', 'Restaurant', 'Bar', 'Parking', 'Garden', 'Campfire'],
        roomTypes: [
            { id: 'r8', name: '4-Bed Dorm', capacity: 4, pricePerNight: 2500, availableBeds: 2, totalBeds: 4 },
            { id: 'r9', name: 'Private Chalet', capacity: 2, pricePerNight: 7500, availableBeds: 1, totalBeds: 2 },
        ],
        checkInTime: '12:00',
        checkOutTime: '10:00',
        cancellationPolicy: 'Non-refundable within 48 hours of check-in',
        coordinates: { lat: -0.303099, lng: 36.080026 },
        isFeatured: true,
        isWishlisted: false,
        tags: ['Safari', 'Wildlife', 'Nature'],
    },
    {
        id: '5',
        name: 'Malindi Ocean Hostel',
        location: 'Malindi, Kenya',
        city: 'Malindi',
        description: 'A charming hostel in the ancient coastal town of Malindi. Explore marine parks, coral reefs, and rich Swahili culture.',
        rating: 4.4,
        reviewCount: 145,
        pricePerNight: 1700,
        currency: 'KES',
        category: 'Budget',
        images: [
            'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80',
            'https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef?w=800&q=80',
        ],
        amenities: ['WiFi', 'Beach Access', 'Diving', 'Kitchen', 'Tours', 'Rooftop'],
        roomTypes: [
            { id: 'r10', name: '8-Bed Dorm', capacity: 8, pricePerNight: 1700, availableBeds: 7, totalBeds: 8 },
            { id: 'r11', name: 'Private Room', capacity: 2, pricePerNight: 4200, availableBeds: 1, totalBeds: 2 },
        ],
        checkInTime: '14:00',
        checkOutTime: '11:00',
        cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
        coordinates: { lat: -3.218533, lng: 40.116875 },
        isFeatured: false,
        isWishlisted: false,
        tags: ['Diving', 'Beach', 'Culture'],
    },
    {
        id: '6',
        name: 'Naivasha Green Park Hostel',
        location: 'Naivasha, Kenya',
        city: 'Naivasha',
        description: 'Nestled near Hell\'s Gate and Lake Naivasha, our hostel is the perfect base for cycling, rock climbing, and hippo-watching boat rides.',
        rating: 4.6,
        reviewCount: 178,
        pricePerNight: 2100,
        currency: 'KES',
        category: 'Mid-range',
        images: [
            'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80',
            'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        ],
        amenities: ['WiFi', 'Bike Rental', 'Garden', 'BBQ', 'Parking', 'Tours', 'Kitchen'],
        roomTypes: [
            { id: 'r12', name: '6-Bed Dorm', capacity: 6, pricePerNight: 2100, availableBeds: 3, totalBeds: 6 },
            { id: 'r13', name: 'Private Cabin', capacity: 2, pricePerNight: 5800, availableBeds: 2, totalBeds: 3 },
        ],
        checkInTime: '13:00',
        checkOutTime: '11:00',
        cancellationPolicy: 'Free cancellation up to 48 hours before check-in',
        coordinates: { lat: -0.717216, lng: 36.430758 },
        isFeatured: true,
        isWishlisted: false,
        tags: ['Adventure', 'Nature', 'Cycling'],
    },
]

// ─── Popular Destinations ────────────────────────────────────────────────────
export const POPULAR_DESTINATIONS = [
    { id: 'd1', city: 'Nairobi', country: 'Kenya', hostelCount: 45, image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80' },
    { id: 'd2', city: 'Mombasa', country: 'Kenya', hostelCount: 32, image: 'https://images.unsplash.com/photo-1531761535209-180857e963b9?w=400&q=80' },
    { id: 'd3', city: 'Nakuru', country: 'Kenya', hostelCount: 18, image: 'https://images.unsplash.com/photo-1547471080-7cc2c9b37312?w=400&q=80' },
    { id: 'd4', city: 'Kisumu', country: 'Kenya', hostelCount: 14, image: 'https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=400&q=80' },
    { id: 'd5', city: 'Malindi', country: 'Kenya', hostelCount: 12, image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=400&q=80' },
    { id: 'd6', city: 'Naivasha', country: 'Kenya', hostelCount: 10, image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=400&q=80' },
]

// ─── Mock Reviews ────────────────────────────────────────────────────────────
export const MOCK_REVIEWS = [
    { id: 'rv1', hostelId: '1', user: 'Sarah M.', avatar: 'SM', rating: 5, text: 'Amazing experience! The rooftop view is breathtaking and the staff are incredibly helpful. Would 100% recommend to any solo traveller.', date: '2024-12-15', country: 'UK' },
    { id: 'rv2', hostelId: '1', user: 'James K.', avatar: 'JK', rating: 4, text: 'Great location, very central. Dorms were clean and well-maintained. The social events every evening were a big plus!', date: '2024-11-20', country: 'USA' },
    { id: 'rv3', hostelId: '2', user: 'Elena R.', avatar: 'ER', rating: 5, text: 'Perfect beachfront hostel. Woke up to the sound of waves every day. The staff organized fantastic snorkelling trips!', date: '2024-12-01', country: 'Germany' },
    { id: 'rv4', hostelId: '4', user: 'Tom B.', avatar: 'TB', rating: 5, text: 'Best safari base I\'ve ever stayed at. The guides were knowledgeable and we saw flamingos on day one. Unforgettable!', date: '2024-10-28', country: 'Australia' },
]

// ─── Mock User Bookings ──────────────────────────────────────────────────────
export const MOCK_BOOKINGS = [
    {
        id: 'b1',
        referenceNo: 'GH-2024-123456',
        hostelId: '1',
        hostelName: 'Nairobi Central Backpackers',
        hostelImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
        hostelLocation: 'Nairobi, Kenya',
        roomType: '4-Bed Dorm',
        checkIn: '2025-01-15',
        checkOut: '2025-01-18',
        guests: 2,
        totalAmount: 8800,
        status: 'confirmed',
        paymentMethod: 'Card',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '+254712345678',
        specialRequests: 'Late check-in around 10pm',
        createdAt: '2024-12-10',
    },
    {
        id: 'b2',
        referenceNo: 'GH-2024-789012',
        hostelId: '2',
        hostelName: 'Mombasa Beach Haven',
        hostelImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
        hostelLocation: 'Mombasa, Kenya',
        roomType: 'Private Sea View',
        checkIn: '2025-02-01',
        checkOut: '2025-02-05',
        guests: 2,
        totalAmount: 28600,
        status: 'upcoming',
        paymentMethod: 'M-Pesa',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '+254712345678',
        specialRequests: '',
        createdAt: '2024-12-20',
    },
    {
        id: 'b3',
        referenceNo: 'GH-2024-345678',
        hostelId: '4',
        hostelName: 'Nakuru Safari Base',
        hostelImage: 'https://images.unsplash.com/photo-1547471080-7cc2c9b37312?w=800&q=80',
        hostelLocation: 'Nakuru, Kenya',
        roomType: '4-Bed Dorm',
        checkIn: '2024-11-01',
        checkOut: '2024-11-03',
        guests: 1,
        totalAmount: 5000,
        status: 'completed',
        paymentMethod: 'Card',
        guestName: 'John Doe',
        guestEmail: 'john@example.com',
        guestPhone: '+254712345678',
        specialRequests: '',
        createdAt: '2024-10-20',
    },
]

// ─── Amenities List ──────────────────────────────────────────────────────────
export const AMENITIES = [
    'WiFi', 'Pool', 'Kitchen', 'Laundry', 'Lockers', 'AC', 'Parking', 'Bar',
    'Restaurant', 'Rooftop', 'Tours', 'Lounge', 'Garden', 'BBQ', 'Gym',
    'Bike Rental', 'Beach Access', 'Lake View', 'Safari Tours', 'Campfire',
    '24/7 Reception', 'Security', 'Elevator', 'Wheelchair Accessible',
]

// ─── Room Types ──────────────────────────────────────────────────────────────
export const ROOM_TYPES = ['Dorm', 'Private Room', 'Suite', 'Shared Room', 'Cabin', 'Chalet']

// ─── Hostel Categories ───────────────────────────────────────────────────────
export const CATEGORIES = ['Budget', 'Mid-range', 'Luxury']

// ─── Navigation Routes ───────────────────────────────────────────────────────
export const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Hostels', href: '/hostels' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

// ─── Booking Status Colors ───────────────────────────────────────────────────
export const STATUS_COLORS = {
    confirmed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Confirmed' },
    upcoming: { bg: 'bg-gray-100', text: 'text-gray-900', label: 'Upcoming' },
    completed: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Completed' },
    cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
}

// ─── Testimonials ────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
    { id: 't1', name: 'Sarah Mitchell', country: 'United Kingdom', avatar: 'SM', rating: 5, text: 'Grand7Homes made my solo trip across Kenya absolutely seamless. Found amazing hostels at every stop, with real traveller reviews I could trust. Highly recommend!', hostel: 'Nairobi Central Backpackers' },
    { id: 't2', name: 'Marco Rossi', country: 'Italy', avatar: 'MR', rating: 5, text: 'The booking process was so simple. I found a beautiful beachfront place in Mombasa within minutes. The filters are really helpful when you know what you want.', hostel: 'Mombasa Beach Haven' },
    { id: 't3', name: 'Amy Chen', country: 'Singapore', avatar: 'AC', rating: 4, text: 'Love how I can see availability in real time. No more emailing back and forth to check if a dorm bed is free. The platform just works!', hostel: 'Naivasha Green Park' },
    { id: 't4', name: 'David Müller', country: 'Germany', avatar: 'DM', rating: 5, text: 'Perfect for budget travellers. Found a safari hostel in Nakuru that blew my mind. The photos were accurate and everything was exactly as described.', hostel: 'Nakuru Safari Base' },
]

// ─── How It Works Steps ──────────────────────────────────────────────────────
export const HOW_IT_WORKS = [
    { step: 1, title: 'Search Destinations', description: 'Enter your destination, travel dates, and number of guests to find the perfect hostel.' },
    { step: 2, title: 'Compare & Choose', description: 'Browse real photos, read genuine reviews, and compare prices to find your perfect match.' },
    { step: 3, title: 'Book Instantly', description: 'Reserve your bed or room securely online. Instant confirmation direct to your email.' },
]
