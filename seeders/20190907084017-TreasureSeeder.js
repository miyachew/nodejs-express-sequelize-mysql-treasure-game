'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('treasures', [
        {
          latitude: '1.33125924',
          longitude: '103.8980486',
          name: 'T1'
        },
        {
          latitude: '1.32255754',
          longitude: '103.8943086',
          name: 'T2'
        },
        {
          latitude: '1.33125924',
          longitude: '103.8891225',
          name: 'T3'
        },
        {
          latitude: '1.31286055',
          longitude: '103.8545565',
          name: 'T4'
        },
        {
          latitude: '1.34439896',
          longitude: '103.8765938',
          name: 'T5'
        },
        {
          latitude: '1.33616189',
          longitude: '103.8770866',
          name: 'T6'
        },
        {
          latitude: '1.32552844',
          longitude: '103.8691014',
          name: 'T7'
        },
        {
          latitude: '1.32303589',
          longitude: '103.8774815',
          name: 'T8'
        },
        {
          latitude: '1.33465304',
          longitude: '103.870449',
          name: 'T9'
        },
        {
          latitude: '1.32606138',
          longitude: '103.8793007',
          name: 'T10'
        },
        {
          latitude: '1.25886946',
          longitude: '103.898879',
          name: 'T11'
        },
        {
          latitude: '1.26973345',
          longitude: '103.8810448',
          name: 'T12'
        },
        {
          latitude: '1.32914713',
          longitude: '103.8334781',
          name: 'T13'
        },
        {
          latitude: '1.32960595',
          longitude: '103.8807937',
          name: 'T14'
        },
        {
          latitude: '1.33700251',
          longitude: '103.8492249',
          name: 'T15'
        },
        {
          latitude: '1.27845714',
          longitude: '103.8571762',
          name: 'T16'
        },
        {
          latitude: '1.36019784',
          longitude: '103.8563582',
          name: 'T17'
        },
        {
          latitude: '1.31551921',
          longitude: '103.8632839',
          name: 'T18'
        },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('treasures', null, {});
  }
};
