'use strict';
module.exports = (sequelize, DataTypes) => {
  const Treasure = sequelize.define('treasures', {
    name: DataTypes.STRING,
    latitude: DataTypes.DECIMAL(16,8),
    longitude: DataTypes.DECIMAL(16,8)
  }, {});

  Treasure.associate = function(models) {
    Treasure.hasMany(models.treasure_money_values);
  };
  return Treasure;
};