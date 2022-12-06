const express = require('express');
const { getAllUsersAdminController,
  registerNewUserAdminController,
  deleteUserAdminController,
} = require('../controller/admin.controller');

const verifyAdmin = require('../middlewares/verifyAdmin');

const AdminRouter = express.Router();

AdminRouter.get('/admin', verifyAdmin, async (req, res, next) => {
  try {

    const token = req.headers.authorization;
    const allUsers = await getAllUsersAdminController(token);
    if (!allUsers.length) return res.status(401).json('Usuários não encontrados');
    return res.status(200).json(allUsers);
  } catch (e) {
    next(e);
  }
});


AdminRouter.post('/admin/register', verifyAdmin, async (req, res, next) => {
  try {
    const newUser = await registerNewUserAdminController(req.body);
    if (!newUser) return res.status(409).json('Usuário ou email ja existente');
    return res.status(201).json('Usuário cadastrado'); 
  } catch (e) {
    next(e);
  }
});

AdminRouter.delete('/admin/delete', verifyAdmin, async (req, res, next) => {
  try {
    const deleteUser = await deleteUserAdminController(req.body);
    if (!deleteUser) return res.status(401).json('Usuário nao deletado');
    return res.status(200).json('Usuário deletado');
  } catch (e) {
    next(e);
  }
});

module.exports = AdminRouter;