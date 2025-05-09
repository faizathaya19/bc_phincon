import { DataTypes, Model, Optional } from 'sequelize'
import config from '../../config/configData'

interface ProductAttributes {
  id: number
  name: string
  price: number
  description: string
  tags: string
  categories_id: number
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number
  public name!: string
  public price!: number
  public description!: string
  public tags!: string
  public categories_id!: number

  // timestamps (opsional)
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date | null
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categories_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize: config.database,
    tableName: 'products',
    paranoid: true,
    timestamps: true,
  }
)

export default Product
