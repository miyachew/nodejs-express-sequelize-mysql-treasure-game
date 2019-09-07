'use strict';
module.exports = (sequelize, DataTypes) => {
  const Treasure_money_value = sequelize.define('treasure_money_values', {
    treasureId: DataTypes.INTEGER,
    amt: DataTypes.INTEGER
  }, {});

  Treasure_money_value.associate = function(models) {
    Treasure_money_value.belongsTo(models.treasures,{
      foreignKey:'treasureId',
      as: 'treasure',
      onDelete: 'CASCADE'
    });
  };
  
  return Treasure_money_value;
};