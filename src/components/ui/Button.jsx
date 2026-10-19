/**
 * Button.jsx - Reusable button component (shadcn/ui style)
 * Uses class-variance-authority for variant management.
 * Lucide React icons can be passed as children.
 */

import { forwardRef } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// Define button variants using class-variance-authority
const buttonVariants = cva(
    // Base styles applied to every button
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
    {
        variants: {
            variant: {
                default: 'border border-gray-200 bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200',
                destructive: 'bg-red-500 text-white shadow hover:bg-red-600',
                outline: 'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-white',
                secondary: 'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200',
                ghost: 'text-gray-700 hover:bg-gray-100',
                link: 'text-gray-800 underline-offset-4 hover:underline',
                gradient: 'border border-gray-200 bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-8 px-3 text-xs',
                lg: 'h-12 px-6 text-base',
                xl: 'h-14 px-8 text-lg',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

/**
 * Button component with multiple variants and sizes.
 * This is a shadcn/ui component built with Radix UI primitives.
 * @param {string} variant - 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'gradient'
 * @param {string} size - 'default' | 'sm' | 'lg' | 'xl' | 'icon'
 * @param {boolean} loading - Shows a spinner when true
 */
const Button = forwardRef(({ className, variant, size, loading, children, ...props }, ref) => {
    return (
        <button
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </button>
    )
})
Button.displayName = 'Button'

export { Button, buttonVariants }
export default Button
