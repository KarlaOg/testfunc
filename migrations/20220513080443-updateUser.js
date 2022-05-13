'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
<<<<<<< HEAD:migrations/20220513080737-users.js
=======
     await queryInterface.renameColumn('Users', 'firstName', 'firstname');
>>>>>>> bb9384b (wip):migrations/20220513080443-updateUser.js
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
