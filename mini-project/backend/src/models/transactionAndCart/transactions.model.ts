import { DataTypes, Model, Optional } from 'sequelize'
import config from '../../config/configData'
import User from '../users/users.model'

interface TransactionAttributes {
  id: number
  user_id: number
  total_price: number
  status: string
}

interface TransactionCreationAttributes
  extends Optional<TransactionAttributes, 'id'> {}

class Transaction
  extends Model<TransactionAttributes, TransactionCreationAttributes>
  implements TransactionAttributes
{
  public id!: number
  public user_id!: number
  public total_price!: number
  public status!: string
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'pending',
    },
  },
  {
    sequelize: config.database,
    tableName: 'transactions',
    timestamps: true,
  }
)

export default Transaction
