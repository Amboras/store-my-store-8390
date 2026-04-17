'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ArrowRight, Truck, Shield, RotateCcw, Star, Leaf, Package, Award } from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1400&q=80'
const FEATURE_1 = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80'
const FEATURE_2 = 'https://images.unsplash.com/photo-1515696955266-4f67e13219e8?q=80&w=800'
const FEATURE_3 = 'https://images.unsplash.com/photo-1608181831718-c9fbc7bfe930?w=800&q=80'

const featuredProducts = [
  {
    title: 'Bamboo Cutting Boards',
    subtitle: 'Kitchen Essentials',
    image: FEATURE_1,
    href: '/products/premium-bamboo-cutting-board-set',
  },
  {
    title: 'Luxury Bath Towels',
    subtitle: 'Bathroom Luxuries',
    image: FEATURE_2,
    href: '/products/luxury-cotton-bath-towel-set',
  },
  {
    title: 'Soy Candle Collection',
    subtitle: 'Home Ambiance',
    image: FEATURE_3,
    href: '/products/aromatherapy-soy-candle-collection',
  },
]

const benefits = [
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    description: 'All our products are made from eco-friendly, responsibly sourced materials.',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Hotel-grade standards for your home — crafted to last for years.',
  },
  {
    icon: Package,
    title: 'Beautiful Packaging',
    description: 'Every order arrives gift-ready in minimal, eco-conscious packaging.',
  },
  {
    icon: Star,
    title: 'Loved by Thousands',
    description: 'Join over 10,000 happy homes already enjoying our products daily.',
  },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [stockCount] = useState(14)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', { content_name: 'newsletter_signup', status: 'submitted' })
    setSubscribed(true)
  }

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative bg-[#FAF7F4] overflow-hidden">
        <div className="container-custom grid lg:grid-cols-2 gap-0 lg:gap-16 items-center py-12 lg:py-24">
          {/* Copy */}
          <div className="space-y-7 animate-fade-in-up order-2 lg:order-1 pt-8 lg:pt-0">
            <span className="inline-block text-xs uppercase tracking-[0.25em] text-accent font-semibold border border-accent/30 bg-accent/5 px-3 py-1 rounded-full">
              New Season Arrivals
            </span>
            <h1 className="font-heading font-bold text-[2.8rem] sm:text-[3.6rem] leading-[1.08] tracking-tight text-balance text-foreground">
              Make Every Corner<br />
              <span className="text-accent">Feel Like Home</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed">
              Premium everyday home products designed to add warmth, comfort, and style to your daily routines — sustainably made, beautifully crafted.
            </p>

            {/* Urgency pill */}
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              Only {stockCount} bundles left at this price — Sale ends Sunday
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 text-sm font-bold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-foreground/30 px-8 py-4 text-sm font-semibold uppercase tracking-wider hover:border-foreground transition-colors"
              >
                Our Story
              </Link>
            </div>

            {/* Social proof dots */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {['#D4A574', '#8B956D', '#6B7280', '#B5987A'].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">10,000+</span> happy homes
              </p>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[5/6] sm:aspect-[4/4] lg:aspect-[5/6] overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Premium Home Products"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 lg:left-6 bg-white rounded-xl shadow-xl px-5 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">All Products</p>
                <p className="text-sm font-semibold">Eco-Friendly</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST BAR ─── */}
      <section className="border-y bg-white py-4">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { icon: Truck,    label: 'Free Shipping',    sub: 'On orders over ₹999' },
              { icon: RotateCcw, label: 'Easy Returns',    sub: '30-day return policy' },
              { icon: Shield,   label: 'Secure Checkout',  sub: '256-bit SSL encrypted' },
              { icon: Award,    label: 'Quality Guarantee', sub: '1-year product warranty' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 justify-center">
                <Icon className="h-5 w-5 text-accent flex-shrink-0" strokeWidth={1.5} />
                <div>
                  <p className="text-xs font-semibold">{label}</p>
                  <p className="text-[11px] text-muted-foreground">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="py-16 lg:py-24">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Bestsellers</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.6rem] tracking-tight">
              Made for Every Room
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              From kitchen to bathroom to living room — our curated essentials are designed to elevate the everyday.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative overflow-hidden rounded-xl block"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-xs uppercase tracking-widest text-white/70 mb-1">{item.subtitle}</p>
                  <h3 className="font-heading font-bold text-xl">{item.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium mt-2 border-b border-white/40 pb-0.5 group-hover:border-white transition-colors">
                    Shop Now <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-foreground/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors"
            >
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── COLLECTIONS ─── */}
      {isLoading ? null : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* ─── BRAND STORY / LIFESTYLE ─── */}
      <section className="py-16 lg:py-24 bg-[#FAF7F4]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={LIFESTYLE_IMAGE}
                  alt="A beautifully curated home"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Floating stat card */}
              <div className="absolute top-8 -right-4 lg:right-[-32px] bg-white rounded-xl shadow-xl px-6 py-4 text-center">
                <p className="text-3xl font-bold text-accent">98%</p>
                <p className="text-xs text-muted-foreground mt-0.5">Customer<br />Satisfaction</p>
              </div>
            </div>

            <div className="space-y-7 lg:max-w-lg">
              <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold">Our Philosophy</p>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl leading-tight tracking-tight">
                Small Upgrades.<br />Big Difference.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe the home should be a place of comfort, beauty, and intention. That's why every product we carry is hand-selected for its quality, sustainability, and the genuine joy it brings to daily life — whether it's your morning routine or a quiet evening at home.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Based in India, shipping nationwide — we're proud to bring premium home living to every household, at prices that make sense.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide border-b-2 border-foreground pb-0.5 hover:text-accent hover:border-accent transition-colors"
              >
                Learn More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── BENEFITS GRID ─── */}
      <section className="py-16 lg:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Why Choose Us</p>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl tracking-tight">The Nestwell Difference</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.title} className="bg-[#FAF7F4] rounded-xl p-7 space-y-4 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading font-semibold text-base">{b.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{b.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── NEWSLETTER ─── */}
      <section className="py-16 lg:py-20 bg-foreground text-background">
        <div className="container-custom max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-background/50 font-semibold mb-4">Join the Community</p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl">Get 10% Off Your First Order</h2>
          <p className="mt-3 text-background/60 text-sm leading-relaxed">
            Sign up for exclusive deals, new arrivals, and home style inspiration delivered right to your inbox.
          </p>
          {subscribed ? (
            <div className="mt-8 inline-flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold">
              Welcome aboard! Your 10% code is on its way.
            </div>
          ) : (
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 bg-background/10 border border-background/20 text-background placeholder:text-background/40 px-4 py-3.5 text-sm focus:outline-none focus:border-background/60 rounded-sm transition-colors"
              />
              <button
                type="submit"
                className="bg-accent text-white px-6 py-3.5 text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap rounded-sm"
              >
                Get 10% Off
              </button>
            </form>
          )}
          <p className="mt-4 text-xs text-background/30">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
