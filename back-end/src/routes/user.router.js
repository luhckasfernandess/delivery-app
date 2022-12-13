const express = require('express');

const UsersRouter = express.Router();
const { getAllUsersByRole } = require('../service/user.service')
const {
  checkUserController,
  getUserController,
  createNewUserController,
  
} = require('../controller/user.controller');

UsersRouter.post('/login', async (req, res, next) => {
  try {
    const { body } = req;
    const result = await checkUserController(body);
    if (!result) return res.status(404).json('usuário ou senha inválidos');
    return res.status(200).json({ token: result });
  } catch (e) {
    next(e);
  }
});

UsersRouter.get('/login', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = await getUserController(token);
    if (!result) return res.status(404).json('usuário ou senha inválidos');
    return res.status(200).json(result);
  } catch (e) {
    next(e);
  }
});

UsersRouter.post('/register', async (req, res, next) => {
  try {
    const newUser = await createNewUserController(req.body);
    if (!newUser) return res.status(409).json('Nome ou Email já existente');
    return res.status(201).json('Usuário criado');
  } catch (e) {
    next(e);
  }
});

UsersRouter.get('/sellers', async (_req, res, next) => {
  try {
    const allSellers = await getAllUsersByRole('seller')
    return res.status(200).json(allSellers)
  } catch (e) {
    next(e);
  }
})

module.exports = UsersRouter;