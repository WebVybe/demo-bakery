import { type FormEvent, useMemo, useState } from 'react'
import { bakery, hours, menuCategories, type MenuItem } from '../content/bakery'

const INPUT_CLS =
  'w-full rounded-lg border border-black/10 bg-flour px-3.5 py-2.5 text-ink outline-none focus:border-wheat-deep'

const WEEKDAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function priceToNumber(price: string): number {
  return Number.parseFloat(price.replace(/[^0-9.]/g, '')) || 0
}

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`
}

/** Bakery `hours` is ordered Monday..Sunday; JS Date#getDay() is 0=Sunday..6=Saturday. */
function hoursForDate(date: Date) {
  const jsDay = date.getDay()
  return hours[(jsDay + 6) % 7]
}

function parseClockTime(label: string): { hour: number; minute: number } | null {
  const match = /^(\d{1,2}):(\d{2})\s*(am|pm)$/i.exec(label.trim())
  if (!match) return null
  let hour = Number.parseInt(match[1], 10)
  const minute = Number.parseInt(match[2], 10)
  const meridiem = match[3].toLowerCase()
  if (meridiem === 'pm' && hour !== 12) hour += 12
  if (meridiem === 'am' && hour === 12) hour = 0
  return { hour, minute }
}

type PickupDayOption = {
  key: string
  label: string
  dateLabel: string
  date: Date
  openLabel: string
  closeLabel: string
}

/** Build the next few days the bakery is actually open, from today's real date/hours. */
function buildPickupDayOptions(count = 4): PickupDayOption[] {
  const options: PickupDayOption[] = []
  const today = new Date()

  for (let offset = 0; offset < 14 && options.length < count; offset++) {
    const date = new Date(today)
    date.setDate(today.getDate() + offset)
    const entry = hoursForDate(date)
    if (entry.time === 'Closed') continue

    const [openLabel, closeLabel] = entry.time.split('–').map((s) => s.trim())
    const label = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : WEEKDAY_NAMES[date.getDay()]
    const dateLabel = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

    options.push({ key: date.toDateString(), label, dateLabel, date, openLabel, closeLabel })
  }

  return options
}

/** Half-hour pickup slots between open and close, with a same-day prep buffer. */
function buildTimeSlots(day: PickupDayOption): string[] {
  const open = parseClockTime(day.openLabel)
  const close = parseClockTime(day.closeLabel)
  if (!open || !close) return []

  const slots: string[] = []
  const cursor = new Date(day.date)
  cursor.setHours(open.hour, open.minute, 0, 0)
  const closeTime = new Date(day.date)
  closeTime.setHours(close.hour, close.minute, 0, 0)

  const now = new Date()
  const isToday = day.date.toDateString() === now.toDateString()
  const earliest = new Date(now.getTime() + 45 * 60 * 1000) // 45-min prep buffer for same-day pickup

  while (cursor < closeTime) {
    if (!isToday || cursor >= earliest) {
      slots.push(
        cursor.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }).replace(' ', ' '),
      )
    }
    cursor.setMinutes(cursor.getMinutes() + 30)
  }

  return slots
}

type Tab = 'menu' | 'catering'

export default function Contact() {
  const [tab, setTab] = useState<Tab>('menu')

  const [orderSubmitted, setOrderSubmitted] = useState(false)
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const [pickupDayKey, setPickupDayKey] = useState<string>('')
  const [pickupTime, setPickupTime] = useState<string>('')

  const [cateringSubmitted, setCateringSubmitted] = useState(false)

  const dayOptions = useMemo(() => buildPickupDayOptions(), [])
  const selectedDay = dayOptions.find((d) => d.key === pickupDayKey) ?? dayOptions[0]
  const timeSlots = useMemo(() => (selectedDay ? buildTimeSlots(selectedDay) : []), [selectedDay])

  const orderLines = useMemo(
    () =>
      menuCategories
        .flatMap((c) => c.items)
        .filter((item) => (quantities[item.name] ?? 0) > 0)
        .map((item) => ({ item, qty: quantities[item.name] })),
    [quantities],
  )
  const subtotal = orderLines.reduce((sum, { item, qty }) => sum + priceToNumber(item.price) * qty, 0)
  const canSubmitOrder = orderLines.length > 0 && !!selectedDay && !!pickupTime

  function setQty(item: MenuItem, delta: number) {
    setQuantities((prev) => {
      const next = Math.max(0, Math.min(20, (prev[item.name] ?? 0) + delta))
      return { ...prev, [item.name]: next }
    })
  }

  function handleOrderSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Demo only: this form has no real backend. A live client build would
    // wire this to the same order-ahead/request pipeline as other WebVybe
    // client sites (see CLAUDE.md / new-client-site skill).
    setOrderSubmitted(true)
  }

  function resetOrder() {
    setOrderSubmitted(false)
    setQuantities({})
    setPickupDayKey('')
    setPickupTime('')
  }

  function handleCateringSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setCateringSubmitted(true)
  }

  return (
    <div className="page-transition mx-auto max-w-5xl px-6 py-16">
      <p className="eyebrow mb-3">Order</p>
      <h1 className="font-serif text-4xl text-ink">
        {tab === 'menu' ? 'Order for pickup' : 'Custom cakes & catering'}
      </h1>
      <p className="mt-4 max-w-xl text-oat">
        {tab === 'menu'
          ? "Build your order from today's menu, pick a pickup window, and we'll have it ready at the counter."
          : "Tell us about your event or occasion and we'll follow up with pricing and options."}
      </p>

      <div className="mt-8 flex max-w-full gap-1 rounded-full border border-black/10 bg-white p-1">
        <button
          type="button"
          onClick={() => setTab('menu')}
          className={`min-w-0 flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold transition-colors sm:flex-initial sm:px-4 sm:text-sm ${
            tab === 'menu' ? 'bg-crust text-flour' : 'text-oat hover:text-ink'
          }`}
        >
          Order from the Menu
        </button>
        <button
          type="button"
          onClick={() => setTab('catering')}
          className={`min-w-0 flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold transition-colors sm:flex-initial sm:px-4 sm:text-sm ${
            tab === 'catering' ? 'bg-crust text-flour' : 'text-oat hover:text-ink'
          }`}
        >
          Catering & Custom Cakes
        </button>
      </div>

      <div className="mt-8 grid min-w-0 gap-10 lg:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0 rounded-2xl border border-black/5 bg-white p-6 sm:p-8">
          {tab === 'menu' ? (
            orderSubmitted ? (
              <OrderSuccess
                orderLines={orderLines}
                subtotal={subtotal}
                selectedDay={selectedDay}
                pickupTime={pickupTime}
                onReset={resetOrder}
              />
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-8">
                <div className="space-y-6">
                  {menuCategories.map((category) => (
                    <div key={category.id}>
                      <h2 className="font-serif text-xl text-ink">{category.title}</h2>
                      <div className="mt-3 space-y-3">
                        {category.items.map((item) => {
                          const qty = quantities[item.name] ?? 0
                          return (
                            <div
                              key={item.name}
                              className="flex items-center justify-between gap-4 rounded-xl border border-black/5 bg-flour px-4 py-3"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-ink">{item.name}</span>
                                  {item.badge ? <span className="badge">{item.badge}</span> : null}
                                </div>
                                <p className="mt-0.5 text-sm text-oat">{item.price}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button
                                  type="button"
                                  onClick={() => setQty(item, -1)}
                                  disabled={qty === 0}
                                  aria-label={`Remove one ${item.name}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-crust disabled:opacity-30"
                                >
                                  −
                                </button>
                                <span className="w-5 text-center font-semibold text-ink">{qty}</span>
                                <button
                                  type="button"
                                  onClick={() => setQty(item, 1)}
                                  aria-label={`Add one ${item.name}`}
                                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-lg font-bold text-crust hover:border-wheat-deep"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {orderLines.length > 0 && (
                  <div className="rounded-xl border border-black/10 bg-linen px-4 py-4">
                    <p className="eyebrow mb-2">Your Order</p>
                    <ul className="space-y-1.5 text-sm">
                      {orderLines.map(({ item, qty }) => (
                        <li key={item.name} className="flex justify-between gap-4 text-ink">
                          <span>
                            {qty} × {item.name}
                          </span>
                          <span>{formatCurrency(priceToNumber(item.price) * qty)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-3 flex justify-between border-t border-black/10 pt-3 font-semibold text-ink">
                      <span>Subtotal</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                  </div>
                )}

                <div>
                  <p className="mb-2 font-medium text-ink">Pickup day</p>
                  <div className="flex flex-wrap gap-2">
                    {dayOptions.map((day) => (
                      <button
                        key={day.key}
                        type="button"
                        onClick={() => {
                          setPickupDayKey(day.key)
                          setPickupTime('')
                        }}
                        className={`rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
                          selectedDay?.key === day.key
                            ? 'border-crust bg-crust text-flour'
                            : 'border-black/10 text-ink hover:border-wheat-deep'
                        }`}
                      >
                        <span className="block">{day.label}</span>
                        <span className="block text-xs opacity-80">{day.dateLabel}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {selectedDay && (
                  <div>
                    <p className="mb-2 font-medium text-ink">
                      Pickup time <span className="text-oat">({selectedDay.openLabel}–{selectedDay.closeLabel})</span>
                    </p>
                    {timeSlots.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setPickupTime(slot)}
                            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                              pickupTime === slot
                                ? 'border-crust bg-crust text-flour'
                                : 'border-black/10 text-ink hover:border-wheat-deep'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-oat">
                        No more pickup slots left {selectedDay.label.toLowerCase()}. Pick another day above.
                      </p>
                    )}
                  </div>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink">First name</span>
                    <input required type="text" name="firstName" className={INPUT_CLS} />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink">Last name</span>
                    <input required type="text" name="lastName" className={INPUT_CLS} />
                  </label>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink">Email</span>
                    <input required type="email" name="email" className={INPUT_CLS} />
                  </label>
                  <label className="block text-sm">
                    <span className="mb-1.5 block font-medium text-ink">Phone</span>
                    <input type="tel" name="phone" className={INPUT_CLS} />
                  </label>
                </div>

                <button type="submit" disabled={!canSubmitOrder} className="btn-primary w-full disabled:opacity-40 sm:w-auto">
                  Place Order
                </button>
                {!canSubmitOrder && (
                  <p className="text-xs text-oat">
                    Add at least one item and choose a pickup day and time to place your order.
                  </p>
                )}
              </form>
            )
          ) : cateringSubmitted ? (
            <div className="flex flex-col items-start gap-3 py-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crust text-flour">✓</span>
              <h2 className="font-serif text-2xl text-ink">Request received</h2>
              <p className="max-w-sm text-oat">
                Thanks. We'll follow up by email or text within one business day with pricing and options.
              </p>
              <p className="max-w-sm text-xs text-oat/70">
                This is a portfolio demo: nothing was actually sent anywhere. A live client build would connect
                this form to a real inbox/order pipeline.
              </p>
              <button type="button" onClick={() => setCateringSubmitted(false)} className="btn-secondary mt-2">
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleCateringSubmit} className="space-y-5">
              <p className="rounded-xl border border-black/5 bg-linen px-4 py-3 text-sm text-oat">
                {bakery.customOrderNotice} You can also email{' '}
                <a href={`mailto:${bakery.cateringEmail}`} className="font-medium text-crust hover:underline">
                  {bakery.cateringEmail}
                </a>{' '}
                directly.
              </p>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">First name</span>
                  <input required type="text" name="firstName" className={INPUT_CLS} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Last name</span>
                  <input required type="text" name="lastName" className={INPUT_CLS} />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Email</span>
                  <input required type="email" name="email" className={INPUT_CLS} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Phone</span>
                  <input type="tel" name="phone" className={INPUT_CLS} />
                </label>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Event / need-by date</span>
                  <input type="date" name="eventDate" className={INPUT_CLS} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1.5 block font-medium text-ink">Headcount / servings</span>
                  <input type="text" name="headcount" placeholder="e.g. 25 people" className={INPUT_CLS} />
                </label>
              </div>
              <label className="block text-sm">
                <span className="mb-1.5 block font-medium text-ink">Tell us about the occasion</span>
                <textarea
                  name="details"
                  rows={4}
                  placeholder="Cake flavor/size, dietary needs, event type, budget: whatever you know so far."
                  className={INPUT_CLS}
                />
              </label>

              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send Request
              </button>
            </form>
          )}
        </div>

        <div className="min-w-0 space-y-8">
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

function OrderSuccess({
  orderLines,
  subtotal,
  selectedDay,
  pickupTime,
  onReset,
}: {
  orderLines: { item: MenuItem; qty: number }[]
  subtotal: number
  selectedDay: PickupDayOption | undefined
  pickupTime: string
  onReset: () => void
}) {
  return (
    <div className="flex flex-col items-start gap-3 py-4">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crust text-flour">✓</span>
      <h2 className="font-serif text-2xl text-ink">Order request received</h2>
      <p className="max-w-sm text-oat">
        We'll confirm by email or text within one business day and have it ready at the counter.
      </p>

      <div className="mt-2 w-full max-w-sm rounded-xl border border-black/10 bg-linen px-4 py-4">
        <ul className="space-y-1.5 text-sm">
          {orderLines.map(({ item, qty }) => (
            <li key={item.name} className="flex justify-between gap-4 text-ink">
              <span>
                {qty} × {item.name}
              </span>
              <span>{formatCurrency(priceToNumber(item.price) * qty)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex justify-between border-t border-black/10 pt-3 font-semibold text-ink">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        {selectedDay && pickupTime && (
          <p className="mt-3 border-t border-black/10 pt-3 text-sm text-ink">
            Pickup: <span className="font-medium">{selectedDay.label}</span>, {selectedDay.dateLabel} at{' '}
            <span className="font-medium">{pickupTime}</span>
          </p>
        )}
      </div>

      <p className="max-w-sm text-xs text-oat/70">
        This is a portfolio demo: nothing was actually sent anywhere. A live client build would connect this
        form to a real inbox/order pipeline.
      </p>
      <button type="button" onClick={onReset} className="btn-secondary mt-2">
        Start a new order
      </button>
    </div>
  )
}
