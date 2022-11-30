module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct',
    {
      saleId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
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
