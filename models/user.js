'use strict';

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    name: DataTypes.STRING,
    age:  DataTypes.INTEGER.UNSIGNED,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  
  User.associate = function(models) {
    User.hasMany(models.user_treasures);
  };

  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash()
  })

  User.prototype.generatePasswordHash = () => {
    return bcrypt.hash(this.password)
  }
  return User;
};