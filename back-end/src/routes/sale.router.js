const express = require('express');
const { Sale } = require('../database/models');

const SaleRouter = express.Router();

SaleRouter.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Sale.findByPk(id);
  return res.status(418).json(result);
});

SaleRouter.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Sale.findAll({
    where: { user_id: id }
  });
  return res.status(200).json(result);
})

module.exports = SaleRouter;