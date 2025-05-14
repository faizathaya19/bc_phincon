import config from '../config/configData'
import { Model, DataTypes, Optional, Sequelize } from 'sequelize'

interface AppAttributes {
  id: string
  createdAt: Date
  updatedAt: Date
}

type AppCreationAttributes = Optional<
  AppAttributes,
  'id'
>

class App
  extends Model<AppAttributes, AppCreationAttributes>
  implements AppAttributes
{
  public id!: string
 
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
  reviews: any
}

App.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize: config.database,
    tableName: 'apps',
    timestamps: true,
  }
)

export default App
