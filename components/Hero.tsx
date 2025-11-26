"use client"
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h1 className="text-4xl font-extrabold">xScales</h1>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Product analytics for founders — demo skeleton.</p>
      </motion.div>
    </section>
  )
}
