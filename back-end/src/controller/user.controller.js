const userService = require('../service/user.service')

const userController = async (body) => {
  const result = await userService(body)
  return result;
}

module.exports = userController