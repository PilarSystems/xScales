// Simple script to create Stripe products/prices in test mode.
// Requires STRIPE_SECRET_KEY in environment.

const Stripe = require('stripe')
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' })

async function run() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('STRIPE_SECRET_KEY not found in env; aborting')
    process.exit(1)
  }

  const plans = [
    { key: 'STARTER', nickname: 'STARTER', unit_amount: 999, currency: 'eur' },
    { key: 'HUSTLER', nickname: 'HUSTLER', unit_amount: 1999, currency: 'eur' },
    { key: 'ELITE', nickname: 'ELITE', unit_amount: 2999, currency: 'eur' }
  ]

  for (const p of plans) {
    console.log(`Creating product ${p.nickname}...`)
    const product = await stripe.products.create({ name: `xScales ${p.nickname}` })
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: p.unit_amount,
      currency: p.currency,
      recurring: { interval: 'month' },
      nickname: p.nickname
    })
    console.log(`${p.key} -> product=${product.id} price=${price.id}`)
  }
}

run().catch((err) => { console.error(err); process.exit(1) })
