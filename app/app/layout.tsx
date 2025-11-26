import React from 'react'
import Navbar from '../../components/Navbar'
import ThemeToggle from '../../components/ThemeToggle'
import { redirect } from 'next/navigation'
import getCurrentUser from '../../lib/supabaseServer'
import { getSubscriptionForUser } from '../../lib/getSubscriptionForUser'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  // Ensure the user is present server-side; middleware should also handle redirect
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }

  const profileId = user?.id
  const subscription = profileId ? await getSubscriptionForUser(profileId) : null
  const plan = (subscription?.plan || 'FREE') as string

  return (
    <html>
      <body>
        <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
          <header className="border-b">
            <div className="container mx-auto px-4 flex items-center justify-between py-3">
              <div className="flex items-center gap-4">
                <a className="font-bold text-lg">xScales</a>
                <div className="text-sm opacity-80">Plan: {plan}</div>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle />
              </div>
            </div>
          </header>

          <div className="container mx-auto px-4 py-6">
            <div className="grid md:grid-cols-4 gap-6">
              <aside className="col-span-1 border rounded p-4">
                <nav className="flex flex-col gap-2 text-sm">
                  <a href="/app/dashboard" className="font-medium">Dashboard</a>
                  <a href="/app/onboarding" className="font-medium">Onboarding</a>
                  <a href="/">Back to site</a>
                </nav>
                <div className="mt-4 text-xs opacity-80">Current plan: {plan}</div>
              </aside>

              <main className="col-span-3">
                {/* Pass plan info to children via data attribute for client components */}
                <div data-plan={plan}>{children}</div>
              </main>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
