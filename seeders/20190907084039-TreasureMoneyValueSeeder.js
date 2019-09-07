'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('treasure_money_values', [
        {
          treasureId: 1,
          amt: 15
        },
        {
          treasureId: 1,
          amt: 20
        },
        {
          treasureId: 2,
          amt: 10
        },
        {
          treasureId: 2,
          amt: 25
        },
        {
          treasureId: 3,
          amt: 15
        },
        {
          treasureId: 3,
          amt: 20
        },
        {
          treasureId: 4,
          amt: 15
        },
        {
          treasureId: 4,
          amt: 25
        },
        {
          treasureId: 5,
          amt: 10
        },
        {
          treasureId: 6,
          amt: 15
        },
        {
          treasureId: 7,
          amt: 15
        },
        {
          treasureId: 8,
          amt: 10
        },
        {
          treasureId: 9,
          amt: 15
        },
        {
          treasureId: 9,
          amt: 30
        },
        {
          treasureId: 10,
          amt: 15
        },
        {
          treasureId: 10,
          amt: 30
        },
        {
          treasureId: 11,
          amt: 10
        },
        {
          treasureId: 12,
          amt: 15
        },
        {
          treasureId: 13,
          amt: 15
        },
        {
          treasureId: 14,
          amt: 10
        },
        {
          treasureId: 15,
          amt: 15
        },
        {
          treasureId: 16,
          amt: 15
        },
        {
          treasureId: 17,
          amt: 10
        },
        {
          treasureId: 18,
          amt: 15
        }

    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('treasure_money_values', null, {});
  }
};
