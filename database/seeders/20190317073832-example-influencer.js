'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Influencer', [
        {
            socialId: 'fb1234567890',
            socialType: 'facebook',
            name: 'Nguyen Van A',
            email: 'nva@gmail.com',
            phone: '1234567890',
            dob: '2000-03-18T11:51:54.136Z',
            gender: 'male',
            address: '123 Tran Hung Dao, TP HCM',
            averageInteraction: 100,
            profileLink: 'https://www.facebook.com/nva',
            civilId: '5193181567',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            socialId: 'ig15678234',
            socialType: 'instagram',
            name: 'Tran B',
            email: 'tb@gmail.com',
            phone: '8471239841',
            dob: '1990-03-18T11:51:54.136Z',
            gender: 'male',
            address: '31 Ham Nghi, TP HCM',
            averageInteraction: 85,
            profileLink: 'https://www.instagram.com/tb',
            civilId: '34523789',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            socialId: 'gg91259845',
            socialType: 'instagram',
            name: 'Nguyen Ngoc C',
            email: 'nnc@gmail.com',
            phone: '148576894',
            dob: '1971-03-18T11:51:54.136Z',
            gender: 'female',
            address: '49 Phan Dang Luu, TP HCM',
            averageInteraction: 100,
            profileLink: 'https://www.facebook.com/sjlva.pattrice',
            civilId: '123321567',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        ], {});
  },

  down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Influencer', null, {});
  }
};
