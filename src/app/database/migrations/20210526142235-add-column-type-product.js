'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        return queryInterface
            .addColumn('Product', 'type', {
                allowNull: false,
                type: Sequelize.STRING,
            })
            .then(() => {
                const migrationQuery = `update Product set type='Gadget' where IsDeleted = 0;`;
                return queryInterface.sequelize.query(migrationQuery);
            });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
    },
};
