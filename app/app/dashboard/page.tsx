import React from 'react'
import { getSubscriptionForUser } from '../../../lib/getSubscriptionForUser'
import getCurrentUser from '../../../lib/supabaseServer'

function PlanFeature({ allowed, children }: { allowed: boolean; children: React.ReactNode }) {
  if (allowed) return <>{children}</>
  return (
    <div className="border rounded p-4 opacity-70">
      <div className="font-semibold">Locked feature</div>
      <div className="text-sm mt-2">Upgrade your plan to unlock this feature.</div>
    </div>
  )
}

export default async function Dashboard() {
  const user = await getCurrentUser()
  const profileId = user?.id
  const subscription = profileId ? await getSubscriptionForUser(profileId) : null
  const plan = (subscription?.plan || 'FREE') as string

  // define feature availability by plan
  const features = {
    '24H': true,
    '7D': ['STARTER', 'HUSTLER', 'ELITE'].includes(plan),
    '30D': ['HUSTLER', 'ELITE'].includes(plan),
    '90D': ['ELITE'].includes(plan),
    chatUnlimited: ['HUSTLER', 'ELITE'].includes(plan),
    templateBundles: plan === 'FREE' ? 0 : plan === 'STARTER' ? 1 : plan === 'HUSTLER' ? 2 : 999
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="mt-4 grid md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex gap-2 mb-4">
            <button className={`px-3 py-1 rounded ${features['24H'] ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>24H</button>
            <button className={`px-3 py-1 rounded ${features['7D'] ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>7D</button>
            <button className={`px-3 py-1 rounded ${features['30D'] ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>30D</button>
            <button className={`px-3 py-1 rounded ${features['90D'] ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>90D</button>
          </div>

          <div className="border rounded p-4">
            <h2 className="font-semibold">Selected Plan: {plan}</h2>
            <p className="mt-2 text-sm">Progress bar and tasks</p>
            <div className="w-full bg-gray-200 rounded h-4 mt-4">
              <div className="bg-green-500 h-4 rounded" style={{ width: '40%' }} />
            </div>
            <div className="mt-4">
              <h3 className="font-medium">Tasks</h3>
              <ul className="mt-2 list-disc ml-6 text-sm">
                <li>Task A (done)</li>
                <li>Task B (in progress)</li>
                <li>Task C (todo)</li>
              </ul>
            </div>
          </div>
        </div>

        <aside>
          <div className="border rounded p-4 mb-4">
            <h3 className="font-semibold">Chat with X</h3>
            <p className="text-sm mt-2">{features.chatUnlimited ? 'Unlimited chat' : 'Limited chat per month'}</p>
            <div className="mt-3">
              <PlanFeature allowed={features.chatUnlimited}>
                <button className="px-3 py-2 bg-blue-600 text-white rounded">Open Chat</button>
              </PlanFeature>
              {!features.chatUnlimited && (
                <div className="mt-2 text-xs opacity-80">Free plan: 10 messages / month. Upgrade to increase.</div>
              )}
            </div>
          </div>

          <div className="border rounded p-4">
            <h3 className="font-semibold">Templates</h3>
            <p className="text-sm mt-2">Bundles available: {features.templateBundles}</p>
            <PlanFeature allowed={features.templateBundles > 0}>
              <button className="mt-3 px-3 py-2 bg-indigo-600 text-white rounded">Open Templates</button>
            </PlanFeature>
          </div>
        </aside>
      </div>
    </div>
  )
}
