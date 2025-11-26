import dynamic from 'next/dynamic'

const PricingPlans = dynamic(() => import('../../components/PricingPlans'), { ssr: false })

export default function HomePage({ params }: { params: { lng: string } }) {
  const lng = params.lng || 'en'

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="py-12">
        <div>
          <h1 className="text-4xl font-extrabold">xScales</h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Dummy hero content ({lng})</p>
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold">Features</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Placeholder features section</p>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold">Pricing</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Choose a plan to get started</p>
        <div className="mt-6">
          {/* client-only pricing component handles checkout */}
          {/* @ts-ignore */}
          <PricingPlans />
        </div>
      </section>

      <section className="py-12">
        <h2 className="text-2xl font-bold">FAQ</h2>
        <p className="mt-2 text-slate-600 dark:text-slate-300">Placeholder FAQ</p>
      </section>

      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold">Call To Action</h2>
        <p className="mt-2">Get started with xScales — dummy CTA</p>
      </section>
    </div>
  )
}
