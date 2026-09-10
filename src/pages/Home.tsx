import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
import { bakery, faqs, menuCategories, standingOrder } from '../content/bakery'

const highlights = menuCategories.slice(0, 3).map((c, i) => ({
  id: c.id,
  title: c.title,
  blurb: c.intro,
  from: c.items[0].price,
  variant: ((i % 5) + 1) as 1 | 2 | 3 | 4 | 5,
}))

export default function Home() {
  return (
    <div className="page-transition">
      {/* Hero — one dominant photo, one short headline, one primary CTA.
          No competing headline/graphic-panel split, no second matched button. */}
      <section className="relative">
        <DecorPanel
          variant={1}
          rounded={false}
          className="h-[68vh] min-h-[420px] w-full sm:h-[82vh]"
          label="Bakehouse glimpse — placeholder art, real photography pending"
        />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-crust-deep/80 via-crust-deep/15 to-transparent">
          <div className="mx-auto w-full max-w-6xl px-6 pb-12 sm:pb-16">
            <p className="eyebrow mb-3 text-linen">{bakery.neighborhood}</p>
            <h1 className="max-w-2xl font-serif text-4xl leading-[1.1] text-flour sm:text-5xl lg:text-[3.4rem]">
              {bakery.tagline}
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-5">
              <NavLink to="/contact" className="btn-primary">
                Order for Pickup
              </NavLink>
              <NavLink
                to="/menu"
                className="text-sm font-semibold text-flour underline decoration-flour/40 underline-offset-4 transition-colors hover:decoration-flour"
              >
                See Menu
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* This Week's Feature — its own prominent module, not a badge
          buried inside the hero. */}
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-14">
          <DecorPanel variant={4} className="h-72 w-full sm:h-96" label="This week's feature — placeholder art" />
          <div>
            <span className="badge">This Week's Feature</span>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">{bakery.featureItem.name}</h2>
            <p className="mt-4 max-w-md text-base text-oat">
              {bakery.featureItem.blurb.replace(/^This week's feature — /, '')}
            </p>
            <p className="mt-3 max-w-md text-sm text-oat">
              {bakery.featureItem.cadence} Laminated, shaped, and baked before sunrise, same as everything else on
              the case.
            </p>
            <NavLink to="/menu#pastries" className="mt-6 inline-block text-sm font-semibold text-wheat-deep hover:underline">
              See it on the menu →
            </NavLink>
          </div>
        </div>
      </section>

      {/* Menu highlights — image-first tiles, no card border/background
          chrome. The photo is the primary surface; the "order ahead"
          message lives here as a short caption instead of an isolated
          trust-bar section. */}
      <section className="mx-auto max-w-6xl px-6 py-4 sm:py-8">
        <div className="mb-10 flex flex-col gap-2 border-t border-black/5 pt-16 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow mb-3">What we bake</p>
            <h2 className="font-serif text-3xl text-ink">Three cases, one oven</h2>
            <p className="mt-3 max-w-md text-sm text-oat">
              Weekend favorites sell out by mid-morning — order ahead through the contact form and we'll hold it
              for you.
            </p>
          </div>
          <NavLink to="/menu" className="text-sm font-semibold text-wheat-deep hover:underline">
            View full menu & pricing →
          </NavLink>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {highlights.map((h) => (
            <NavLink key={h.id} to={`/menu#${h.id}`} className="group block">
              <DecorPanel variant={h.variant} className="h-56 w-full transition-transform duration-300 group-hover:scale-[1.02] sm:h-64" />
              <h3 className="mt-4 font-serif text-xl text-ink">{h.title}</h3>
              <p className="mt-1 text-sm text-oat">{h.blurb}</p>
              <p className="mt-2 text-sm font-semibold text-wheat-deep">From {h.from}</p>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Standing Order — full-bleed image band, breaking the metronome
          of identical max-w-6xl centered blocks. */}
      <section className="relative isolate mt-20 overflow-hidden border-y border-black/5">
        <DecorPanel variant={2} rounded={false} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-crust/82" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
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

      {/* Custom orders & catering — genuinely text-first content, so the
          bordered-white-card idiom stays here. */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <p className="eyebrow mb-3">Beyond the case</p>
        <h2 className="mb-3 font-serif text-3xl text-ink">Custom cakes &amp; catering</h2>
        <p className="mb-10 max-w-xl text-sm text-oat">{bakery.customOrderNotice}</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h3 className="font-serif text-xl text-ink">Custom Cakes &amp; Desserts</h3>
            <p className="mt-2 text-sm text-oat">
              Birthdays, showers, small celebrations — tell us the occasion, serving size, and date. One week's
              notice for a spot on the schedule.
            </p>
            <NavLink to="/contact" className="mt-4 inline-block text-sm font-semibold text-wheat-deep hover:underline">
              Start a custom order →
            </NavLink>
          </div>
          <div className="rounded-2xl border border-black/5 bg-white p-6">
            <h3 className="font-serif text-xl text-ink">Catering for Events</h3>
            <p className="mt-2 text-sm text-oat">
              Pastry boxes, bread baskets, and coffee service for offices and small gatherings. Send headcount and
              date to <a href={`mailto:${bakery.cateringEmail}`} className="font-medium text-crust hover:underline">{bakery.cateringEmail}</a> for a quote.
            </p>
            <NavLink to="/contact" className="mt-4 inline-block text-sm font-semibold text-wheat-deep hover:underline">
              Or use the contact form →
            </NavLink>
          </div>
        </div>
      </section>

      {/* FAQ preview — also text-first, keeps the bordered-card idiom. */}
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
