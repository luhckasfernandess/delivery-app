const express = require('express');
const {
  getOneProductController,
  getAllProductsController,
} = require('../controller/product.controller');

const ProductRouter = express.Router();

ProductRouter.get('/products/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const getOneProduct = await getOneProductController(id);
    if (!getOneProduct) return res.status(404).json('Produto não encontrado');
    return res.status(418).json(getOneProduct);
  } catch (e) {
    next(e);
  }
});

ProductRouter.get('/products', async (_req, res, next) => {
  try {
    const allProducts = await getAllProductsController();
    return res.status(200).json(allProducts);
  } catch (e) {
    next(e);
  }
});

module.exports = ProductRouter;