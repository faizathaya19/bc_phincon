import config from '../config/configData'
import { Model, DataTypes, Optional, Sequelize } from 'sequelize'
import Review from './review/review.model'

interface CourseAttributes {
  id: string
  code: string
  title: string
  description?: string | null
  order?: number | null
  data?: object | null
  tag?: string | null
  active: number
  createdAt: Date
  updatedAt: Date
}

type CourseCreationAttributes = Optional<
  CourseAttributes,
  'id' | 'description' | 'order' | 'data' | 'tag'
>

class Course
  extends Model<CourseAttributes, CourseCreationAttributes>
  implements CourseAttributes
{
  public id!: string
  public code!: string
  public title!: string
  public description!: string | null
  public order!: number | null
  public data!: object | null
  public tag!: string | null
  public active!: number
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
    reviews: any
}

Course.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
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
      defaultValue: null,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
    tag: {
      type: DataTypes.STRING(255),
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
    tableName: 'courses',
    timestamps: true,
  }
)

export default Course
