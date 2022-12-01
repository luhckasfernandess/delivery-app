const express = require('express');
const UsersRouter = express.Router();
const { checkUserController, getUserController } = require('../controller/user.controller')

UsersRouter.post('/login', async (req, res) => {
  const { body } = req;
  const result = await checkUserController(body);
  if (!result) return res.status(404).json('usuário ou senha inválidos')
  return res.status(200).json({ token: result })
})

UsersRouter.get('/login', async (req, res) => {
  const token = req.headers.authorization;
  const result = await getUserController(token);
  if (!result) return res.status(404).json('usuário ou senha inválidos')
  return res.status(200).json(result)
})

module.exports = UsersRouter