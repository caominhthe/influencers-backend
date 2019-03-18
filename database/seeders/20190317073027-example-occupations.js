'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Occupation', [
        {
            name: 'Developer',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Actor',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Writer',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Director',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Streamer',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Occupation', null, {});
  }
};
