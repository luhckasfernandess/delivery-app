const express = require('express');
const { SaleProduct } = require('../database/models');

const SaleProductRouter = express.Router();

SaleProductRouter.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await SaleProduct.findByPk(id);
  return res.status(418).json(result);
});

module.exports = SaleProductRouter;