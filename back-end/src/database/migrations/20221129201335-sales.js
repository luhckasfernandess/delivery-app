'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' }
      },
      seller_id: {
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: { model: 'users', key: 'id' }
      },
      total_price: Sequelize.DECIMAL(9, 2),
      delivery_address: Sequelize.STRING(100),
      delivery_number: Sequelize.STRING(50),
      sale_date: Sequelize.DATE,
      status: Sequelize.STRING(50),
     });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');

  }
};
