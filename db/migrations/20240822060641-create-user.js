'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdOn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      createdBy: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updatedOn: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedBy: {
        type: Sequelize.STRING,
        allowNull: true
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
