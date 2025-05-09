import { Model, DataTypes, Sequelize, Optional } from 'sequelize'
import config from '../config/configData'
import Review from './review/review.model'

interface TryoutSectionAttributes {
  id: string
  code: string
  title: string
  description?: string | null
  order?: number | null
  data?: object | null
  tag?: string | null
  active: boolean
  createdAt?: Date
  updatedAt?: Date
}

type TryoutSectionCreationAttributes = Optional<
  TryoutSectionAttributes,
  'id' | 'description' | 'order' | 'data' | 'tag' | 'createdAt' | 'updatedAt'
>

class TryoutSection
  extends Model<TryoutSectionAttributes, TryoutSectionCreationAttributes>
  implements TryoutSectionAttributes
{
  public id!: string
  public code!: string
  public title!: string
  public description?: string | null
  public order?: number | null
  public data?: object | null
  public tag?: string | null
  public active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

TryoutSection.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    code: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tag: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
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
    tableName: 'tryout_sections',
    timestamps: true,
  }
)

export default TryoutSection
