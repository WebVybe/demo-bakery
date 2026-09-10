// Wildflour Bakehouse -- a fictional neighborhood bakery & coffee bar created
// for WebVybe's portfolio demo. There is no real business behind this
// content; it exists to show how WebVybe would build a real bakery/cafe
// client site. Keep prices and copy internally consistent if this file is
// edited.

export const bakery = {
  name: 'Wildflour Bakehouse',
  tagline: 'Scratch-made bread and pastry, baked before sunrise.',
  neighborhood: 'South Park, San Diego',
  address: '1907 Fern St, San Diego, CA 92102',
  phone: '(619) 555-0198',
  phoneHref: 'tel:+16195550198',
  email: 'hello@wildflourbakehouse.com',
  instagram: '@wildflourbakehouse',
  founderName: 'Priya Nair',
  founded: 2021,
  featureItem: {
    name: 'Brown Butter Maple Pecan Danish',
    blurb: "This week's feature — laminated dough, brown-butter frangipane, candied pecan.",
  },
}

export const hours = [
  { day: 'Monday', time: 'Closed' },
  { day: 'Tuesday', time: '7:00am – 2:00pm' },
  { day: 'Wednesday', time: '7:00am – 2:00pm' },
  { day: 'Thursday', time: '7:00am – 2:00pm' },
  { day: 'Friday', time: '7:00am – 3:00pm' },
  { day: 'Saturday', time: '7:00am – 3:00pm' },
  { day: 'Sunday', time: '8:00am – 2:00pm' },
]

export type MenuItem = {
  name: string
  price: string
  description: string
  badge?: string
}

export type MenuCategory = {
  id: string
  title: string
  intro: string
  items: MenuItem[]
}

export const menuCategories: MenuCategory[] = [
  {
    id: 'pastries',
    title: 'Pastries & Viennoiserie',
    intro: 'Laminated the same morning they sell — nothing frozen, nothing shipped in.',
    items: [
      {
        name: 'Butter Croissant',
        price: '$4.50',
        description: 'Our base dough — 36-hour cold ferment, all-butter lamination.',
        badge: 'Best Seller',
      },
      {
        name: 'Pain au Chocolat',
        price: '$5.00',
        description: 'Two batons of dark chocolate folded into the same croissant dough.',
      },
      {
        name: 'Morning Bun',
        price: '$5.50',
        description: 'Croissant dough coiled with orange zest and cinnamon sugar, baked crisp.',
      },
      {
        name: 'Brown Butter Maple Pecan Danish',
        price: '$6.00',
        description: 'This week’s feature — brown-butter frangipane and candied pecan.',
        badge: "Baker's Pick",
      },
      {
        name: 'Sourdough Cinnamon Roll',
        price: '$6.50',
        description: 'Naturally leavened, brown sugar filling, cream cheese glaze.',
      },
    ],
  },
  {
    id: 'bread',
    title: 'Bread & Loaves',
    intro: 'Naturally leavened with our own starter, fed daily since 2021.',
    items: [
      {
        name: 'Country Sourdough',
        price: '$9.00',
        description: 'Our house loaf — open crumb, dark blistered crust, 24-hour ferment.',
        badge: 'Best Seller',
      },
      {
        name: 'Seeded Multigrain',
        price: '$10.00',
        description: 'Toasted sunflower, flax, and oat folded into a softer everyday loaf.',
      },
      {
        name: 'Baguette',
        price: '$5.00',
        description: 'Thin crust, open crumb — baked twice daily, mid-morning and early afternoon.',
      },
      {
        name: 'Rosemary Sea Salt Focaccia',
        price: '$8.00',
        description: 'By the half sheet — olive oil, fresh rosemary, flaked sea salt.',
      },
    ],
  },
  {
    id: 'coffee',
    title: 'Coffee & Drinks',
    intro: 'Beans from a local San Diego roaster, rotated seasonally.',
    items: [
      {
        name: 'Drip Coffee',
        price: '$3.50',
        description: 'Batch-brewed, refreshed every 30 minutes.',
      },
      {
        name: 'Cortado',
        price: '$4.50',
        description: 'Equal parts espresso and steamed milk.',
      },
      {
        name: 'Oat Milk Latte',
        price: '$5.50',
        description: 'Double shot, house oat milk, latte art on a good day.',
        badge: 'Best Seller',
      },
      {
        name: 'Matcha Latte',
        price: '$5.50',
        description: 'Ceremonial-grade matcha, steamed milk of your choice.',
      },
      {
        name: 'Chai Latte',
        price: '$5.00',
        description: 'House-steeped chai concentrate, steamed milk.',
      },
    ],
  },
  {
    id: 'savory',
    title: 'By the Slice',
    intro: 'A short savory menu that changes with what came out of the oven that morning.',
    items: [
      {
        name: 'Quiche of the Day',
        price: '$7.50',
        description: 'Ask what’s in the case — rotates daily, always in a hand-laminated crust.',
      },
      {
        name: 'Tomato & Ricotta Galette Slice',
        price: '$6.50',
        description: 'Rough puff pastry, whipped ricotta, roasted tomato.',
      },
    ],
  },
]

export const standingOrder = {
  name: 'The Standing Order',
  price: '$28/week',
  bullets: [
    'Two loaves of your choice, set aside for pickup every week',
    'Skip any week from a text — no penalty, no phone call',
    'Ready for pickup every Saturday morning, 7–9am',
    '10% off any pastries or drinks added to a pickup',
  ],
}

export const faqs = [
  {
    q: 'Do you take custom cake or dessert orders?',
    a: "Yes, for pickup — tell us the occasion, serving size, and date in the contact form and we'll follow up with options. We ask for at least one week's notice for custom orders.",
  },
  {
    q: 'Do you sell out? Should I order ahead?',
    a: 'Popular items like the sourdough and the weekly feature pastry regularly sell out by mid-morning on weekends. Order-ahead through the contact form guarantees your pickup.',
  },
  {
    q: 'Do you have gluten-free or vegan options?',
    a: "We bake a rotating gluten-free banana bread and our focaccia can be made vegan with 48 hours' notice. We are not a dedicated gluten-free kitchen, so cross-contact is possible.",
  },
  {
    q: 'Is there seating, or is it pickup/takeaway only?',
    a: 'A handful of counter and sidewalk seats, first come first served — most orders are quick pickups rather than sit-down service.',
  },
  {
    q: 'Do you cater events?',
    a: 'Yes — pastry boxes, bread baskets, and coffee service for offices and small gatherings. Reach out with headcount and date and we’ll send a quote.',
  },
  {
    q: 'Is parking available?',
    a: 'Free street parking along Fern St and the surrounding blocks. We’re a short walk from the Beech St shops in South Park.',
  },
]
