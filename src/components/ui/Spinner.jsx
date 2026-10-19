/**
 * Spinner.jsx - Loading spinner component
 * Used across the app for loading states.
 */

import { cn } from '../../lib/utils'

/**
 * Animated loading spinner component.
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} className - Additional CSS classes
 */
function Spinner({ size = 'md', className }) {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    }

    return (
        <svg
            className={cn('animate-spin text-gray-800', sizeClasses[size], className)}
            viewBox="0 0 24 24"
            fill="none"
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
        </svg>
    )
}

/**
 * Full-page loading overlay with spinner.
 */
function PageLoader() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
                <Spinner size="lg" />
                <p className="text-sm text-gray-500">Loading...</p>
            </div>
        </div>
    )
}

/**
 * Inline loading state for sections.
 */
function SectionLoader() {
    return (
        <div className="flex h-48 w-full items-center justify-center">
            <Spinner size="md" />
        </div>
    )
}

export { Spinner, PageLoader, SectionLoader }
export default Spinner
