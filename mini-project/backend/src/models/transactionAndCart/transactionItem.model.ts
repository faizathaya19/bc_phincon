import { DataTypes, Model, Optional } from 'sequelize'
import config from '../../config/configData'

interface TransactionItemAttributes {
  id: number
  transaction_id: number
  product_id: number
  quantity: number
  price: number
}

interface TransactionItemCreationAttributes
  extends Optional<TransactionItemAttributes, 'id'> {}

class TransactionItem extends Model<
  TransactionItemAttributes,
  TransactionItemCreationAttributes
> {
  public id!: number
  public transaction_id!: number
  public product_id!: number
  public quantity!: number
  public price!: number
}

TransactionItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    transaction_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: config.database,
    tableName: 'transaction_items',
    timestamps: true,
  }
)

export default TransactionItem
