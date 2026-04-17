import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 3600
import { medusaServerClient } from '@/lib/medusa-client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Star, Users } from 'lucide-react'
import ProductActions from '@/components/product/product-actions'
import ProductAccordion from '@/components/product/product-accordion'
import ProductBundleOffer from '@/components/product/product-bundle-offer'
import ProductTrustBadges from '@/components/product/product-trust-badges'
import { ProductViewTracker } from '@/components/product/product-view-tracker'
import { getProductPlaceholder } from '@/lib/utils/placeholder-images'
import { type VariantExtension } from '@/components/product/product-price'

async function getProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) throw new Error('No region found')

    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getBundleProduct(handle: string) {
  try {
    const regionsResponse = await medusaServerClient.store.region.list()
    const regionId = regionsResponse.regions[0]?.id
    if (!regionId) return null
    const response = await medusaServerClient.store.product.list({
      handle,
      region_id: regionId,
      fields: '*variants.calculated_price',
    })
    return response.products?.[0] || null
  } catch {
    return null
  }
}

async function getVariantExtensions(productId: string): Promise<Record<string, VariantExtension>> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000'
    const storeId = process.env.NEXT_PUBLIC_STORE_ID
    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
    const headers: Record<string, string> = {}
    if (storeId) headers['X-Store-Environment-ID'] = storeId
    if (publishableKey) headers['x-publishable-api-key'] = publishableKey

    const res = await fetch(
      `${baseUrl}/store/product-extensions/products/${productId}/variants`,
      { headers, next: { revalidate: 30 } }
    )
    if (!res.ok) return {}

    const data = await res.json()
    const map: Record<string, VariantExtension> = {}
    for (const v of data.variants || []) {
      map[v.id] = {
        compare_at_price: v.compare_at_price,
        allow_backorder: v.allow_backorder ?? false,
        inventory_quantity: v.inventory_quantity,
      }
    }
    return map
  } catch {
    return {}
  }
}

// Map a product handle to its bundle counterpart handle
const BUNDLE_MAP: Record<string, string> = {
  'premium-bamboo-cutting-board-set': 'bamboo-cutting-board-bundle-double-pack',
  'luxury-cotton-bath-towel-set': 'luxury-cotton-bath-towel-set',
  'aromatherapy-soy-candle-collection': 'aromatherapy-soy-candle-collection',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) return { title: 'Product Not Found' }

  return {
    title: product.title,
    description: product.description || `Shop ${product.title}`,
    openGraph: {
      title: product.title,
      description: product.description || `Shop ${product.title}`,
      ...(product.thumbnail ? { images: [{ url: product.thumbnail }] } : {}),
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const product = await getProduct(handle)
  if (!product) notFound()

  const variantExtensions = await getVariantExtensions(product.id)

  // Check if a bundle counterpart exists
  const bundleHandle = BUNDLE_MAP[handle]
  const bundleProduct =
    bundleHandle && bundleHandle !== handle
      ? await getBundleProduct(bundleHandle)
      : null
  const bundleVariant = bundleProduct?.variants?.[0]
  const bundlePrice = bundleVariant?.calculated_price?.calculated_amount as number | undefined

  const allImages = [
    ...(product.thumbnail ? [{ url: product.thumbnail }] : []),
    ...(product.images || []).filter((img: { url: string }) => img.url !== product.thumbnail),
  ]
  const displayImages = allImages.length > 0
    ? allImages
    : [{ url: getProductPlaceholder(product.id) }]

  // Inventory from first variant for urgency
  const firstVariantExt = product.variants?.[0]?.id
    ? variantExtensions[product.variants[0].id]
    : null
  const stockQty = firstVariantExt?.inventory_quantity

  return (
    <>
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="container-custom py-3">
          <nav className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/products" className="hover:text-foreground transition-colors">Shop</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </div>

      <div className="container-custom py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* ─── Product Images ─── */}
          <div className="space-y-3">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted rounded-xl">
              <Image
                src={displayImages[0].url}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Eco badge overlay */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5 shadow-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-[11px] font-semibold text-green-800">Eco-Friendly</span>
              </div>
            </div>

            {displayImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {displayImages.slice(1, 5).map((image: { url: string }, idx: number) => (
                  <div key={idx} className="relative aspect-square overflow-hidden bg-muted rounded-lg">
                    <Image
                      src={image.url}
                      alt={`${product.title} ${idx + 2}`}
                      fill
                      sizes="12vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Social proof strip */}
            <div className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm font-medium text-amber-900">
                4.8 / 5 — <span className="font-bold">2,400+ happy customers</span>
              </p>
            </div>
          </div>

          {/* ─── Product Info ─── */}
          <div className="lg:sticky lg:top-24 lg:self-start space-y-6">
            {/* Title & Subtitle */}
            <div>
              {product.subtitle && (
                <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-2">
                  {product.subtitle}
                </p>
              )}
              <h1 className="font-heading font-bold text-[1.85rem] sm:text-[2.25rem] leading-tight tracking-tight">
                {product.title}
              </h1>

              {/* Viewers indicator */}
              <div className="flex items-center gap-2 mt-3">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">23 people</span> are viewing this right now
                </p>
              </div>
            </div>

            <ProductViewTracker
              productId={product.id}
              productTitle={product.title}
              variantId={product.variants?.[0]?.id || null}
              currency={product.variants?.[0]?.calculated_price?.currency_code || 'inr'}
              value={product.variants?.[0]?.calculated_price?.calculated_amount ?? null}
            />

            {/* Low stock urgency */}
            {stockQty != null && stockQty > 0 && stockQty <= 20 && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2">
                <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
                <p className="text-sm font-semibold text-red-800">
                  Only {stockQty} left in stock — order soon!
                </p>
              </div>
            )}

            {/* Variant Selector + Price + Add to Cart */}
            <ProductActions product={product} variantExtensions={variantExtensions} />

            {/* Bundle Offer (shown only if a bundle exists for this product) */}
            {bundleProduct && bundleVariant && (
              <ProductBundleOffer
                productHandle={handle}
                variants={product.variants || []}
                bundleHandle={bundleHandle}
                bundleVariantId={bundleVariant.id}
                bundleLabel="Double Pack — Save 17%"
                bundlePrice={bundlePrice}
                bundleSavings="Save vs. buying twice"
              />
            )}

            {/* Trust Badges */}
            <ProductTrustBadges />

            {/* Accordion Sections */}
            <ProductAccordion
              description={product.description}
              details={product.metadata as Record<string, string> | undefined}
            />
          </div>
        </div>
      </div>
    </>
  )
}
