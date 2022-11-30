const express = require('express');
const UsersRouter = express.Router();
const userController = require('../controller/user.controller')

UsersRouter.post('/users', async (req, res) => {
  const { body } = req;
  console.log(body);
  const result = await userController(body);
  if(!result) return res.status(404).json('usuário ou senha inválidos')
  return res.status(200).json('usuário encontrado')
})

module.exports = UsersRouter