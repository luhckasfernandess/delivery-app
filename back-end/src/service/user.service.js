const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const fs = require('fs');
const { User } = require('../database/models');

const secret = fs.readFileSync('jwt.evaluation.key', { encoding: 'utf-8' });

const checkUserService = async (body) => {
  const { email, password } = body;
  const md5decrypted = md5(password);
  const result = await User.findOne({ where: { email, password: md5decrypted } });
  if (result) {
    const generateToken = jwt.sign({ email, password }, secret);
    return generateToken;
  }
  return result;
};

const getUserService = async (token) => {
  const decrypt = jwt.verify(token, secret);
  const md5decrypted = md5(decrypt.password);
  const result = await User.findOne({ where: { email: decrypt.email, password: md5decrypted } });
  if (result) {
    const user = {
      name: result.dataValues.name,
      email: result.dataValues.email,
      role: result.dataValues.role,
    };
    return user;
 } return result;
};

const createNewUserService = async (body) => {
  const { name, email, password } = body;
  const findNameOrEmail = await User.findOne({
    where: { [Op.or]: [{ name }, { email }] } });
  if (!findNameOrEmail) {
    const md5decrypted = md5(password);
    const newUser = await User.create({
      name, email, password: md5decrypted, role: 'customer',
    });
    return newUser;    
  } return null;
};

const getAllUsers = async (token) => {
  const decryptToken = jwt.verify(token, secret);
  const allUsers = await User.findAll({
    attributes: { exclude: ['password'] },
    where: {
      email: {
        [Op.notLike]: decryptToken.email,
      },
    },
  });
  return allUsers;
};

const registerNewUserService = async (user) => {
  const { name, email } = user;
  const findNameOrEmail = await User.findOne({
    where: { [Op.or]: [{ name }, { email }] },
  });
  if (!findNameOrEmail) {
    const newUser = await User.create({
      name: user.name, password: md5(user.password), email: user.email, role: user.role,
    });
    return newUser;
  } return null;
};

const deleteUserService = async (user) => {
  const userDelete = await User.destroy({
    where: {
      name: user.name,
    },
  });
  return userDelete;
};

module.exports = {
  checkUserService,
  getUserService,
  createNewUserService,
  getAllUsers,
  registerNewUserService,
  deleteUserService,
};