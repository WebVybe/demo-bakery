import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'

const panels: { variant: 1 | 2 | 3 | 4 | 5; label: string; span?: string }[] = [
  { variant: 2, label: 'Bakehouse ovens', span: 'sm:col-span-2 sm:row-span-2' },
  { variant: 1, label: 'Pastry case' },
  { variant: 3, label: 'Bread wall' },
  { variant: 4, label: 'Coffee bar' },
  { variant: 5, label: 'Sidewalk seating' },
  { variant: 3, label: 'Morning proof' },
]

export default function Gallery() {
  return (
    <div className="page-transition mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow mb-3">Gallery</p>
      <h1 className="font-serif text-4xl text-ink">A feel for the bakehouse</h1>
      <p className="mt-4 max-w-2xl text-oat">
        This is a portfolio demo, so there's no real bakehouse to photograph yet — the panels below are
        intentional gradient/texture art standing in for photography, not real photos of a real location. Real
        photography or licensed stock would replace these before any actual launch.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-template-rows:repeat(3,10rem)]">
        {panels.map((p, i) => (
          <DecorPanel
            key={`${p.label}-${i}`}
            variant={p.variant}
            label={p.label}
            className={`h-40 w-full sm:h-full ${p.span ?? ''}`}
          />
        ))}
      </div>

      <div className="mt-14 text-center">
        <p className="text-oat">Prefer to just come see it in person?</p>
        <NavLink to="/contact" className="btn-primary mt-4 inline-flex">
          Order for Pickup
        </NavLink>
      </div>
    </div>
  )
}
