import { type FormEvent, useState } from 'react'
import { bakery, hours } from '../content/bakery'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [item, setItem] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Demo only: this form has no real backend. A live client build would
    // wire this to the same order-ahead/request pipeline as other WebVybe
    // client sites (see CLAUDE.md / new-client-site skill).
    setSubmitted(true)
  }

  return (
    <div className="page-transition mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-3">Contact</p>
      <h1 className="font-serif text-4xl text-ink">Order for pickup</h1>
      <p className="mt-4 max-w-xl text-oat">
        Tell us what you'd like and when you're coming by — we'll confirm by email or text within one business
        day and have it ready at the counter. For anything urgent, call the bakehouse directly.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
          {submitted ? (
            <div className="flex flex-col items-start gap-3 py-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crust text-flour">✓</span>
              <h2 className="font-serif text-2xl text-ink">Order request received</h2>
              <p className="max-w-sm text-oat">
                Thanks{item ? ` — we'll follow up about ${item.toLowerCase()}` : ''}. We'll reach out within one
                business day to confirm your pickup time.
              </p>
              <p className="max-w-sm text-xs text-oat/70">
                This is a portfolio demo: nothing was actually sent anywhere. A live client build would connect
                this form to a real inbox/order pipeline.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="btn-secondary mt-2"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">First name</span>
                  <input
                    required
                    type="text"
                    name="firstName"
                    className="w-full rounded-lg border border-black/10 bg-flour px-3.5 py-2.5 text-ink outline-none focus:border-wheat-deep"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Last name</span>
                  <input
                    required
                    type="text"
                    name="lastName"
                    className="w-full rounded-lg border border-black/10 bg-flour px-3.5 py-2.5 text-ink outline-none focus:border-wheat-deep"
                  />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    className="w-full rounded-lg border border-black/10 bg-flour px-3.5 py-2.5 text-ink outline-none focus:border-wheat-deep"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full rounded-lg border border-black/10 bg-flour px-3.5 py-2.5 text-ink outline-none focus:border-wheat-deep"
                  />
                </label>
              </div>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">What are you ordering?</span>
                <select
                  name="item"
                  value={item}
                  onChange={(e) => setItem(e.target.value)}
                  className="w-full rounded-lg border border-black/10 bg-flour px-3.5 py-2.5 text-ink outline-none focus:border-wheat-deep"
                >
                  <option value="">Select an item</option>
                  <option>Country Sourdough</option>
                  <option>Butter Croissant (multiple)</option>
                  <option>Brown Butter Maple Pecan Danish</option>
                  <option>Custom Cake / Dessert Order</option>
                  <option>Catering for an Event</option>
                  <option>The Standing Order Subscription</option>
                  <option>Not sure yet</option>
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">Pickup date/time or notes</span>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="e.g. Saturday morning, or headcount/date for catering"
                  className="w-full rounded-lg border border-black/10 bg-flour px-3.5 py-2.5 text-ink outline-none focus:border-wheat-deep"
                />
              </label>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send Request
              </button>
            </form>
          )}
        </div>

        <div className="space-y-8">
          <div>
            <p className="eyebrow mb-2">Call or Email</p>
            <p className="text-oat">
              <a href={bakery.phoneHref} className="hover:text-ink">
                {bakery.phone}
              </a>
            </p>
            <p className="mt-1 text-oat">
              <a href={`mailto:${bakery.email}`} className="hover:text-ink">
                {bakery.email}
              </a>
            </p>
          </div>
          <div>
            <p className="eyebrow mb-2">Address</p>
            <p className="text-oat">{bakery.address}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Hours</p>
            <ul className="space-y-1 text-sm text-oat">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
