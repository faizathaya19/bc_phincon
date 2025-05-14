import { DataTypes, Model, Optional } from 'sequelize'
import config from '../../config/configData'

interface ProductCategorysAttributes {
  id: number
  name: string
}

interface ProductCategoryCreationAttributes
  extends Optional<ProductCategorysAttributes, 'id'> {}

class ProductCategory
  extends Model<ProductCategorysAttributes, ProductCategoryCreationAttributes>
  implements ProductCategorysAttributes
{
  public id!: number
  public name!: string

  // timestamps (opsional)
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  public readonly deletedAt!: Date | null
}

ProductCategory.init(
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
  },
  {
    sequelize: config.database,
    tableName: 'pcategories',
    paranoid: true,
    timestamps: true,
  }
)

export default ProductCategory
