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
                default: 'bg-gray-100 text-gray-800',
                primary: 'bg-gray-100 text-gray-900',
                success: 'bg-green-100 text-green-800',
                warning: 'bg-yellow-100 text-yellow-800',
                destructive: 'bg-red-100 text-red-800',
                accent: 'bg-gray-100 text-gray-900',
                outline: 'border border-gray-300 text-gray-700',
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
