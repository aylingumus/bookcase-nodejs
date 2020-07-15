//book-migration.js
module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable("Books", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        score: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
        available: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true
        },
        userId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "Users",
            key: "id",
            as: "userId",
          },
          allowNull: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }),
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Books"),
  }