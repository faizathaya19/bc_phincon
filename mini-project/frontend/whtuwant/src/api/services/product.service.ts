import axios from 'axios'
import { ProductModel } from '../../components/models/product.model'
import { store } from '../../store'

export const fetchProductById = async (
  productId: string
): Promise<ProductModel> => {
  const response = await axios.post('http://localhost:3001/api/product', {
    product_id: productId,
  })
  return response.data.data
}

export const getAllProducts = async () => {
  const response = await fetch('http://localhost:3001/api/product/all')
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export const addToCart = async (product_id: string, quantity: number) => {
  const token = (store.getState().auth as { accessToken: string | null })
    .accessToken
  return await axios.post(
    'http://localhost:3001/api/cart/add',
    {
      product_id,
      quantity,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
}
