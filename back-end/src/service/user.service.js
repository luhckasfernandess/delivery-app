const { User } = require('../database/models')
const md5 = require('md5')

const userService = async (body) => {
  const { email, password } = body
  const md5decrypted = md5(password)
  const result = await User.findOne({ where: { email, password: md5decrypted } });
  return result
}

module.exports = userService