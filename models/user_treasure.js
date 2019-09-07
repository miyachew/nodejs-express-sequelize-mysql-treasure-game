'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserTreasure = sequelize.define('user_treasures', {
    userId: DataTypes.INTEGER,
    treasureMoneyValueId: DataTypes.INTEGER
  }, {});
  UserTreasure.associate = function(models) {
    UserTreasure.belongsTo(models.users, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });
  };
  return UserTreasure;
};