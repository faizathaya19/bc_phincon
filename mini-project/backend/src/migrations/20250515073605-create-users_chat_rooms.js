// migrations/20230515101000-create-users-chat-rooms.ts
'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users_chat_rooms', {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('users_chat_rooms')
  },
}
