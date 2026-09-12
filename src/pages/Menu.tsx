import { NavLink } from 'react-router-dom'
import { bakery, menuCategories, standingOrder } from '../content/bakery'

export default function Menu() {
  return (
    <div className="page-transition mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-3">Menu & Pricing</p>
      <h1 className="font-serif text-4xl text-ink">What's in the case</h1>
      <p className="mt-4 max-w-xl text-oat">
        The case changes slightly day to day depending on what came out of the oven. Prices below are typical, so
        ask in the contact form if you want to reserve something specific for pickup.
      </p>

      <div className="mt-12 space-y-16">
        {menuCategories.map((cat) => (
          <div key={cat.id} id={cat.id}>
            <h2 className="font-serif text-2xl text-crust">{cat.title}</h2>
            <p className="mt-2 max-w-2xl text-sm text-oat">{cat.intro}</p>

            <div className="mt-6 divide-y divide-black/5 rounded-2xl border border-black/5 bg-white">
              {cat.items.map((item) => (
                <div key={item.name} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <div>
                    <p className="flex flex-wrap items-center gap-2 font-medium text-ink">
                      {item.name}
                      {item.badge && <span className="badge">{item.badge}</span>}
                    </p>
                    <p className="mt-1 text-sm text-oat">{item.description}</p>
                  </div>
                  <p className="shrink-0 font-serif text-lg text-wheat-deep">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-3xl bg-crust px-8 py-10 text-center">
        <p className="eyebrow mb-2 text-linen">Weekly bread subscription</p>
        <h2 className="font-serif text-2xl text-flour">
          {standingOrder.name}: {standingOrder.price}, cancel anytime
        </h2>
        <ul className="mx-auto mt-4 max-w-lg space-y-1 text-sm text-linen/90">
          {standingOrder.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        <NavLink to="/contact" className="btn-primary mt-6 inline-flex !bg-wheat !text-crust-deep hover:!bg-wheat-deep">
          Ask About the Standing Order
        </NavLink>
      </div>

      <div className="mt-10 rounded-2xl border border-black/5 bg-linen px-6 py-6 text-center">
        <p className="font-medium text-ink">Custom cakes &amp; catering</p>
        <p className="mx-auto mt-2 max-w-lg text-sm text-oat">{bakery.customOrderNotice}</p>
        <p className="mt-2 text-sm text-oat">
          Catering inquiries:{' '}
          <a href={`mailto:${bakery.cateringEmail}`} className="font-medium text-crust hover:underline">
            {bakery.cateringEmail}
          </a>
        </p>
      </div>

      <div className="mt-12 text-center">
        <NavLink to="/contact" className="btn-primary inline-flex">
          Order for Pickup
        </NavLink>
      </div>
    </div>
  )
}
