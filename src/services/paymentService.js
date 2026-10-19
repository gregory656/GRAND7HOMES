/**
 * paymentService.js - Payment processing operations
 * Handles Stripe, PayPal, and M-Pesa payment flows.
 * NOTE: STRIPE API KEYS TO BE ADDED HERE when available (see .env.example)
 * NOTE: PAYPAL CLIENT ID TO BE ADDED HERE when available (see .env.example)
 */

import api from '../lib/api'

/**
 * Create a Stripe Payment Intent
 * REST API: POST /api/payments/create-intent
 * This will be activated when VITE_STRIPE_PUBLIC_KEY is configured.
 * @param {number} amount - Amount in KES (smallest currency unit)
 * @param {string} currency - Currency code (default: 'KES')
 */
export async function createPaymentIntent(amount, currency = 'kes') {
    // This is a REST API call - Stripe integration pending API key setup
    const response = await api.post('/payments/create-intent', { amount, currency })
    return response.data
}

/**
 * Confirm a Stripe payment
 * REST API: POST /api/payments/confirm
 * @param {string} paymentIntentId
 * @param {string} paymentMethodId
 */
export async function confirmPayment(paymentIntentId, paymentMethodId) {
    const response = await api.post('/payments/confirm', {
        paymentIntentId,
        paymentMethodId,
    })
    return response.data
}

/**
 * Process PayPal payment
 * REST API: POST /api/payments/paypal
 * This will be activated when VITE_PAYPAL_CLIENT_ID is configured.
 * @param {string} orderId - PayPal order ID
 */
export async function processPayPalPayment(orderId) {
    const response = await api.post('/payments/paypal', { orderId })
    return response.data
}

/**
 * Simulate payment processing for development
 * Returns a success response after a short delay.
 * Replace this with actual payment calls when API keys are available.
 * @param {object} paymentData - { method, amount, cardDetails? }
 */
export async function simulatePayment(paymentData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                transactionId: 'TXN-' + Date.now(),
                method: paymentData.method,
                amount: paymentData.amount,
                timestamp: new Date().toISOString(),
            })
        }, 2000) // Simulate 2s processing time
    })
}
