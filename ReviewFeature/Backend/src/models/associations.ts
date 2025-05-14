import Course from './Course.model'
import Review from './review.model'
import TryoutSection from './tryoutSection.model'
import User from './users.model'

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
}
