'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
      id: {
        type: Sequelize.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      roomId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      userId: {
        type: Sequelize.CHAR(36),
        allowNull: false,
      },
      active: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },
      data: {
        type: Sequelize.JSON,
        allowNull: true,
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('messages')
  },
}
