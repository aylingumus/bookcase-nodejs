//BOOK Schema
module.exports = (sequelize, DataTypes) => {
    let Book = sequelize.define("Book", {
      name: DataTypes.STRING,
      score: DataTypes.DOUBLE,
      available: DataTypes.BOOLEAN,
      userId: DataTypes.INTEGER,
    })
    
    Book.associate = function(models) {
      Book.hasMany(models.Score, {
        foreignKey: "bookId",
        as: "scores",
      });

      Book.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
    return Book;
  }