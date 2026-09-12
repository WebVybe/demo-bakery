import { NavLink } from 'react-router-dom'
import DecorPanel from '../components/DecorPanel'
// Photo credits (Pexels license: free for commercial use, no attribution required):
import ovenImg from '../assets/images/gallery-oven.jpg' // Yasin Onus
import pastryCaseImg from '../assets/images/gallery-pastry-case.jpg' // Dale
import breadWallImg from '../assets/images/gallery-bread-wall.jpg' // Wal_
import coffeeBarImg from '../assets/images/gallery-coffee-bar.jpg' // Yusuf Kaya
import sidewalkImg from '../assets/images/gallery-sidewalk.jpg' // Karography
import morningProofImg from '../assets/images/gallery-morning-proof.jpg' // Catscoming

const panels: { label: string; span?: string; src: string }[] = [
  { label: 'Bakehouse ovens', span: 'sm:col-span-2 sm:row-span-2', src: ovenImg },
  { label: 'Pastry case', src: pastryCaseImg },
  { label: 'Bread wall', src: breadWallImg },
  { label: 'Coffee bar', src: coffeeBarImg },
  { label: 'Sidewalk seating', src: sidewalkImg },
  { label: 'Morning proof', src: morningProofImg },
]

export default function Gallery() {
  return (
    <div className="page-transition mx-auto max-w-6xl px-6 py-16">
      <p className="eyebrow mb-3">Gallery</p>
      <h1 className="font-serif text-4xl text-ink">A feel for the bakehouse</h1>
      <p className="mt-4 max-w-2xl text-oat">
        This is a portfolio demo, so there's no real bakehouse to photograph yet: the images below are licensed
        stock photography standing in for real photography of this specific location, not real photos of a real
        Wildflour Bakehouse. Real photography would replace these before any actual launch.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:[grid-template-rows:repeat(3,10rem)]">
        {panels.map((p, i) => (
          <DecorPanel
            key={`${p.label}-${i}`}
            label={p.label}
            src={p.src}
            alt={p.label}
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
