import { DataTypes, Model, Optional } from 'sequelize'
import config from '../config/configData'

interface UserAttributes {
  id: string
  fullname: string
  username: string
  email: string
  phoneNumber: string
  password: string
  active: boolean
  data?: object | null
  createdAt?: Date
  updatedAt?: Date
}

type UserCreationAttributes = Optional<
  UserAttributes,
  'id' | 'data' | 'createdAt' | 'updatedAt'
>

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string
  public fullname!: string
  public username!: string
  public email!: string
  public phoneNumber!: string
  public password!: string
  public active!: boolean
  public data?: object | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize: config.database,
    tableName: 'users',
    timestamps: true,
  }
)

export default User
