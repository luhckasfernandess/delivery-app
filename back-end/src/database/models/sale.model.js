const moment = require("moment/moment");

module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL,
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue('saleDate')).format('DD/MM/YYYY');
      },
      },
      status: DataTypes.STRING,
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'sales'
    },
  );
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'customer',
      through: 'users',
    });
    Sale.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
      through: 'users',
    });
    Sale.hasMany(models.SaleProduct);
  };
  return Sale;
};
