import { DataTypes, Model, Optional } from 'sequelize'
import config from '../../config/configData'
import User from '../users/users.model'

interface CartAttributes {
  id: number
  user_id: number
  product_id: number
  quantity: number
}

interface CartCreationAttributes extends Optional<CartAttributes, 'id'> {}

class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number
  public user_id!: number
  public product_id!: number
  public quantity!: number
  Product: any
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize: config.database,
    tableName: 'carts',
    timestamps: true,
  }
)

export default Cart
