import React from 'react'
import { ProductModel } from '../models/product.model'
import { ProductImageGallery } from '../ui/ProductImageGallery'

interface ProductInfoProps {
  product: ProductModel
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div>
      <ProductImageGallery images={product.galleries} />
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <p className="text-2xl font-semibold text-gray-700">
        {product.price.toLocaleString('id-ID')}
      </p>
      <p className="text-gray-600">
        {product.description?.slice(0, 200)}
        {product.description && product.description.length > 200 && '...'}
      </p>
    </div>
  )
}
