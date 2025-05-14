export type ProductModel = {
  id: number
  name: string
  price: number
  description: string
  tags: string | null
  galleries: Galleries[]
  categories_id: number
  category: Category
  createdAt: string
  updatedAt: string
  deletedAt: null
}

export type Galleries = {
  id: number
  url: string
  products_id: number
  createdAt: string
  updatedAt: string
  deletedAt: null
}

type Category = {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  deletedAt: null
}
