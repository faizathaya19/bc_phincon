import { useEffect, useState } from 'react'
import { getAllProducts } from '../api/services/product.service'
import Card from '../components/ui/Card'
import { ProductModel } from '../components/models/product.model'

export default function ProductList() {
  const [products, setProducts] = useState<ProductModel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts()
        setProducts(data.data)
      } catch (err) {
        console.log(`Exception while doing something: ${err}`)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  if (loading) return <p className="text-center">Loading...</p>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {products.map(
        (product) => (
          console.log('ProductList product:', product.id),
          (
            <Card
              key={product.id}
              product_id={product.id}
              title={product.name}
              description={product.description}
              image={product.galleries[1]?.url}
            />
          )
        )
      )}
    </div>
  )
}
