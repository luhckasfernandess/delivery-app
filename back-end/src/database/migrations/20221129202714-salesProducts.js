'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', { 
      sale_id: {
        type: Sequelize.INTEGER,
        references: {
         model: 'sales',
         key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',     
        primaryKey: true,
       },
       product_id: {
        type: Sequelize.INTEGER,
        references: {
         model: 'products',
         key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
       },
       quantity: Sequelize.INTEGER,

     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('sales_products');

  }
};
