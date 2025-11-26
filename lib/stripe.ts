import Stripe from 'stripe'

const secret = process.env.STRIPE_SECRET_KEY || ''
export const stripe = new Stripe(secret, { apiVersion: '2022-11-15' })

export default stripe
