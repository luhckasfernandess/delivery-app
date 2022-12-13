const { insertSaleService } = require('../service/sale.service')

const insertSaleController = async (body) => {
  const insertSale = await insertSaleService(body);
  return insertSale;
}

module.exports = {
  insertSaleController,
}