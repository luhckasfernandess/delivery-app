const md5 = require('md5');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { User } = require('../database/models');

const checkUserService = async (body) => {
  const { email, password } = body;
  const md5decrypted = md5(password);
  const result = await User.findOne({ where: { email, password: md5decrypted } });
  if (result) {
    const generateToken = jwt.sign({ email, password }, 'grupo20');
    return generateToken;
  }
  return result;
};

const getUserService = async (token) => {
  const decrypt = jwt.verify(token, 'grupo20');
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
      name, email, password: md5decrypted,
    });
    return newUser;    
  } return null;
};

module.exports = {
  checkUserService,
  getUserService,
  createNewUserService,
};