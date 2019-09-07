'use strict';

const bcrypt = require('bcryptjs');
const saltRounds = 10;

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('users', [
        {
          name: 'U1',
          age: 21,
          password: bcrypt.hashSync('luckyshine001', saltRounds),
          email: 'u1@luckyshine.xyz'
        },
        {
          name: 'U2',
          age: 51,
          password: bcrypt.hashSync('luckyshine002', saltRounds),
          email: 'u2@luckyshine.xyz'
        },
        {
          name: 'U3',
          age: 31,
          password: bcrypt.hashSync('luckyshine003', saltRounds),
          email: 'u3@luckyshine.xyz'
        },
        {
          name: 'U4',
          age: 18,
          password: bcrypt.hashSync('luckyshine004', saltRounds),
          email: 'u4@luckyshine.xyz'
        },
        {
          name: 'U5',
          age: 21,
          password: bcrypt.hashSync('luckyshine005', saltRounds),
          email: 'u5@luckyshine.xyz'
        },
        {
          name: 'U6',
          age: 35,
          password: bcrypt.hashSync('luckyshine006', saltRounds),
          email: 'u6@luckyshine.xyz'
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
