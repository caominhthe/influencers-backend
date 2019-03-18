'use strict';

const generateInfluencerOccupationRecords = (influencers, occupations) => influencers.map(influencer => ({
  occupationId: occupations[Math.floor(Math.random() * occupations.length)].id,
  influencerId: influencer.id,
}));

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { sequelize } = queryInterface;
    const { QueryTypes } = sequelize;

    const influencers = await sequelize.query('SELECT * FROM public."Influencer"', { type: QueryTypes.SELECT });
    const occupations = await sequelize.query('SELECT * FROM public."Occupation"', { type: QueryTypes.SELECT });
    await queryInterface.bulkInsert('InfluencerOccupation', generateInfluencerOccupationRecords(influencers, occupations));
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('InfluencerOccupation', null, {});
  }
};
