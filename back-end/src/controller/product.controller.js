const {
  getOneProductService,
  getAllProductsService,
} = require('../service/product.service')

const getOneProductController = async (id) => {
  const getOneProduct = await getOneProductService(id);
  return getOneProduct;
}

const getAllProductsController = async () => {
  const allProducts = getAllProductsService();
  return allProducts;
} 

module.exports = {
  getOneProductController,
  getAllProductsController,
}