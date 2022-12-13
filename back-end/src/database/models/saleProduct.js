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
      tableName: 'salesProducts'
    },
  );
  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, {
      foreignKey: 'saleId',
      as: 'sale',
      through: 'salesProducts',
    });
    SaleProduct.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
      through: 'salesProducts',
    });
  };

  return SaleProduct;
};
