import { DataTypes, Model } from 'sequelize'
import config from '../config/configData'
import User from './Users.model'

class UsersChatRoom extends Model {
    ChatRoom: any
}

UsersChatRoom.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
    },
    userId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
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
    tableName: 'users_chat_rooms',
    timestamps: true,
  }
)

export default UsersChatRoom
