const express = require('express');
const Router = express.Router();
const { User } = require('../../database/models')

Router.get('/coffee', async (_req, res) => {
  const result = await User.findByPk(2);
  return res.status(418).json(result)
})






module.exports = Router