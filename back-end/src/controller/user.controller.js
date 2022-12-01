const { checkUserService, getUserService } = require('../service/user.service')

const checkUserController = async (body) => {
  const result = await checkUserService(body)
  return result;
}

const getUserController = async (token) => {
  const getUser = await getUserService(token)
  return getUser;
}

module.exports = {
  checkUserController,
  getUserController,
}