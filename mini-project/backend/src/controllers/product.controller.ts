import { Request, Response } from 'express'
import Product from '../models/product/product.model'
import ProductCategory from '../models/product/productCategory.model'
import ProductGallery from '../models/product/productGallery.model'
import { sendResponse } from '../utils/responseUtil'
import { productIdSchema } from '../validation/validationSchemas'
export const products = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll({
      include: [
        { model: ProductCategory, as: 'category' },
        { model: ProductGallery, as: 'galleries' },
      ],
    })

    return sendResponse(res, 200, 'Products retrieved successfully', products)
  } catch (error) {
    console.error('Error fetching products with relations:', error)
    return sendResponse(res, 500, 'Failed to fetch products with relations')
  }
}

export const product = async (req: Request, res: Response): Promise<void> => {
  const { error, value } = productIdSchema.validate(req.body)

  if (error) {
    return sendResponse(res, 400, error.details[0].message)
  }

  const { product_id } = value

  try {
    const product = await Product.findByPk(product_id, {
      include: [
        { model: ProductCategory, as: 'category' },
        { model: ProductGallery, as: 'galleries' },
      ],
    })

    if (!product) {
      return sendResponse(res, 404, 'Product not found')
    }

    return sendResponse(res, 200, 'Product retrieved successfully', product)
  } catch (error) {
    console.error('Error fetching product by ID with relations:', error)
    return sendResponse(res, 500, 'Failed to fetch product with relations')
  }
}
