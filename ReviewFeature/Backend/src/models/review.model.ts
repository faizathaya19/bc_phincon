import { DataTypes, Model, Optional, Sequelize } from 'sequelize'
import config from '../config/configData'
import User from './users.model'

interface ReviewAttributes {
  id: string
  user_id: string
  referenceId: string
  type: string
  rating: number
  content: string
  image?: string | null
  data?: object | null
  active: boolean
  createdAt: Date
  updatedAt: Date
}

type ReviewCreationAttributes = Optional<
  ReviewAttributes,
  'id' | 'createdAt' | 'updatedAt'
>

class Review
  extends Model<ReviewAttributes, ReviewCreationAttributes>
  implements ReviewAttributes
{
  public id!: string
  public user_id!: string
  public referenceId!: string
  public type!: string
  public rating!: number
  public content!: string
  public image?: string | null
  public data?: object | null
  public active!: boolean
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Review.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    referenceId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: null,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
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
    tableName: 'reviews',
    timestamps: true,
  }
)

export default Review
