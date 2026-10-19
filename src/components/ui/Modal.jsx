/**
 * Modal.jsx - Reusable modal/dialog component
 * Uses a portal-style overlay with smooth animations.
 * Closes on backdrop click or Escape key.
 */

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'
import Button from './Button'

/**
 * Modal component with backdrop, header, and close button.
 * @param {boolean} isOpen - Whether the modal is visible
 * @param {function} onClose - Callback when modal closes
 * @param {string} title - Modal title text
 * @param {string} size - 'sm' | 'md' | 'lg' | 'xl' | 'full'
 * @param {React.ReactNode} children - Modal body content
 */
function Modal({ isOpen, onClose, title, size = 'md', children, className }) {
    // Close on Escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) onClose()
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [isOpen, onClose])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''
        return () => { document.body.style.overflow = '' }
    }, [isOpen])

    if (!isOpen) return null

    const sizeClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-2xl',
        full: 'max-w-5xl',
    }

    return (
        // Backdrop
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />

            {/* Modal panel */}
            <div
                className={cn(
                    'relative w-full rounded-2xl bg-white shadow-2xl animate-fade-in',
                    sizeClasses[size],
                    className
                )}
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                {/* Header */}
                {title && (
                    <div className="flex items-center justify-between border-b border-gray-200 p-6">
                        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
                        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close modal">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                )}

                {/* Body */}
                <div className="overflow-y-auto max-h-[80vh]">{children}</div>
            </div>
        </div>
    )
}

export { Modal }
export default Modal
