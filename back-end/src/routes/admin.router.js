const express = require('express');
const { getAllUsersAdminController,
  registerNewUserAdminController,
  deleteUserAdminController,
} = require('../controller/admin.controller')

const AdminRouter = express.Router();

AdminRouter.get('/admin', async (_req, res, next) => {
  try {
    const allUsers = await getAllUsersAdminController();
    if (!allUsers.length) return res.status(401).json('Usuários não encontrados')
    return res.status(200).json(allUsers)
  } catch (e) {
    next(e);
  }
})

AdminRouter.post('/admin/register', async (req, res) => {
  const newUser = await registerNewUserAdminController(req.body);
  if (!newUser) return res.status(401).json('Usuário não cadastrado')
  return res.status(200).json(newUser)
})

AdminRouter.delete('/admin/delete', async (req, res, next) => {
  try {
    const deleteUser = await deleteUserAdminController(req.body);
    if (!deleteUser) return res.status(401).json('Usuário nao deletado')
    return res.status(200).json('Usuário deletado');
  } catch (e) {
    next(e);
  }
})

module.exports = AdminRouter;