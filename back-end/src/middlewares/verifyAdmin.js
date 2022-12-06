const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const fs = require('fs');
const { User } = require('../database/models');

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const verifyAdmin = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    const decryptToken = await jwt.verify(token, secret);
    const findAdmUser = await User.findOne({
      where: { [Op.and]: [{ email: decryptToken.email }, { role: 'administrator' }] },
    });

    if (!findAdmUser) return res.status(401).json('Necessário token de administrador');
  } catch (e) {
    return res.status(401).json('Necessário token');
  }
  next();
};

module.exports = verifyAdmin;