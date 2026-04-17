'use client'

import Link from 'next/link'
import { Home, Camera, Globe, MessageCircle } from 'lucide-react'
import { clearConsent } from '@/lib/cookie-consent'
import { usePolicies } from '@/hooks/use-policies'

const footerLinks = {
  shop: [
    { label: 'All Products', href: '/products' },
    { label: 'New Arrivals', href: '/products?sort=newest' },
    { label: 'Collections', href: '/collections' },
    { label: 'Gift Sets', href: '/products' },
  ],
  help: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Shipping & Returns', href: '/shipping' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Track Order', href: '/account/orders' },
  ],
}

export default function Footer() {
  const { policies } = usePolicies()

  const companyLinks = [{ label: 'About Us', href: '/about' }]

  if (policies?.privacy_policy)  companyLinks.push({ label: 'Privacy Policy', href: '/privacy' })
  if (policies?.terms_of_service) companyLinks.push({ label: 'Terms of Service', href: '/terms' })
  if (policies?.refund_policy)   companyLinks.push({ label: 'Refund Policy', href: '/refund-policy' })
  if (policies?.cookie_policy)   companyLinks.push({ label: 'Cookie Policy', href: '/cookie-policy' })

  return (
    <footer className="border-t bg-foreground text-background">
      <div className="container-custom py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center">
                <Home className="h-4 w-4 text-foreground" strokeWidth={2} />
              </div>
              <span className="font-heading text-xl font-bold text-background">Nestwell</span>
            </Link>
            <p className="mt-4 text-sm text-background/60 leading-relaxed max-w-xs">
              Premium everyday home products — sustainably made, beautifully crafted for Indian homes.
            </p>
            <div className="flex gap-3 mt-6">
              {[Camera, Globe, MessageCircle].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-lg border border-background/20 flex items-center justify-center hover:border-background/60 hover:bg-background/10 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4 text-background/60" strokeWidth={1.5} />
                </button>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5 text-background/90">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/55 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5 text-background/90">Help</h3>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/55 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5 text-background/90">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-background/55 hover:text-background transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-background/5 border border-background/10">
              <p className="text-xs text-background/50 mb-1">Need help?</p>
              <p className="text-sm font-semibold text-background">support@nestwell.in</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            &copy; {new Date().getFullYear()} Nestwell. All rights reserved. Made with care in India.
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                clearConsent()
                window.dispatchEvent(new Event('manage-cookies'))
              }}
              className="text-xs text-background/40 hover:text-background/70 transition-colors"
            >
              Manage Cookies
            </button>
            <span className="text-xs text-background/30">Powered by Amboras</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
