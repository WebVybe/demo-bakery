import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
import { bakery, faqs, menuCategories, standingOrder } from '../content/bakery'

const highlights = menuCategories.slice(0, 3).map((c) => ({
  id: c.id,
  title: c.title,
  blurb: c.intro,
  from: c.items[0].price,
}))

const pillars = [
  {
    title: "This week's feature",
    body: `${bakery.featureItem.name} — ${bakery.featureItem.blurb.replace(/^This week's feature — /, '')}`,
  },
  {
    title: 'Order ahead, skip the line',
    body: 'Popular items sell out by mid-morning on weekends. Order for pickup through the contact form and we hold it for you.',
  },
  {
    title: 'Baked before sunrise',
    body: 'Everything on the case is laminated, shaped, or leavened the same morning — nothing frozen, nothing shipped in.',
  },
]

export default function Home() {
  return (
    <div className="page-transition">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-4">{bakery.neighborhood}</p>
            <h1 className="font-serif text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
              {bakery.tagline}
            </h1>
            <p className="mt-5 max-w-md text-base text-oat">
              A small-batch neighborhood bakery and coffee bar — naturally leavened bread, laminated pastry, and
              coffee from a local roaster, every single morning.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3">
              <span className="badge">This Week</span>
              <span className="text-sm font-semibold text-ink">{bakery.featureItem.name}</span>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavLink to="/contact" className="btn-primary">
                Order for Pickup
              </NavLink>
              <NavLink to="/menu" className="btn-secondary">
                See Menu & Pricing
              </NavLink>
            </div>
          </div>

          <DecorPanel variant={1} className="h-72 w-full sm:h-96 lg:h-[26rem]" label="Bakehouse glimpse — placeholder art, real photography pending" />
        </div>
      </section>

      {/* Objection-handling strip */}
      <section className="border-y border-black/5 bg-linen">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 sm:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title}>
              <p className="font-serif text-lg text-crust">{p.title}</p>
              <p className="mt-2 text-sm text-oat">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Menu highlights */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">What we bake</p>
            <h2 className="font-serif text-3xl text-ink">Three cases, one oven</h2>
          </div>
          <NavLink to="/menu" className="text-sm font-semibold text-wheat-deep hover:underline">
            View full menu & pricing →
          </NavLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <div key={h.id} className="rounded-2xl border border-black/5 bg-white p-6">
              <DecorPanel variant={((i % 5) + 1) as 1 | 2 | 3 | 4 | 5} className="mb-5 h-36 w-full" />
              <h3 className="font-serif text-xl text-ink">{h.title}</h3>
              <p className="mt-2 text-sm text-oat">{h.blurb}</p>
              <p className="mt-4 text-sm font-semibold text-wheat-deep">From {h.from}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Standing Order */}
      <section className="border-y border-black/5 bg-crust">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3 text-linen">Weekly bread subscription</p>
            <h2 className="font-serif text-3xl text-flour">
              {standingOrder.name} — {standingOrder.price}
            </h2>
            <p className="mt-4 max-w-md text-sm text-linen/90">
              Built for regulars who don't want to think about it. Two loaves, set aside every week, ready
              Saturday morning.
            </p>
            <NavLink to="/contact" className="btn-primary mt-6 !bg-wheat !text-crust-deep hover:!bg-wheat-deep">
              Ask About the Standing Order
            </NavLink>
          </div>
          <ul className="space-y-3">
            {standingOrder.bullets.map((b) => (
              <li key={b} className="flex gap-3 rounded-xl bg-white/5 p-4 text-sm text-linen/95">
                <span className="mt-0.5 text-wheat">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ preview */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow mb-3">Good to know</p>
        <h2 className="mb-8 font-serif text-3xl text-ink">A few things first-timers ask</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {faqs.slice(0, 4).map((f) => (
            <div key={f.q} className="rounded-2xl border border-black/5 bg-white p-6">
              <p className="font-medium text-ink">{f.q}</p>
              <p className="mt-2 text-sm text-oat">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="rounded-3xl bg-linen px-8 py-14 text-center">
          <h2 className="font-serif text-3xl text-ink">Hungry? We open at 7am.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-oat">
            Open Tuesday through Sunday. Order ahead for pickup or just walk in — either way, tell us what
            sounds good.
          </p>
          <NavLink to="/contact" className="btn-primary mt-7 inline-flex">
            Order for Pickup
          </NavLink>
        </div>
      </section>
    </div>
  )
}
