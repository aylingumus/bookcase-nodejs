//create-score.js
module.exports = {
    up: (queryInterface, Sequelize) =>
      queryInterface.createTable("Scores", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        userScore: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "Users",
            key: "id",
            as: "userId",
          },
        },
        bookId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE",
          references: {
            model: "Books",
            key: "id",
            as: "bookId",
          },
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
    down: (queryInterface /* , Sequelize */) => queryInterface.dropTable("Scores"),
  }