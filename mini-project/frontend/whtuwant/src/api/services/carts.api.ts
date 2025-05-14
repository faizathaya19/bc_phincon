import axios from 'axios'
import { ProductModel } from '../../components/models/product.model'
import { store } from '../../store'

export interface CartItem {
  id: number
  user_id: number
  product_id: number
  quantity: number
  Product: ProductModel
  createdAt: string
  updatedAt: string
}

export interface CartApiResponse {
  status: number
  message: string
  data: CartItem[]
}

const getToken = () => store.getState().auth?.accessToken

export const getCart = () =>
  axios.get<CartApiResponse>('http://localhost:3001/api/cart', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

export const addToCart = (productId: number, quantity: number) =>
  axios.post(
    'http://localhost:3001/api/cart/add',
    { product_id: productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )

export const deleteCartItem = (cartId: number) =>
  axios.delete(`http://localhost:3001/api/cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

export const checkOut = (cart_id: number[]) =>
  axios.post(
    'http://localhost:3001/api/cart/checkout',
    { cart_ids: cart_id },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  )
