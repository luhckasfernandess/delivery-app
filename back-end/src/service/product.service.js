const { Product } = require('../database/models');

const getOneProductService = async (id) => {
  const getOneProduct = await Product.findByPk(id)
  return getOneProduct;
}

const getAllProductsService = async () => {
  const allProducts = await Product.findAll();
  return allProducts;
}

module.exports = {
  getOneProductService,
  getAllProductsService,
}