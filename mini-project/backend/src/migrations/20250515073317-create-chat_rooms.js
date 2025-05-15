'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('chat_rooms', {
      id: {
        type: Sequelize.CHAR(36),
        primaryKey: true,
        allowNull: false,
      },
      sessionId: {
        type: Sequelize.CHAR(36),
        allowNull: true,
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('chat_rooms')
  },
}
