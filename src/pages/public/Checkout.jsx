/**
 * Checkout.jsx - Multi-step checkout page (Guest Info → Payment → Confirmation)
 * Uses React Hook Form + Zod for form validation
 * Uses BookingContext for cart data and paymentService for payments
 */

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, CreditCard, User, CheckCircle, Copy } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useBooking } from '../../contexts/BookingContext'
import { useAuth } from '../../contexts/AuthContext'
import { simulatePayment } from '../../services/paymentService'
import { createBooking } from '../../services/bookingService'
import { formatPrice, generateBookingRef } from '../../lib/utils'

// ── Zod Validation Schemas ───────────────────────────────────────────────────
// This uses Zod for form validation and React Hook Form
const guestSchema = z.object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name required'),
    email: z.string().email('Valid email required'),
    phone: z.string().min(10, 'Valid phone number required'),
    specialRequests: z.string().optional(),
})

const paymentSchema = z.object({
    method: z.enum(['card', 'paypal', 'mpesa']),
    cardNumber: z.string().optional(),
    expiry: z.string().optional(),
    cvv: z.string().optional(),
    cardName: z.string().optional(),
    mpesaPhone: z.string().optional(),
})

// ── Step Indicator ───────────────────────────────────────────────────────────
function StepIndicator({ step }) {
    const steps = [
        { id: 1, label: 'Guest Info', icon: User },
        { id: 2, label: 'Payment', icon: CreditCard },
        { id: 3, label: 'Confirmation', icon: Check },
    ]
    return (
        <div className="flex items-center justify-center mb-10">
            {steps.map((s, i) => (
                <div key={s.id} className="flex items-center">
                    <div className={`flex items-center gap-2 ${step >= s.id ? 'text-gray-800' : 'text-gray-400'}`}>
                        <div className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all ${step > s.id ? 'border-gray-300 bg-gray-300' :
                                step === s.id ? 'border-gray-800' : 'border-gray-300'
                            }`}>
                            {step > s.id
                                ? <Check className="h-4 w-4 text-gray-700" />
                                : <s.icon className={`h-4 w-4 ${step === s.id ? 'text-gray-800' : 'text-gray-400'}`} />
                            }
                        </div>
                        <span className={`hidden sm:block text-sm font-medium ${step >= s.id ? '' : 'text-gray-400'}`}>{s.label}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`mx-3 h-0.5 w-12 sm:w-20 transition-colors ${step > s.id ? 'bg-gray-300' : 'bg-gray-200'}`} />
                    )}
                </div>
            ))}
        </div>
    )
}

function Checkout() {
    const { bookingItems, subtotal, taxes, serviceFee, total, clearBooking } = useBooking()
    const { user } = useAuth()
    const navigate = useNavigate()

    const [step, setStep] = useState(1)
    const [guestData, setGuestData] = useState(null)
    const [payMethod, setPayMethod] = useState('card')
    const [processing, setProcessing] = useState(false)
    const [bookingRef, setBookingRef] = useState('')
    const [copied, setCopied] = useState(false)

    // Step 1: Guest Info form — This uses Zod for form validation and React Hook Form
    const guestForm = useForm({ resolver: zodResolver(guestSchema), defaultValues: { firstName: user?.name?.split(' ')[0] || '', email: user?.email || '', method: 'card' } })
    const payForm = useForm({ resolver: zodResolver(paymentSchema), defaultValues: { method: 'card' } })

    const onGuestSubmit = (data) => { setGuestData(data); setStep(2) }

    const onPaymentSubmit = async () => {
        setProcessing(true)
        try {
            // Payment simulation — replace with real Stripe/PayPal when keys are available
            await simulatePayment({ method: payMethod, amount: total })
            const ref = generateBookingRef()
            setBookingRef(ref)
            // Create booking record via REST API
            await createBooking({
                ...guestData,
                items: bookingItems,
                total,
                referenceNo: ref,
                paymentMethod: payMethod,
            })
            clearBooking()
            setStep(3)
        } catch (err) {
            console.error('Payment failed:', err)
        } finally {
            setProcessing(false)
        }
    }

    const copyRef = () => {
        navigator.clipboard.writeText(bookingRef)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
                <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Checkout</h1>
                <p className="text-sm text-gray-500 text-center mb-8">Complete your booking securely</p>

                <StepIndicator step={step} />

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Form Area */}
                    <div className="flex-1">
                        {/* ── Step 1: Guest Information ── */}
                        {step === 1 && (
                            <div className="rounded-2xl bg-white border border-gray-200 p-6 animate-fade-in">
                                <h2 className="text-lg font-bold text-gray-900 mb-5">Guest Information</h2>
                                <form onSubmit={guestForm.handleSubmit(onGuestSubmit)} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Input label="First Name" placeholder="John" error={guestForm.formState.errors.firstName?.message} {...guestForm.register('firstName')} />
                                        <Input label="Last Name" placeholder="Doe" error={guestForm.formState.errors.lastName?.message} {...guestForm.register('lastName')} />
                                    </div>
                                    <Input label="Email Address" type="email" placeholder="john@example.com" error={guestForm.formState.errors.email?.message} {...guestForm.register('email')} />
                                    <Input label="Phone Number" type="tel" placeholder="+254 700 000 000" error={guestForm.formState.errors.phone?.message} {...guestForm.register('phone')} />
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Special Requests (optional)</label>
                                        <textarea
                                            placeholder="e.g. Late check-in, dietary requirements..."
                                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600/20 min-h-[80px]"
                                            {...guestForm.register('specialRequests')}
                                        />
                                    </div>
                                    <Button type="submit" size="lg" variant="gradient" className="w-full mt-2">Continue to Payment</Button>
                                </form>
                            </div>
                        )}

                        {/* ── Step 2: Payment ── */}
                        {step === 2 && (
                            <div className="rounded-2xl bg-white border border-gray-200 p-6 animate-fade-in">
                                <h2 className="text-lg font-bold text-gray-900 mb-5">Payment Method</h2>

                                {/* Payment Method Selector */}
                                <div className="grid grid-cols-3 gap-3 mb-6">
                                    {[
                                        { id: 'card', label: 'Credit Card', emoji: '💳' },
                                        { id: 'paypal', label: 'PayPal', emoji: '🅿️' },
                                        { id: 'mpesa', label: 'M-Pesa', emoji: '📱' },
                                    ].map((m) => (
                                        <button
                                            key={m.id}
                                            onClick={() => setPayMethod(m.id)}
                                            className={`rounded-xl border-2 p-3 text-center transition-all ${payMethod === m.id ? 'border-gray-600 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{m.emoji}</div>
                                            <p className="text-xs font-medium text-gray-700">{m.label}</p>
                                        </button>
                                    ))}
                                </div>

                                {/* Card Details */}
                                {payMethod === 'card' && (
                                    <div className="space-y-4">
                                        <Input label="Card Number" placeholder="1234 5678 9012 3456" {...payForm.register('cardNumber')} />
                                        <Input label="Name on Card" placeholder="JOHN DOE" {...payForm.register('cardName')} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input label="Expiry Date" placeholder="MM/YY" {...payForm.register('expiry')} />
                                            <Input label="CVV" placeholder="123" type="password" {...payForm.register('cvv')} />
                                        </div>
                                    </div>
                                )}
                                {payMethod === 'mpesa' && (
                                    <Input label="M-Pesa Phone Number" placeholder="+254 700 000 000" {...payForm.register('mpesaPhone')} />
                                )}
                                {payMethod === 'paypal' && (
                                    <div className="rounded-xl bg-gray-50 p-4 text-center text-sm text-gray-600">
                                        You will be redirected to PayPal to complete your payment securely.
                                    </div>
                                )}

                                <div className="flex gap-3 mt-6">
                                    <Button variant="outline" size="lg" className="w-full" onClick={() => setStep(1)}>Back</Button>
                                    <Button size="lg" variant="gradient" className="w-full" onClick={onPaymentSubmit} loading={processing}>
                                        {processing ? 'Processing…' : `Pay ${formatPrice(total)}`}
                                    </Button>
                                </div>
                            </div>
                        )}

                        {/* ── Step 3: Confirmation ── */}
                        {step === 3 && (
                            <div className="rounded-2xl bg-white border border-gray-200 p-8 text-center animate-fade-in">
                                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                    <CheckCircle className="h-10 w-10 text-green-500" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                                <p className="text-gray-500 mb-6">
                                    Your booking is confirmed. A confirmation email has been sent to {guestData?.email}.
                                </p>
                                {/* Reference No */}
                                <div className="inline-flex items-center gap-3 rounded-xl bg-gray-50 px-5 py-3 mb-6">
                                    <div>
                                        <p className="text-xs text-gray-500">Booking Reference</p>
                                        <p className="text-lg font-bold text-gray-800">{bookingRef}</p>
                                    </div>
                                    <button onClick={copyRef} className="text-gray-400 hover:text-gray-800 transition-colors">
                                        <Copy className="h-4 w-4" />
                                    </button>
                                    {copied && <span className="text-xs text-green-500">Copied!</span>}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button variant="outline" onClick={() => navigate('/user/bookings')}>View My Bookings</Button>
                                    <Button variant="gradient" onClick={() => navigate('/hostels')}>Book Another Hostel</Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    {step < 3 && (
                        <div className="lg:w-72 xl:w-80 shrink-0">
                            <div className="rounded-2xl bg-white border border-gray-200 p-5 sticky top-20">
                                <h3 className="font-bold text-gray-900 mb-4">Order Summary</h3>
                                {bookingItems.map((item) => (
                                    <div key={item.id} className="flex items-center gap-3 mb-3">
                                        <img src={item.hostelImage} alt="" className="h-12 w-12 rounded-lg object-cover shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-medium text-gray-900 truncate">{item.hostelName}</p>
                                            <p className="text-xs text-gray-500">{item.nights} nights · {item.roomType?.name}</p>
                                        </div>
                                        <p className="text-xs font-bold text-gray-900 shrink-0">{formatPrice(item.totalPrice)}</p>
                                    </div>
                                ))}
                                <div className="border-t border-gray-200 pt-3 mt-3 space-y-1.5">
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Taxes</span><span>{formatPrice(taxes)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>Service fee</span><span>{formatPrice(serviceFee)}</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-gray-900 mt-2 pt-2 border-t border-gray-200">
                                        <span>Total</span><span className="text-gray-800">{formatPrice(total)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Checkout
