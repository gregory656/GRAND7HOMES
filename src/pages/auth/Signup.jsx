/**
 * Signup.jsx - User registration page
 * This uses Zod for form validation and React Hook Form
 */

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Hotel, Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../contexts/AuthContext'

// This uses Zod for form validation with password match validation
const signupSchema = z
    .object({
        name: z.string().min(3, 'Full name must be at least 3 characters'),
        email: z.string().email('Please enter a valid email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
        terms: z.boolean().refine((v) => v === true, 'You must accept the terms'),
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    })

function Signup() {
    const { register: registerUser } = useAuth()
    const navigate = useNavigate()
    const [showPwd, setShowPwd] = useState(false)
    const [apiError, setApiError] = useState('')

    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(signupSchema),
    })

    const password = watch('password', '')
    const strength = password.length === 0 ? 0 : password.length < 8 ? 1 : password.length < 12 && !/[!@#$%^&*]/.test(password) ? 2 : 3
    const strengthLabels = ['', 'Weak', 'Good', 'Strong']
    const strengthColors = ['', 'bg-red-400', 'bg-yellow-400', 'bg-green-500']

    const onSubmit = async (data) => {
        setApiError('')
        try {
            await registerUser({ name: data.name, email: data.email, password: data.password })
            navigate('/user/dashboard')
        } catch (err) {
            setApiError(err.message || 'Registration failed. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                            <Hotel className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                            Grand<span className="text-gradient">7</span>Homes
                        </span>
                    </Link>
                    <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">Create your account</h1>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start booking amazing hostels in Kenya</p>
                </div>

                <div className="rounded-2xl bg-white border border-gray-200 shadow-xl p-8 dark:bg-gray-800 dark:border-gray-700">
                    {apiError && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input label="Full Name" placeholder="John Doe" leftIcon={<User className="h-4 w-4" />} error={errors.name?.message} {...register('name')} />
                        <Input label="Email address" type="email" placeholder="you@example.com" leftIcon={<Mail className="h-4 w-4" />} error={errors.email?.message} {...register('email')} />

                        <div className="space-y-1.5">
                            <Input
                                label="Password"
                                type={showPwd ? 'text' : 'password'}
                                placeholder="Min. 8 characters"
                                leftIcon={<Lock className="h-4 w-4" />}
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            {/* Password strength indicator */}
                            {password.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1 flex-1">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : 'bg-gray-200 dark:bg-gray-700'}`} />
                                        ))}
                                    </div>
                                    <span className={`text-xs font-medium ${strength === 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : 'text-green-500'}`}>
                                        {strengthLabels[strength]}
                                    </span>
                                </div>
                            )}
                            <button type="button" onClick={() => setShowPwd(!showPwd)} className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition-colors">
                                {showPwd ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                {showPwd ? 'Hide' : 'Show'} password
                            </button>
                        </div>

                        <Input label="Confirm Password" type="password" placeholder="Re-enter password" leftIcon={<Lock className="h-4 w-4" />} error={errors.confirmPassword?.message} {...register('confirmPassword')} />

                        <label className="flex items-start gap-2 cursor-pointer">
                            <input type="checkbox" className="mt-0.5 rounded text-blue-600" {...register('terms')} />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                I agree to the{' '}
                                <Link to="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</Link>
                                {' '}and{' '}
                                <Link to="#" className="text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</Link>
                            </span>
                        </label>
                        {errors.terms && <p className="text-xs text-red-500">{errors.terms.message}</p>}

                        <Button type="submit" className="w-full" size="lg" variant="gradient" loading={isSubmitting}>
                            {isSubmitting ? 'Creating account…' : 'Create Account'}
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 dark:text-blue-400 hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Signup
