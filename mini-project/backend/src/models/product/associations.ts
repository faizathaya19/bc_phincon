import Feedback from '../feedback/feedback.model'
import Cart from '../transactionAndCart/cart.model'
import Product from './product.model'
import ProductCategory from './productCategory.model'
import ProductGallery from './productGallery.model'
import TransactionItem from '../transactionAndCart/transactionItem.model'
import Transaction from '../transactionAndCart/transactions.model'
import User from '../users/users.model'
import Course from '../Course.model'
import Review from '../review/review.model'
import TryoutSection from '../tryoutSection.model'

export const setupAssociations = () => {
  Product.belongsTo(ProductCategory, {
    foreignKey: 'categories_id',
    as: 'category',
  })

  Product.hasMany(ProductGallery, {
    foreignKey: 'products_id',
    as: 'galleries',
  })

  ProductCategory.hasMany(Product, {
    foreignKey: 'categories_id',
    as: 'products',
  })

  ProductGallery.belongsTo(Product, {
    foreignKey: 'products_id',
    as: 'product',
  })

  Product.hasMany(Feedback, { foreignKey: 'product_id', as: 'feedbacks' })

  Feedback.belongsTo(Product, { foreignKey: 'product_id', as: 'product' })

  Product.hasMany(Cart, { foreignKey: 'product_id' })
  Product.hasMany(TransactionItem, { foreignKey: 'product_id' })

  Cart.belongsTo(Product, { foreignKey: 'product_id' })

  Transaction.hasMany(TransactionItem, {
    foreignKey: 'transaction_id',
    as: 'items',
  })

  TransactionItem.belongsTo(Transaction, { foreignKey: 'transaction_id' })
  TransactionItem.belongsTo(Product, { foreignKey: 'product_id' })

  User.hasMany(Feedback, { foreignKey: 'user_id', as: 'feedbacks' })
  Feedback.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

  TryoutSection.hasMany(Review, { foreignKey: 'referenceId', as: 'reviews' })

  User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' })

  Course.hasMany(Review, { foreignKey: 'referenceId', as: 'reviews' })

  Review.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  })

  Review.belongsTo(Course, {
    foreignKey: 'referenceId',
    constraints: false,
    as: 'course',
  })

  Review.belongsTo(TryoutSection, {
    foreignKey: 'referenceId',
    constraints: false,
    as: 'tryoutSection',
  })
}
