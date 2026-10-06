import { PageHead } from '../ui'
import { ProductGrid, type Product } from './Products'

const items: Product[] = [
  { name: 'Apple Watch Series 4', price: '$120.00', stars: 4, count: 131, liked: true }, { name: 'Air-Max-270', price: '$60.00', stars: 4, count: 64 },
  { name: 'Minimal Chair Tool', price: '$24.59', stars: 5, count: 63 }, { name: 'Amazfit Vip', price: '$79.35', stars: 4, count: 63 },
  { name: 'Gumbo Mouse', price: '$32.42', stars: 4, count: 63 }, { name: 'Camera Tripod', price: '$50.00', stars: 4, count: 63 },
]
export default function Favorites() {
  return <><PageHead title="Favorites" /><ProductGrid items={items} img="/img/watch-beige.jpg" /></>
}
