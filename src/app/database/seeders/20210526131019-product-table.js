'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */

        await queryInterface.bulkInsert(
            'Product',
            [
                {
                    name: 'Apple Iphone 12',
                    description: 'A very expensive phone from apple',
                    type: 'Gadget',
                    url: 'http://apple.com',
                },
                {
                    name: 'Apple Ipad Pro',
                    description: 'A very expensive tablet/pad from apple',
                    type: 'Gadget',
                    url: 'http://apple.com',
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete('Product', null, {});
    },
};
