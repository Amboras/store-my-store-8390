'use client'

import { useState, useEffect } from 'react'
import { Zap, Tag, Package } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'

interface BundleVariant {
  id: string
  title: string
  calculated_price?: {
    calculated_amount?: number
    currency_code?: string
  }
}

interface BundleOfferProps {
  productHandle: string
  variants: BundleVariant[]
  bundleHandle?: string
  bundleVariantId?: string
  bundleLabel?: string
  bundlePrice?: number
  bundleSavings?: string
}

function formatPrice(cents: number | undefined, currency = 'usd') {
  if (cents == null) return ''
  const symbol = currency === 'inr' ? '₹' : '$'
  return `${symbol}${(cents / 100).toFixed(2)}`
}

export default function ProductBundleOffer({
  variants,
  bundleVariantId,
  bundleLabel = 'Buy 2, Save 17%',
  bundlePrice,
  bundleSavings = 'Save ₹500',
}: BundleOfferProps) {
  const { addItem, isAddingItem } = useCart()
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 47, seconds: 22 })
  const [addedBundle, setAddedBundle] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        if (seconds > 0) return { hours, minutes, seconds: seconds - 1 }
        if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 }
        if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const pad = (n: number) => String(n).padStart(2, '0')

  const singleVariant = variants?.[0]
  const singlePrice = singleVariant?.calculated_price?.calculated_amount
  const currency = singleVariant?.calculated_price?.currency_code || 'usd'

  const handleAddBundle = () => {
    if (!bundleVariantId) return
    addItem(
      { variantId: bundleVariantId, quantity: 1 },
      {
        onSuccess: () => {
          setAddedBundle(true)
          toast.success('Bundle added to bag!')
          setTimeout(() => setAddedBundle(false), 2500)
        },
        onError: (err: Error) => {
          toast.error(err.message || 'Failed to add bundle')
        },
      }
    )
  }

  return (
    <div className="rounded-xl border-2 border-accent/30 bg-accent/5 overflow-hidden">
      {/* Urgency Banner */}
      <div className="bg-accent text-white px-4 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Zap className="h-4 w-4 flex-shrink-0" />
          <span>Flash Sale — Ends in</span>
        </div>
        <div className="flex items-center gap-1 font-mono font-bold text-sm tabular-nums">
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{pad(timeLeft.hours)}</span>
          <span>:</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{pad(timeLeft.minutes)}</span>
          <span>:</span>
          <span className="bg-white/20 px-1.5 py-0.5 rounded">{pad(timeLeft.seconds)}</span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Package className="h-4.5 w-4.5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground">{bundleLabel}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Get double the value — perfect for gifting or a full household upgrade.
            </p>
          </div>
        </div>

        {/* Options row */}
        <div className="grid grid-cols-2 gap-2">
          {/* Single */}
          <div className="rounded-lg border border-border bg-white p-3 text-center opacity-70">
            <p className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mb-1">Single</p>
            <p className="font-bold text-sm">{formatPrice(singlePrice, currency)}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">1 set</p>
          </div>

          {/* Bundle */}
          <div className="rounded-lg border-2 border-accent bg-accent/5 p-3 text-center relative">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <span className="bg-accent text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                Best Value
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-wider font-semibold text-accent mb-1">Bundle</p>
            <p className="font-bold text-sm text-accent">{formatPrice(bundlePrice, currency)}</p>
            <p className="text-[11px] text-green-700 font-semibold mt-0.5">{bundleSavings}</p>
          </div>
        </div>

        {/* Bundle CTA */}
        {bundleVariantId && (
          <button
            onClick={handleAddBundle}
            disabled={isAddingItem || addedBundle}
            className={`w-full flex items-center justify-center gap-2 py-3 text-sm font-bold uppercase tracking-wide rounded-lg transition-all ${
              addedBundle
                ? 'bg-green-600 text-white'
                : 'bg-accent text-white hover:opacity-90'
            }`}
          >
            <Tag className="h-4 w-4" />
            {addedBundle ? 'Bundle Added to Bag!' : 'Add Bundle to Bag'}
          </button>
        )}

        <p className="text-[11px] text-center text-muted-foreground">
          Free shipping on all bundles &bull; 30-day returns included
        </p>
      </div>
    </div>
  )
}
