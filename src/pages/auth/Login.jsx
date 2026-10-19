/**
 * Login.jsx - User login page
 * This uses Zod for form validation and React Hook Form
 */

import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Hotel, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import { useAuth } from '../../contexts/AuthContext'

// This uses Zod for form validation
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
})

function Login() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [showPassword, setShowPassword] = useState(false)
    const [apiError, setApiError] = useState('')

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: '', password: '', rememberMe: false },
    })

    const onSubmit = async (data) => {
        setApiError('')
        try {
            await login(data.email, data.password)
            const redirect = searchParams.get('redirect') || '/'
            navigate(redirect)
        } catch (err) {
            setApiError(err.message || 'Invalid email or password. Please try again.')
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary">
                            <Hotel className="h-6 w-6 text-gray-700" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                            Grand<span className="text-gradient">7</span>Homes
                        </span>
                    </Link>
                    <h1 className="mt-6 text-2xl font-bold text-gray-900">Welcome back</h1>
                    <p className="mt-1 text-sm text-gray-500">Sign in to your account to continue</p>
                </div>

                {/* Card */}
                <div className="rounded-2xl bg-white border border-gray-200 shadow-xl p-8">
                    {apiError && (
                        <div className="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                            {apiError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <Input
                            label="Email address"
                            type="email"
                            placeholder="you@example.com"
                            leftIcon={<Mail className="h-4 w-4" />}
                            error={errors.email?.message}
                            {...register('email')}
                        />
                        <div className="space-y-1.5">
                            <Input
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="••••••••"
                                leftIcon={<Lock className="h-4 w-4" />}
                                error={errors.password?.message}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                {showPassword ? 'Hide' : 'Show'} password
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" {...register('rememberMe')} className="rounded text-gray-800" />
                                <span className="text-sm text-gray-600">Remember me</span>
                            </label>
                            <Link to="/forgot-password" className="text-sm text-gray-800 hover:underline">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" className="w-full" size="lg" variant="gradient" loading={isSubmitting}>
                            {isSubmitting ? 'Signing in…' : 'Sign In'}
                        </Button>
                    </form>

                    {/* Demo hint */}
                    <div className="mt-4 rounded-lg bg-gray-50 px-4 py-2.5 text-xs text-gray-800 text-center">
                        💡 Demo: Use any email/password — type <strong>admin@</strong> in email for admin access
                    </div>

                    <div className="my-5 flex items-center gap-3">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400">Or continue with</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        {['Google', 'Facebook'].map((provider) => (
                            <button key={provider}
                                className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 hover:bg-white transition-colors">
                                {provider === 'Google' ? '🔴' : '🔵'} {provider}
                            </button>
                        ))}
                    </div>

                    <p className="mt-6 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-medium text-gray-800 hover:underline">
                            Sign up free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
