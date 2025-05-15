import ChatRoom from './chatRoom.model'
import Course from './Course.model'
import Message from './Message.model'
import Review from './review.model'
import TryoutSection from './tryoutSection.model'
import User from './Users.model'
import UsersChatRoom from './usersChatRoom.model'

export const setupAssociations = () => {
  TryoutSection.hasMany(Review, { foreignKey: 'referenceId', as: 'reviews' })

  User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' })

  Course.hasMany(Review, { foreignKey: 'referenceId', as: 'reviews' })

  Review.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  })

  Review.belongsTo(Course, {
    foreignKey: 'referenceId',
    constraints: false,
    as: 'course',
  })

  Review.belongsTo(TryoutSection, {
    foreignKey: 'referenceId',
    constraints: false,
    as: 'tryoutSection',
  })

  ChatRoom.hasMany(UsersChatRoom, { foreignKey: 'roomId' })
  UsersChatRoom.belongsTo(ChatRoom, { foreignKey: 'roomId' })

  User.hasMany(UsersChatRoom, { foreignKey: 'userId' })
  UsersChatRoom.belongsTo(User, { foreignKey: 'userId' })

  ChatRoom.hasMany(Message, { foreignKey: 'roomId' })
  Message.belongsTo(ChatRoom, { foreignKey: 'roomId' })
}
