module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('apps', {
      id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('apps')
  },
}
