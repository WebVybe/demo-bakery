import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
import { bakery, hours } from '../content/bakery'
import bakerOven from '../assets/images/baker-oven.jpg' // Pexels: Yasin Onus, free commercial license

export default function About() {
  return (
    <div className="page-transition">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="eyebrow mb-3">Our Story</p>
            <h1 className="font-serif text-4xl text-ink">Why {bakery.name} exists</h1>
            <p className="mt-5 text-oat">
              {bakery.founderName} started {bakery.name} in {bakery.founded} baking sourdough in a home oven for
              neighbors on Fern St, after years running pastry programs in restaurant kitchens where bread was
              always the thing there wasn't enough time for. The starter that feeds every loaf here is the same
              one from that first home batch.
            </p>
            <p className="mt-4 text-oat">
              The model is still simple: bake a short, well-made menu instead of a long, mediocre one, sell it
              until it's gone, and start again before sunrise. South Park was never a business-plan decision, and
              {` ${bakery.founderName.split(' ')[0]}`} has lived in the neighborhood since before the ovens were
              installed.
            </p>
            <p className="mt-6 font-serif text-lg text-crust">{bakery.founderName}, founder</p>
          </div>
          <DecorPanel
            className="h-72 w-full sm:h-96"
            src={bakerOven}
            alt="Baker removing a fresh loaf of bread from a traditional oven"
          />
        </div>
      </section>

      <section className="border-y border-black/5 bg-linen">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Visit</p>
            <p className="text-oat">{bakery.address}</p>
            <p className="mt-2 text-oat">
              <a href={bakery.phoneHref} className="hover:text-ink">
                {bakery.phone}
              </a>
            </p>
            <p className="mt-1 text-oat">
              <a href={`mailto:${bakery.email}`} className="hover:text-ink">
                {bakery.email}
              </a>
            </p>
            <p className="mt-4 text-sm text-oat">
              Free street parking along Fern St, a short walk from the Beech St shops in South Park.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3">Hours</p>
            <ul className="space-y-1 text-oat">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4 border-b border-black/5 py-1.5 text-sm last:border-0">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h2 className="font-serif text-3xl text-ink">Come smell the ovens for yourself</h2>
        <NavLink to="/contact" className="btn-primary mt-6 inline-flex">
          Order for Pickup
        </NavLink>
      </section>
    </div>
  )
}
