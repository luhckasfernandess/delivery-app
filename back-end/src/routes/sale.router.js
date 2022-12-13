const express = require('express');
const { Sale } = require('../database/models');
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

// SaleRouter.get('/all', async (req, res) => {
//   const result = await Sale.findAll({
//     include: [
//       {
//         model: SaleProduct, include: [
//           { model: Product, as: 'product' }
//         ]
//       },
//       {
//         model: User, as: 'customer'
//       },
//       {
//         model: User, as: 'seller'
//       }
//     ]
//   });
//   return res.status(418).json(result);
// });
module.exports = SaleRouter;