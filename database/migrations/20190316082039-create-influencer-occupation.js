'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InfluencerOccupation', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      influencerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'Influencer', key: 'id' },
      },
      occupationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'Occupation', key: 'id' },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InfluencerOccupation');
  }
};

