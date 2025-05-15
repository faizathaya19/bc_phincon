import { DataTypes, Model } from 'sequelize'
import config from '../config/configData'

class Message extends Model {
  declare id: string
  declare roomId: string
  declare userId: string
  declare message: string
  declare active: number
  declare data: object | null
  declare createdAt: Date
  declare updatedAt: Date
}

Message.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: { model: 'chat_rooms', key: 'id' },
      onDelete: 'CASCADE',
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize: config.database,
    tableName: 'messages',
    timestamps: true,
    underscored: false,
  }
)

export default Message
