//SCORE Schema
module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('Score', {
      bookId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      userScore: DataTypes.DOUBLE
    }, {});

    Score.associate = function(models) {
      // associations can be defined here
      Score.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
      
      Score.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      });
    };
    return Score;
  };