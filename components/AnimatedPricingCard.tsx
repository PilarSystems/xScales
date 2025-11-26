"use client"
import { motion } from 'framer-motion'

export default function AnimatedPricingCard({ title, price, onStart }: { title: string; price: string; onStart?: () => void }) {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="border rounded p-4 text-center">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-2">{price}</p>
      <button onClick={onStart} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Jetzt starten</button>
    </motion.div>
  )
}
