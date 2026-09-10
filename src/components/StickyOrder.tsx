import { NavLink, useLocation } from 'react-router-dom'

export default function StickyOrder() {
  const { pathname } = useLocation()
  if (pathname === '/contact') return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/10 bg-flour/95 p-3 backdrop-blur-md shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.3)] sm:hidden">
      <NavLink to="/contact" className="btn-primary w-full">
        Order for Pickup
      </NavLink>
    </div>
  )
}
