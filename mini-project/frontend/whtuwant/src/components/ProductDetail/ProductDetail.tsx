import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ProductInfo } from './ProductInfo'
import { QuantitySelector } from './QuantitySelector'
import { FeedbackForm } from './FeedbackForm'
import { FeedbackList } from './FeedbackList'
import { addToCart, fetchProductById } from '../../api/services/product.service'
import { getFeedbackByProductId } from '../../api/services/feedback.service'
import { ProductModel } from '../models/product.model'
import { FeedbackModel } from '../models/feedback.model'
import { Loader2, AlertCircle } from 'lucide-react'
import { Button } from '../ui/button'

const ProductDetail: React.FC = () => {
  const { product_id } = useParams<{ product_id: string }>()
  const [product, setProduct] = useState<ProductModel | null>(null)
  const [feedbacks, setFeedbacks] = useState<FeedbackModel[]>([])
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProductData = async () => {
      if (!product_id) {
        setError('ID Produk tidak valid.')
        setLoading(false)
        return
      }

      try {
        const response = await fetchProductById(product_id)
        setProduct(response)
      } catch (err) {
        console.error(err)
        setError('Terjadi kesalahan saat memuat data produk.')
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [product_id])

  useEffect(() => {
    const fetchFeedbackData = async () => {
      if (!product_id) return

      try {
        const response = await getFeedbackByProductId(product_id)

        const sortedFeedbacks = response
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        setFeedbacks(sortedFeedbacks)
      } catch (err) {
        console.error(err)
        // Tidak setError global agar tidak ganggu UI produk
      }
    }

    fetchFeedbackData()
  }, [product_id])

  const handleAddToCart = async () => {
    if (!product || !product_id) return
    try {
      await addToCart(product_id, quantity)
      alert('Produk berhasil ditambahkan ke keranjang!')
    } catch (err) {
      console.error(err)
      alert('Gagal menambahkan ke keranjang.')
    }
  }

  if (loading)
    return <Loader2 className="w-12 h-12 animate-spin text-indigo-600" />

  if (error)
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <div className="text-red-600 flex flex-col items-center gap-3">
          <AlertCircle className="w-10 h-10" />
          <p>{error}</p>
          <Button
            variant="destructive"
            onClick={() => window.location.reload()}
          >
            Coba Lagi
          </Button>
        </div>
      </div>
    )

  if (!product)
    return <div className="text-center py-12">Produk tidak ditemukan.</div>

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <ProductInfo product={product} />
        <div className="flex flex-col gap-4">
          <QuantitySelector value={quantity} setValue={setQuantity} />
          <Button onClick={handleAddToCart}>Tambah ke Keranjang</Button>
        </div>
      </div>
      {product_id && (
        <FeedbackForm productId={product_id} setFeedbacks={setFeedbacks} />
      )}
      <FeedbackList feedbacks={feedbacks} />
    </div>
  )
}

export default ProductDetail
