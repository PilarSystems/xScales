"use client"
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <header className="border-b py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold">xScales</Link>
          <nav className="hidden md:flex gap-4 text-sm">
            <Link href="/">Home</Link>
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/login">Login</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {mounted && <ThemeToggle />}
          <div className="text-sm">
            <Link href="/en" className="mx-1">EN</Link>
            <Link href="/de" className="mx-1">DE</Link>
          </div>
        </div>
      </div>
    </header>
  )
}
