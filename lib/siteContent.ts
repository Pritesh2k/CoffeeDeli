// Central content store — all public-facing text/data lives here.
// The admin panel reads from and writes to this structure (saved to localStorage).

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  source: 'Google' | 'TripAdvisor' | 'Instagram';
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  badge?: string;
}

export interface SiteContent {
  seo: {
    siteTitle: string;
    tagline: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    cta: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    body: string;
    highlight: string;
  };
  contact: {
    address: string;
    phone: string;
    email: string;
    hoursWeekday: string;
    hoursWeekend: string;
  };
  social: {
    instagram: string;
    tripadvisor: string;
  };
  reviews: Review[];
  menu: {
    coffee: MenuItem[];
    food: MenuItem[];
    wine: MenuItem[];
    cakes: MenuItem[];
  };
  events: {
    title: string;
    description: string;
    features: string[];
    cta: string;
  };
  marqueeText: string[];
}

export const defaultContent: SiteContent = {
  seo: {
    siteTitle: 'W10 Coffee + Deli',
    tagline: 'Specialty Coffee & Deli — Inspired by Southern France',
    description: 'W10 Coffee + Deli is a sun-drenched neighbourhood café on Harrow Road, London. Specialty coffee, artisan deli food, cakes, wine, and private events. Views over the Grand Union Canal.',
    keywords: 'coffee shop london, specialty coffee W10, deli Harrow Road, wine cafe london, private events london, artisan coffee Kensal Town',
    ogImage: '/images/og.jpg',
  },
  hero: {
    headline: 'A Taste of\nSouthern France',
    subheadline: 'Specialty coffee, artisan deli & wine on the Grand Union Canal',
    cta: 'Explore Our Menu',
    ctaSecondary: 'Book a Private Event',
  },
  about: {
    title: 'Our Story',
    body: 'Nestled at 427–429 Harrow Road with sweeping views over the Grand Union Canal, W10 Coffee + Deli brings the warmth and artisanal spirit of southern France to the heart of West London. From the first silky flat white of the morning to the last glass of wine as the light fades on the water — every visit is unhurried, generous, and alive with flavour.',
    highlight: 'One of the best flat whites I\'ve ever had.',
  },
  contact: {
    address: '427–429 Harrow Road, London W10 4RE',
    phone: '+44 7515 941150',
    email: 'hello@w10coffee.co.uk',
    hoursWeekday: 'Mon – Fri: 8am – 5pm',
    hoursWeekend: 'Sat – Sun: 9am – 5pm',
  },
  social: {
    instagram: 'https://www.instagram.com/w10coffee/',
    tripadvisor: 'https://www.tripadvisor.co.uk/Restaurant_Review-g186338-d27514294-Reviews-W10_Coffee_Deli-London_England.html',
  },
  reviews: [
    { id: '1', author: 'Sarah M.', rating: 5, text: 'One of the best flat whites I\'ve ever had. Genuinely stunning spot by the canal — feels like you\'ve been transported to Provence.', date: 'March 2025', source: 'Google' },
    { id: '2', author: 'James T.', rating: 5, text: 'The avocado toast was generous and perfectly seasoned. Relaxed, beautiful atmosphere. My new favourite spot in W10.', date: 'January 2025', source: 'TripAdvisor' },
    { id: '3', author: 'Lucia R.', rating: 4, text: 'Absolutely recommend visiting. The cakes are incredible and the coffee is exceptional. Will not be disappointed.', date: 'February 2025', source: 'Google' },
    { id: '4', author: 'Tom H.', rating: 5, text: 'We hired the space for a private dinner — the team were faultless. The food and wine selection was outstanding for a neighbourhood café.', date: 'December 2024', source: 'TripAdvisor' },
    { id: '5', author: 'Priya K.', rating: 5, text: 'The canal views from the window are dreamy. Coffee was perfect, pastries were freshly baked. A little slice of France in London.', date: 'April 2025', source: 'Instagram' },
  ],
  menu: {
    coffee: [
      { id: 'c1', name: 'Flat White', description: 'Double ristretto with velvety micro-foam', price: '£3.80', category: 'coffee' },
      { id: 'c2', name: 'Espresso', description: 'Single or double — beans sourced globally', price: '£2.50', category: 'coffee' },
      { id: 'c3', name: 'Cortado', description: 'Equal parts espresso and warm milk', price: '£3.20', category: 'coffee' },
      { id: 'c4', name: 'Filter Coffee', description: 'Rotating single origin, V60 pour-over', price: '£3.50', category: 'coffee', badge: 'Rotating' },
      { id: 'c5', name: 'Oat Cappuccino', description: 'Creamy, plant-based, perfectly textured', price: '£4.20', category: 'coffee' },
      { id: 'c6', name: 'Cold Brew', description: 'Steeped 24 hours, served over ice', price: '£4.50', category: 'coffee', badge: 'Seasonal' },
    ],
    food: [
      { id: 'f1', name: 'Avocado Toast', description: 'Sourdough, smashed avocado, chilli flakes, lemon', price: '£9.50', category: 'food', badge: 'Favourite' },
      { id: 'f2', name: 'Croque Monsieur', description: 'Comté, black forest ham, béchamel, sourdough', price: '£11.00', category: 'food' },
      { id: 'f3', name: 'Deli Board', description: 'Charcuterie, aged cheese, pickles, grilled bread', price: '£15.00', category: 'food' },
      { id: 'f4', name: 'Salade Niçoise', description: 'Line-caught tuna, French beans, heritage tomatoes', price: '£13.50', category: 'food' },
      { id: 'f5', name: 'Tartine du Jour', description: 'Open-faced, seasonal toppings, ask for today\'s', price: '£10.00', category: 'food', badge: 'Daily' },
      { id: 'f6', name: 'Grab & Go', description: 'Freshly made sandwiches, wraps & salads daily', price: 'From £6.50', category: 'food' },
    ],
    wine: [
      { id: 'w1', name: 'Picpoul de Pinet', description: 'Crisp white, Languedoc-Roussillon, France', price: '£7.50 / £28', category: 'wine' },
      { id: 'w2', name: 'Côtes du Rhône Rosé', description: 'Dry, delicate, summer fruit', price: '£8.00 / £30', category: 'wine', badge: 'House' },
      { id: 'w3', name: 'Chablis Premier Cru', description: 'Mineral, flinty, pure Chardonnay', price: '£12.00 / £46', category: 'wine' },
      { id: 'w4', name: 'Grenache Rouge', description: 'Warm spice, dark cherry, Provence', price: '£9.00 / £34', category: 'wine' },
    ],
    cakes: [
      { id: 'k1', name: 'Tarte au Citron', description: 'Silky lemon curd, buttery pastry, candied zest', price: '£5.50', category: 'cakes', badge: 'Signature' },
      { id: 'k2', name: 'Kouign-Amann', description: 'Flaky, caramelised, Breton butter cake', price: '£4.50', category: 'cakes' },
      { id: 'k3', name: 'Chocolate Fondant', description: 'Warm, molten centre, crème fraîche', price: '£6.00', category: 'cakes' },
      { id: 'k4', name: 'Seasonal Tart', description: 'Rotating, ask at the counter for today\'s', price: '£5.00', category: 'cakes', badge: 'Daily' },
    ],
  },
  events: {
    title: 'Private Events',
    description: 'The most intimate and characterful private dining room in West London. With views over the Grand Union Canal and a menu crafted around your occasion, W10 Coffee + Deli transforms into an exclusive venue after hours.',
    features: ['Seated dining up to 30 guests', 'Bespoke catering menus', 'Full wine & cocktail service', 'Canal-side views', 'Fully staffed events', 'DM or email to enquire'],
    cta: 'Enquire About Events',
  },
  marqueeText: ['Specialty Coffee', 'Artisan Deli', 'Southern France', 'Canal Views', 'Private Events', 'Fine Wine', 'Fresh Pastries', 'W10 London'],
};
