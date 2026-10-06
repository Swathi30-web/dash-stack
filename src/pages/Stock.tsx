import { Pencil, Search, Trash2 } from 'lucide-react'
import { PageHead, Pager } from '../ui'

export const stock = [
  { img: 'stock1', name: 'Apple Watch Series 4', cat: 'Digital Product', price: '$690.00', qty: 63, colors: ['#000', '#A3A3A3', '#EE8E8E'] },
  { img: 'stock2', name: 'Microsoft Headsquare', cat: 'Digital Product', price: '$190.00', qty: 13, colors: ['#000', '#F87171', '#4D8DF5', '#E8BC4A'] },
  { img: 'stock3', name: "Women's Dress", cat: 'Fashion', price: '$640.00', qty: 635, colors: ['#8E2A5A', '#7FB4F5', '#101340', '#4338F2'] },
  { img: 'stock4', name: 'Samsung A50', cat: 'Mobile', price: '$400.00', qty: 67, colors: ['#1F2F8B', '#000', '#A3204A'] },
  { img: 'stock5', name: 'Camera', cat: 'Electronic', price: '$420.00', qty: 52, colors: ['#1F2F8B', '#000', '#A3204A'] },
  { img: 'stock2', name: 'Microsoft Headsquare', cat: 'Digital Product', price: '$190.00', qty: 13, colors: ['#000', '#F87171', '#4D8DF5', '#E8BC4A'] },
]
export function StockTable({ rows = stock }: { rows?: typeof stock }) {
  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="border-b-2 border-line dark:border-line-dark"><tr>
            {['Image', 'Product Name', 'Category', 'Price', 'Piece', 'Available Color', 'Action'].map(h => <th key={h} className="th py-4">{h}</th>)}
          </tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={i} className="border-b border-line last:border-0 dark:border-line-dark">
              <td className="td"><img src={`/img/${r.img}.jpg`} alt="" className="h-14 w-14 rounded-lg object-cover" /></td>
              <td className="td">{r.name}</td><td className="td">{r.cat}</td><td className="td">{r.price}</td><td className="td">{r.qty}</td>
              <td className="td"><span className="flex gap-3">{r.colors.map(c => <i key={c} className="h-4 w-4 rounded-full" style={{ background: c }} />)}</span></td>
              <td className="td"><span className="inline-flex overflow-hidden rounded-md border border-line dark:border-line-dark">
                <button aria-label="Edit" className="px-3 py-2 muted"><Pencil size={16} /></button>
                <button aria-label="Delete" className="border-l border-line px-3 py-2 text-red-500 dark:border-line-dark"><Trash2 size={16} /></button></span></td>
            </tr>))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default function Stock() {
  return (
    <>
      <PageHead title="Product Stock">
        <div className="relative w-full sm:w-72"><Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 muted" />
          <input placeholder="Search product name" className="h-10 w-full rounded-full border border-line bg-card pl-10 pr-4 text-sm outline-none dark:border-line-dark dark:bg-card-dark" /></div>
      </PageHead>
      <StockTable /><Pager text="Showing 1-09 of 78" />
    </>
  )
}
