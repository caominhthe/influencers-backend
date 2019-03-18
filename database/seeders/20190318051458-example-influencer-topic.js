'use strict';

const generateInfluencerTopicRecords = (influencers, topics) => influencers.map(influencer => ({
  topicId: topics[Math.floor(Math.random() * topics.length)].id,
  influencerId: influencer.id,
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { sequelize } = queryInterface;
    const { QueryTypes } = sequelize;

    const influencers = await sequelize.query('SELECT * FROM public."Influencer"', { type: QueryTypes.SELECT });
    const topics = await sequelize.query('SELECT * FROM public."Topic"', { type: QueryTypes.SELECT });
    await queryInterface.bulkInsert('InfluencerTopic', generateInfluencerTopicRecords(influencers, topics));
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('InfluencerTopic', null, {});
  }
};
