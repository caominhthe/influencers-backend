'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InfluencerTopic', {
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
      topicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: { model: 'Topic', key: 'id' },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InfluencerTopic');

  }
};
