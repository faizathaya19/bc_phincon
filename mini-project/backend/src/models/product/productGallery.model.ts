import { DataTypes, Model, Optional } from 'sequelize'
import config from '../../config/configData'

interface ProductGalleryAttributes {
  id: number
  products_id: number
  url: string
}

interface ProductGalleryCreationAttributes
  extends Optional<ProductGalleryAttributes, 'id'> {}

class ProductGallery
  extends Model<ProductGalleryAttributes, ProductGalleryCreationAttributes>
  implements ProductGalleryAttributes
{
  public id!: number
  public products_id!: number
  public url!: string
}

ProductGallery.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    products_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: config.database,
    tableName: 'pgalleries',
    paranoid: true,
    timestamps: true,
  }
)

export default ProductGallery
