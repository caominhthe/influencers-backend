'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Topic', [
        {
            name: 'Politic',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Fashion',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Music',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Cuisine',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Car',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Topic', null, {});
  }
};
