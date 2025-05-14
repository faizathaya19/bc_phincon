interface Props {
  transaction: {
    id: number
    total_price: number
    status: string
    createdAt: string
  }
  onClick: () => void
}

export default function TransactionCard({ transaction, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-gray-700 font-medium">
            Transaction #{transaction.id}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(transaction.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-green-600">
            Rp {transaction.total_price.toLocaleString()}
          </p>
          <span
            className={`text-xs px-2 py-1 rounded ${
              transaction.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {transaction.status}
          </span>
        </div>
      </div>
    </div>
  )
}
