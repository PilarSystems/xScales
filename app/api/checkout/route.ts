import { NextResponse } from 'next/server'
import { stripe } from '../../../lib/stripe'
import { getSupabaseAdmin } from '../../../lib/supabaseAdmin'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { priceId, successUrl, cancelUrl, profileId } = body

    if (!priceId) return NextResponse.json({ error: 'Missing priceId' }, { status: 400 })

    // create or fetch customer in Stripe using profile metadata
    let customerId: string | null = null
    if (profileId) {
      const supabaseAdmin = getSupabaseAdmin()
      // try to find existing customer
      const { data } = await supabaseAdmin
        .from('profiles')
        .select('email')
        .eq('id', profileId)
        .limit(1)
        .single()

      const email = (data as any)?.email || undefined
      // create customer
      const customer = await stripe.customers.create({ email })
      customerId = customer.id
      // store stripe_customer_id on profile (best-effort)
      if (customerId) {
        await supabaseAdmin.from('profiles').update({ stripe_customer_id: customerId }).eq('id', profileId)
      }
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer: customerId || undefined,
      success_url: successUrl || `${process.env.NEXT_PUBLIC_APP_URL}/app`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/pricing`
    })

    return NextResponse.json({ url: session.url })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
