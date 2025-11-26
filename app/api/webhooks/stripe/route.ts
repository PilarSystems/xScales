import { NextResponse } from 'next/server'
import { stripe } from '../../../../lib/stripe'
import { getSupabaseAdmin } from '../../../../lib/supabaseAdmin'

export async function POST(req: Request) {
  const payload = await req.text()
  const sig = req.headers.get('stripe-signature') || ''
  const secret = process.env.STRIPE_WEBHOOK_SECRET || ''

  let event
  try {
    event = stripe.webhooks.constructEvent(payload, sig, secret)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        // optional: handle immediate post-checkout actions
        break
      }
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const sub = event.data.object as any
        const stripeSubscriptionId = sub.id
        const stripeCustomerId = sub.customer
        const plan = sub.items?.data?.[0]?.price?.nickname || sub.items?.data?.[0]?.price?.id
        const status = sub.status
        const periodEnd = new Date(sub.current_period_end * 1000).toISOString()

        const supabaseAdmin = getSupabaseAdmin()
        const { data: profiles } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('stripe_customer_id', stripeCustomerId)
          .limit(1)

        const profileId = (profiles as any)?.[0]?.id || null

        await supabaseAdmin.from('subscriptions').upsert({
          stripe_subscription_id: stripeSubscriptionId,
          stripe_customer_id: stripeCustomerId,
          profile_id: profileId,
          plan: plan,
          status: status,
          current_period_end: periodEnd
        }, { onConflict: 'stripe_subscription_id' })

        break
      }
      default:
        break
    }
  } catch (err: any) {
    console.error('Webhook processing error', err.message)
    return new Response('Webhook processing error', { status: 500 })
  }

  return NextResponse.json({ received: true })
}
