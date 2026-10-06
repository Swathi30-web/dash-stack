import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { useState } from 'react'
import { PageHead, Stars } from '../ui'

export type Product = { name: string; price: string; stars: number; count: number; liked?: boolean }
export function ProductGrid({ items, img }: { items: Product[]; img: string }) {
  const [liked, setLiked] = useState(items.map(i => !!i.liked))
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
      {items.map((p, i) => (
        <article key={p.name + i} className="card p-5">
          <div className="relative flex h-64 items-center justify-center sm:h-72">
            <button aria-label="Previous" className="absolute left-0 grid h-9 w-9 place-items-center rounded-full bg-[#F1F4F9] dark:bg-page-dark"><ChevronLeft size={16} /></button>
            <img src={img} alt={p.name} className="h-full object-contain" />
            <button aria-label="Next" className="absolute right-0 grid h-9 w-9 place-items-center rounded-full bg-[#F1F4F9] dark:bg-page-dark"><ChevronRight size={16} /></button>
          </div>
          <div className="mt-4 flex items-start justify-between">
            <div><h3 className="text-lg font-bold">{p.name}</h3><p className="my-1 font-bold text-primary">{p.price}</p><Stars n={p.stars} count={p.count} /></div>
            <button aria-label="Like" onClick={() => setLiked(l => l.map((v, j) => (j === i ? !v : v)))} className="grid h-10 w-10 place-items-center rounded-full bg-[#F1F4F9] dark:bg-page-dark">
              <Heart size={18} className={liked[i] ? 'fill-rose-500 text-rose-500' : 'text-rose-500'} /></button>
          </div>
          <button className="mt-4 rounded-md bg-[#EEF1FB] px-4 py-2 text-sm font-bold dark:bg-page-dark">Edit Product</button>
        </article>
      ))}
    </div>
  )
}

const watches: Product[] = Array.from({ length: 3 }, () => ({ name: 'Apple Watch Series 4', price: '$120.00', stars: 4, count: 131 }))

export default function Products() {
  return (
    <>
      <PageHead title="Products" />
      <section className="relative mb-6 overflow-hidden rounded-2xl bg-primary px-6 py-10 text-white sm:px-20 sm:py-16"
        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,.12) 0, transparent 40%), radial-gradient(circle at 10% 90%, rgba(255,255,255,.1) 0, transparent 35%)' }}>
        <button aria-label="Previous" className="absolute left-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/60 text-ink"><ChevronLeft size={18} /></button>
        <button aria-label="Next" className="absolute right-4 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/60 text-ink"><ChevronRight size={18} /></button>
        <p className="text-sm">September 12-22</p>
        <h2 className="my-3 max-w-md text-3xl font-extrabold leading-tight sm:text-4xl">Enjoy free home delivery in this summer</h2>
        <p className="text-sm text-white/80">Designer Dresses - Pick from trendy Designer Dress.</p>
        <button className="mt-6 rounded-md bg-orange-500 px-6 py-2.5 text-sm font-bold">Get Started</button>
      </section>
      <ProductGrid items={watches} img="/img/watch-black.jpg" />
    </>
  )
}
