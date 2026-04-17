import { ShieldCheck, RotateCcw, Truck, Leaf, Award } from 'lucide-react'

export default function ProductTrustBadges() {
  return (
    <div className="space-y-3">
      {/* Guarantee banner */}
      <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3">
        <Award className="h-5 w-5 text-green-700 flex-shrink-0" strokeWidth={1.75} />
        <div>
          <p className="text-sm font-semibold text-green-900">1-Year Quality Guarantee</p>
          <p className="text-xs text-green-700">If it breaks or fades — we replace it. No questions asked.</p>
        </div>
      </div>

      {/* Badge grid */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { icon: Truck,       label: 'Free Shipping',     sub: 'Orders over ₹999' },
          { icon: RotateCcw,   label: '30-Day Returns',    sub: 'Hassle-free policy' },
          { icon: ShieldCheck, label: 'Secure Payment',    sub: 'SSL encrypted' },
          { icon: Leaf,        label: 'Eco Materials',     sub: 'Sustainably sourced' },
        ].map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-2.5 rounded-lg bg-muted/50 px-3 py-2.5">
            <Icon className="h-4 w-4 text-accent flex-shrink-0" strokeWidth={1.75} />
            <div>
              <p className="text-xs font-semibold leading-tight">{label}</p>
              <p className="text-[11px] text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
