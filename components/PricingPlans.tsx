"use client"
import { useState } from 'react'

import AnimatedPricingCard from './AnimatedPricingCard'

const PRICES: { key: string; label: string; price: string }[] = [
  { key: 'FREE', label: 'Free', price: '0€' },
  { key: 'STARTER', label: 'Starter', price: '9,99€' },
  { key: 'HUSTLER', label: 'Hustler', price: '19,99€' },
  { key: 'ELITE', label: 'Elite', price: '29,99€' }
]

export default function PricingPlans({ profileId }: { profileId?: string }) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout(planKey: string) {
    setLoading(true)
    try {
      const envKey = `NEXT_PUBLIC_PRICE_${planKey}`
      // @ts-ignore: process.env typing in client
      const priceId = (process.env as any)[envKey] || null
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId, profileId })
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else alert(data.error || 'Checkout error')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  function onStart(pKey: string) {
    return () => handleCheckout(pKey)
  }

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {PRICES.map((p) => (
        <AnimatedPricingCard key={p.key} title={p.label} price={p.price} onStart={onStart(p.key)} />
      ))}
    </div>
  )
}
