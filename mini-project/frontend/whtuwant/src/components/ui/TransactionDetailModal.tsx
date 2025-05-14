import { useEffect, useState } from 'react'
import axios from 'axios'
import { store } from '../../store'

interface Props {
  transactionId: number
  onClose: () => void
}

interface Product {
  name: string
  description: string
  price: number
}

interface Item {
  quantity: number
  price: number
  Product: Product
}

export default function TransactionDetailModal({
  transactionId,
  onClose,
}: Props) {
  const [items, setItems] = useState<Item[]>([])
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [status, setStatus] = useState<string>('') // Menambahkan status untuk transaksi
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchDetail = async () => {
    const token = store.getState().auth?.accessToken
    try {
      setLoading(true)
      setError(null) // Reset error before fetching
      const res = await axios.post(
        'http://localhost:3001/api/cart/transaction',
        { transaction_id: transactionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = res.data.data
      setItems(data.items || [])
      setTotalPrice(data.total_price || 0)
      setStatus(data.status || '') // Menyimpan status transaksi
    } catch (err: unknown) {
      console.error('Failed to fetch detail', err)
      setError('Gagal memuat detail transaksi. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDetail()
  }, [transactionId])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-red-500"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-4">
          Detail Transaksi #{transactionId}
        </h2>

        {/* Menampilkan status transaksi jika ada */}
        {status && (
          <p className="text-center text-sm text-gray-600 mb-4">
            Status: <strong>{status}</strong>
          </p>
        )}

        {/* Loading indicator */}
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p> // Error message
        ) : items.length === 0 ? (
          <p className="text-center text-gray-500">Item tidak ditemukan.</p>
        ) : (
          <>
            <ul className="space-y-4 max-h-72 overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <li key={idx} className="border p-3 rounded shadow-sm">
                  <p className="font-medium">{item.Product.name}</p>
                  <p className="text-sm text-gray-600">
                    {item.Product.description}
                  </p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Harga: Rp {item.price.toLocaleString()}
                  </p>
                  <p className="text-sm font-semibold text-gray-800">
                    Subtotal: Rp {(item.quantity * item.price).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t pt-4">
              <p className="text-right font-bold text-lg">
                Total: Rp {totalPrice.toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
