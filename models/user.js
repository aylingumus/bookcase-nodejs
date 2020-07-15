//USER Schema
module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
      name: DataTypes.STRING,
    })
    
    User.associate = function(models) {
      User.hasMany(models.Score, {
        foreignKey: "userId",
        as: "scores",
      })
    }
    return User;
  }