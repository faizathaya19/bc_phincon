import { useEffect, useState } from 'react'
import axios from 'axios'
import { store } from '../store'
import TransactionDetailModal from '../components/ui/TransactionDetailModal'

interface Transaction {
  id: number
  createdAt: string
  status: string // Menambahkan properti status pada transaksi
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchTransactions = async () => {
    const token = store.getState().auth?.accessToken
    try {
      setLoading(true)
      const res = await axios.get(
        'http://localhost:3001/api/cart/transactions',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      setTransactions(res.data.data || [])
    } catch (err) {
      console.error('Failed to fetch transactions', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Riwayat Transaksi</h1>

      {loading ? (
        <p className="text-center text-gray-500">Memuat transaksi...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada transaksi.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="p-4 border rounded shadow-sm hover:shadow-md transition cursor-pointer bg-white"
              onClick={() => setSelectedId(tx.id)}
            >
              <p className="font-semibold text-lg">Transaksi #{tx.id}</p>
              <p className="text-gray-600 text-sm">
                Tanggal: {new Date(tx.createdAt).toLocaleString()}
              </p>

              {/* Menampilkan status transaksi */}
              <p className="text-sm text-gray-500">
                Status: <strong>{tx.status || 'Pending'}</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedId && (
        <TransactionDetailModal
          transactionId={selectedId}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}
