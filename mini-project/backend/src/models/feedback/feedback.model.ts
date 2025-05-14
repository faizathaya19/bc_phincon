import { DataTypes, Model } from 'sequelize'
import config from '../../config/configData'
import User from '../users/users.model'

class Feedback extends Model {
  public id!: number
  public user_id!: number
  public content_type!: 'app' | 'course' | 'quiz'
  public product_id!: number
  public rating!: number
  public comment!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Feedback.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
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
    content_type: {
      type: DataTypes.ENUM('app', 'course', 'quiz'),
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    rating: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    sequelize: config.database,
    tableName: 'feedbacks',
  }
)

export default Feedback
