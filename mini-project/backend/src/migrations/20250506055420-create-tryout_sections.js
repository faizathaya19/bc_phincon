module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tryout_sections', {
      id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      code: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true, // Mengatur supaya `code` unik
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: null,
      },
      data: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: null,
      },
      tag: {
        type: Sequelize.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      active: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('tryout_sections')
  },
}
