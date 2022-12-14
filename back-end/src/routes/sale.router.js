const express = require('express');
const { Sale, User } = require('../database/models');
const { insertSaleController } = require('../controller/sale.controller');

const SaleRouter = express.Router();

SaleRouter.post('/checkout', async (req, res) => {
  const { body } = req;
  const insertSale = await insertSaleController(body);
  return res.status(201).json(insertSale);
});

SaleRouter.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Sale.findByPk(id);
  return res.status(418).json(result);
});

SaleRouter.get('/details/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Sale.findOne({
    where: { id },
    include: [
      {
        model: User,
as: 'seller',
        attributes: { exclude: ['id', 'password', 'email', 'role'] },
    },
    ],
  });
  return res.status(200).json(result);
});

SaleRouter.get('/orders/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Sale.findAll({
    where: { userId: id },
  });
  return res.status(200).json(result);
});

module.exports = SaleRouter;
