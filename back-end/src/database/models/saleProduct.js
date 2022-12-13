module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
    {
      saleId: { type: DataTypes.INTEGER, primaryKey: true },
      productId: { type: DataTypes.INTEGER, primaryKey: true },
      quantity: DataTypes.INTEGER,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'sales_products'
    },
  );
  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale',
      through: 'sales_products',
    });
    SaleProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
      through: 'sales_products',
    });
  };

  return SaleProduct;
};
