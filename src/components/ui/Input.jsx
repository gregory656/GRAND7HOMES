/**
 * Input.jsx - Reusable input component (shadcn/ui style)
 * Supports error state, icons, and label.
 */

import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

/**
 * Input component with label, error display, and optional left icon.
 * This is a shadcn/ui component built with Radix UI primitives.
 * @param {string} label - Input label text
 * @param {string} error - Error message to display
 * @param {React.ReactNode} leftIcon - Icon component to show on the left
 */
const Input = forwardRef(({ className, type = 'text', label, error, leftIcon, ...props }, ref) => {
    return (
        <div className="w-full space-y-1.5">
            {label && (
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
            <div className="relative">
                {leftIcon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {leftIcon}
                    </div>
                )}
                <input
                    type={type}
                    ref={ref}
                    className={cn(
                        'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400',
                        'border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20',
                        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'transition-colors duration-200',
                        leftIcon && 'pl-10',
                        error && 'border-red-400 focus:border-red-400 focus:ring-red-400/20',
                        className
                    )}
                    {...props}
                />
            </div>
            {error && (
                <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
            )}
        </div>
    )
})
Input.displayName = 'Input'

export { Input }
export default Input
