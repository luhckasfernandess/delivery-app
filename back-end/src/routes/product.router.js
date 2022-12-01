const express = require('express');
const { Product } = require('../database/models');

const ProductRouter = express.Router();

ProductRouter.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByPk(id);
  return res.status(418).json(result);
});

module.exports = ProductRouter;