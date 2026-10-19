/**
 * Badge.jsx - Status badge / pill component
 * Used for displaying booking status, hostel categories, amenity tags, etc.
 */

import { cva } from 'class-variance-authority'
import { cn } from '../../lib/utils'

// Badge variants using class-variance-authority
const badgeVariants = cva(
    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
    {
        variants: {
            variant: {
                default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
                primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
                success: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
                warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
                destructive: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300',
                accent: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
                outline: 'border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300',
            },
        },
        defaultVariants: { variant: 'default' },
    }
)

/**
 * Badge component for status indicators and tags.
 * @param {string} variant - 'default' | 'primary' | 'success' | 'warning' | 'destructive' | 'accent' | 'outline'
 */
function Badge({ className, variant, ...props }) {
    return (
        <span className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
export default Badge
