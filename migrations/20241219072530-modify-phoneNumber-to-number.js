module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename 'phoneNumber' to 'number'
    await queryInterface.renameColumn('users', 'phoneNumber', 'number');
    
    // Change the data type of 'number' to INTEGER
    await queryInterface.changeColumn('users', 'number', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Revert column name back to 'phoneNumber'
    await queryInterface.renameColumn('users', 'number', 'phoneNumber');
    
    // Revert column type back to STRING
    await queryInterface.changeColumn('users', 'phoneNumber', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },
};
