/**
 * ForgotPassword.jsx - Forgot password page
 * This uses Zod for form validation
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Hotel, Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'

const schema = z.object({ email: z.string().email('Please enter a valid email address') })

function ForgotPassword() {
    const [submitted, setSubmitted] = useState(false)
    const [submittedEmail, setSubmittedEmail] = useState('')

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) })

    const onSubmit = async ({ email }) => {
        // Simulate sending reset email (REST API call to POST /api/auth/forgot-password)
        await new Promise((r) => setTimeout(r, 1000))
        setSubmittedEmail(email)
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                            <Hotel className="h-6 w-6 text-gray-700" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Grand<span className="text-gradient">7</span>Homes</span>
                    </Link>
                </div>

                <div className="rounded-2xl bg-white border border-gray-200 shadow-xl p-8">
                    {submitted ? (
                        <div className="text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Check your email</h2>
                            <p className="text-sm text-gray-500 mb-6">
                                We've sent a password reset link to <strong>{submittedEmail}</strong>. Check your inbox and follow the instructions.
                            </p>
                            <Link to="/login"><Button variant="outline" className="w-full"><ArrowLeft className="h-4 w-4" />Back to Login</Button></Link>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-xl font-bold text-gray-900 mb-1">Forgot your password?</h1>
                            <p className="text-sm text-gray-500 mb-6">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <Input label="Email address" type="email" placeholder="you@example.com" leftIcon={<Mail className="h-4 w-4" />} error={errors.email?.message} {...register('email')} />
                                <Button type="submit" className="w-full" size="lg" variant="gradient" loading={isSubmitting}>
                                    {isSubmitting ? 'Sending…' : 'Send Reset Link'}
                                </Button>
                            </form>
                            <Link to="/login" className="mt-5 flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
                                <ArrowLeft className="h-4 w-4" />Back to Login
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword
