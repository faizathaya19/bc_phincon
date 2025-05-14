'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('feedbacks', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      product_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      content_type: {
        type: Sequelize.ENUM('app', 'course', 'quiz'),
        allowNull: false,
      },
      comment: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      rating: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
        },
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('feedbacks')
  },
}
