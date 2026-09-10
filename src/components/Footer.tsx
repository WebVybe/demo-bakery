import { Link } from 'react-router-dom'
import { bakery, hours } from '../content/bakery'

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-linen">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-serif text-lg font-medium text-crust">{bakery.name}</p>
            <p className="mt-2 max-w-[220px] text-sm text-oat">{bakery.tagline}</p>
          </div>

          <div className="text-sm text-oat">
            <p className="eyebrow mb-3 text-crust">Visit</p>
            <p>{bakery.address}</p>
            <p className="mt-2">
              <a href={bakery.phoneHref} className="hover:text-ink">
                {bakery.phone}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${bakery.email}`} className="hover:text-ink">
                {bakery.email}
              </a>
            </p>
            <p className="mt-3 text-xs text-oat/80">
              Catering &amp; custom orders:{' '}
              <a href={`mailto:${bakery.cateringEmail}`} className="hover:text-ink">
                {bakery.cateringEmail}
              </a>
            </p>
          </div>

          <div className="text-sm text-oat">
            <p className="eyebrow mb-3 text-crust">Hours</p>
            <ul className="space-y-1">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-sm text-oat">
            <p className="eyebrow mb-3 text-crust">Explore</p>
            <ul className="space-y-1">
              <li>
                <Link to="/menu" className="hover:text-ink">
                  Menu & Pricing
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-ink">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-ink">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-ink">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-black/5 pt-6 text-xs text-oat/80 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {bakery.name}. All rights reserved.</p>
          <p>
            Portfolio demo built by{' '}
            <a href="https://webvybe.app" className="underline hover:text-ink">
              WebVybe
            </a>{' '}
            — a fictional business created to showcase the bakery/cafe site template.
          </p>
        </div>
      </div>
    </footer>
  )
}
