const {
  checkUserService,
  getUserService,
  createNewUserService,
} = require('../service/user.service');

const checkUserController = async (body) => {
  const result = await checkUserService(body);
  return result;
};

const getUserController = async (token) => {
  const getUser = await getUserService(token);
  return getUser;
};

const createNewUserController = async (body) => {
  const createUser = await createNewUserService(body);
  return createUser;
};

module.exports = {
  checkUserController,
  getUserController,
  createNewUserController,
};