import React, { useEffect, useState } from 'react'
import {
  getCart,
  deleteCartItem,
  CartItem,
  checkOut,
} from '../api/services/carts.api'

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false)
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean | null>(null)
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const loadCart = async () => {
    setLoading(true)
    try {
      const response = await getCart()
      if (response.status === 200 && response.data.data) {
        setCart(response.data.data)
      } else {
        console.error('Error: Failed to load cart')
      }
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (cartId: number) => {
    try {
      await deleteCartItem(cartId)
      setCart((prev) => prev.filter((item) => item.id !== cartId))
      setSelectedItems((prev) => prev.filter((id) => id !== cartId))
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : 'Unknown error')
    }
  }

  const handleCheckout = async () => {
    if (selectedItems.length === 0) {
      alert('Please select at least one item to checkout')
      return
    }

    setIsCheckingOut(true)
    try {
      await checkOut(selectedItems)
      setCheckoutSuccess(true)
      setCart((prev) => prev.filter((item) => !selectedItems.includes(item.id)))
      setSelectedItems([])
    } catch (err: unknown) {
      console.error(err instanceof Error ? err.message : 'Unknown error')
      setCheckoutSuccess(false)
    } finally {
      setIsCheckingOut(false)
    }
  }

  const toggleItemSelection = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  const isItemSelected = (id: number) => selectedItems.includes(id)

  useEffect(() => {
    loadCart()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>

      {loading ? (
        <div className="text-center text-xl text-gray-500">Loading...</div>
      ) : cart.length === 0 ? (
        <p className="text-center text-xl text-gray-500">Your cart is empty!</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 border rounded-lg shadow-md bg-white"
              >
                <div className="flex items-center space-x-4">
                  <input
                    type="checkbox"
                    checked={isItemSelected(item.id)}
                    onChange={() => toggleItemSelection(item.id)}
                    className="form-checkbox text-blue-600"
                  />
                  <img
                    src="https://via.placeholder.com/50"
                    alt={item.Product?.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.Product?.name}
                    </h3>
                    <p className="text-gray-500">
                      Price: ${item.Product?.price}
                    </p>
                    <p className="text-sm text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-between items-center p-4 bg-gray-100 rounded-lg">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-xl font-semibold text-green-500">
              $
              {cart.reduce(
                (total, item) =>
                  total + (item.Product?.price || 0) * item.quantity,
                0
              )}
            </span>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleCheckout}
              className={`px-6 py-2 text-lg font-semibold rounded-lg ${
                isCheckingOut || selectedItems.length === 0
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={isCheckingOut || selectedItems.length === 0}
            >
              {isCheckingOut ? 'Processing...' : 'Checkout Selected'}
            </button>
          </div>

          {checkoutSuccess !== null && (
            <div className="mt-6 text-center">
              {checkoutSuccess ? (
                <p className="text-green-500">
                  Checkout successful! Your order is being processed.
                </p>
              ) : (
                <p className="text-red-500">
                  Checkout failed. Please try again.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CartPage
