/**
 * BookingDetail.jsx - Individual booking detail view
 * React Query is used for data fetching.
 */

import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Calendar, MapPin, Phone, Mail, User, CreditCard, Clock, Download, ChevronLeft } from 'lucide-react'
import UserLayout from '../../components/layout/UserLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import { SectionLoader } from '../../components/ui/Spinner'
import { getBookingById } from '../../services/bookingService'
import { MOCK_BOOKINGS, STATUS_COLORS } from '../../constants'
import { formatPrice, formatDate, calculateNights } from '../../lib/utils'

function BookingDetail() {
    const { id } = useParams()

    // React Query is used for data fetching
    const { data: booking, isLoading } = useQuery({
        queryKey: ['booking', id],
        queryFn: () => getBookingById(id),
        placeholderData: MOCK_BOOKINGS.find((b) => b.id === id),
    })

    if (isLoading) return <UserLayout><SectionLoader /></UserLayout>
    if (!booking) return <UserLayout><p className="text-gray-500">Booking not found.</p></UserLayout>

    const statusInfo = STATUS_COLORS[booking.status] || STATUS_COLORS.confirmed
    const nights = calculateNights(booking.checkIn, booking.checkOut)

    const timeline = [
        { label: 'Booking Created', date: formatDate(booking.createdAt), done: true },
        { label: 'Payment Confirmed', date: formatDate(booking.createdAt), done: true },
        { label: 'Check-in', date: formatDate(booking.checkIn), done: booking.status === 'completed' },
        { label: 'Check-out', date: formatDate(booking.checkOut), done: booking.status === 'completed' },
    ]

    return (
        <UserLayout>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <Link to="/user/bookings">
                    <Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
                </Link>
                <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Booking Details</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Ref: {booking.referenceNo}</p>
                </div>
                <span className={`ml-auto text-xs font-bold rounded-full px-3 py-1.5 ${statusInfo.bg} ${statusInfo.text}`}>{statusInfo.label}</span>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                {/* Booking Summary */}
                <Card>
                    <CardHeader><CardTitle className="text-base">Booking Summary</CardTitle></CardHeader>
                    <CardContent className="pt-0 space-y-3">
                        <div className="flex gap-3">
                            <img src={booking.hostelImage} alt="" className="h-16 w-16 rounded-xl object-cover shrink-0" />
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{booking.hostelName}</p>
                                <p className="text-sm text-blue-600 dark:text-blue-400">{booking.roomType}</p>
                                <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5"><MapPin className="h-3 w-3" />{booking.hostelLocation}</div>
                            </div>
                        </div>
                        {[
                            { icon: Calendar, label: 'Check-in', val: formatDate(booking.checkIn) },
                            { icon: Calendar, label: 'Check-out', val: formatDate(booking.checkOut) },
                            { icon: Clock, label: 'Duration', val: `${nights} night${nights > 1 ? 's' : ''}` },
                            { icon: User, label: 'Guests', val: `${booking.guests} guest${booking.guests > 1 ? 's' : ''}` },
                        ].map(({ icon: Icon, label, val }) => (
                            <div key={label} className="flex items-center gap-3">
                                <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 w-20">{label}</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{val}</p>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Guest Details */}
                <Card>
                    <CardHeader><CardTitle className="text-base">Guest Details</CardTitle></CardHeader>
                    <CardContent className="pt-0 space-y-3">
                        {[
                            { icon: User, label: 'Name', val: booking.guestName },
                            { icon: Mail, label: 'Email', val: booking.guestEmail },
                            { icon: Phone, label: 'Phone', val: booking.guestPhone },
                        ].map(({ icon: Icon, label, val }) => (
                            <div key={label} className="flex items-center gap-3">
                                <Icon className="h-4 w-4 text-gray-400 shrink-0" />
                                <p className="text-xs text-gray-500 dark:text-gray-400 w-12">{label}</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{val}</p>
                            </div>
                        ))}
                        {booking.specialRequests && (
                            <div className="rounded-lg bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 p-3 mt-2">
                                <p className="text-xs font-medium text-yellow-700 dark:text-yellow-400">Special Request</p>
                                <p className="text-sm text-yellow-600 dark:text-yellow-300 mt-0.5">{booking.specialRequests}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Payment Summary */}
                <Card>
                    <CardHeader><CardTitle className="text-base">Payment Summary</CardTitle></CardHeader>
                    <CardContent className="pt-0 space-y-2 text-sm">
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Room charges ({nights} nights)</span>
                            <span>{formatPrice(Math.round(booking.totalAmount / 1.21))}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Taxes (16% VAT)</span>
                            <span>{formatPrice(Math.round(booking.totalAmount * 0.16 / 1.21))}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 dark:text-gray-400">
                            <span>Service fee (5%)</span>
                            <span>{formatPrice(Math.round(booking.totalAmount * 0.05 / 1.21))}</span>
                        </div>
                        <div className="flex justify-between font-bold text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                            <span>Total Paid</span><span className="text-blue-600 dark:text-blue-400">{formatPrice(booking.totalAmount)}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <CreditCard className="h-3.5 w-3.5" />Paid via {booking.paymentMethod}
                        </div>
                    </CardContent>
                </Card>

                {/* Timeline */}
                <Card>
                    <CardHeader><CardTitle className="text-base">Booking Timeline</CardTitle></CardHeader>
                    <CardContent className="pt-0">
                        <div className="relative pl-4">
                            <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gray-200 dark:bg-gray-700" />
                            {timeline.map((item, i) => (
                                <div key={i} className="relative mb-4 last:mb-0">
                                    <div className={`absolute -left-5 top-1 h-3 w-3 rounded-full border-2 ${item.done ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600'}`} />
                                    <p className={`text-sm font-medium ${item.done ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>{item.label}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.date}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 mt-5">
                <Button variant="outline"><Download className="h-4 w-4" />Download Receipt</Button>
                {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                    <Button variant="destructive">Cancel Booking</Button>
                )}
            </div>
        </UserLayout>
    )
}

export default BookingDetail
