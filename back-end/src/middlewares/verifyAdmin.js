const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../database/models');

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decryptToken = await jwt.verify(token, 'grupo20');
    const findAdmUser = await User.findOne({
      where: { [Op.and]: [{ email: decryptToken.email }, { role: 'administrator' }] },
    });
    if (!findAdmUser) return res.status(401).json('Admin necessário');
  } catch (e) {
    return res.status(401).json('Necessário token de administrador');
  }
  next();
};

module.exports = verifyAdmin;