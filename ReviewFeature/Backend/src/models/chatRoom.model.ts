import { DataTypes, Model } from 'sequelize'
import config from '../config/configData'

class ChatRoom extends Model {
    id: any
}

ChatRoom.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.CHAR(36),
      allowNull: true,
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
    tableName: 'chat_rooms',
    timestamps: true,
  }
)

export default ChatRoom
