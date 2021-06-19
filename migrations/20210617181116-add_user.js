'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Users',
        'image',
        { type: Sequelize.STRING }
      ),
      queryInterface.addColumn(
        'Users',
        'bio',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Users', 'image'),
      queryInterface.removeColumn('Users', 'bio')
    ])
  }
};
