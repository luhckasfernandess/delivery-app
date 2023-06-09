const { getAllUsers,
  registerNewUserService,
  deleteUserService,
} = require('../service/user.service');

const getAllUsersAdminController = async (token) => {
  const allUsers = await getAllUsers(token);
  return allUsers;
};

const registerNewUserAdminController = async (user) => {
  const newUser = await registerNewUserService(user);
  return newUser;
};

const deleteUserAdminController = async (deleteUser) => {
  const user = await deleteUserService(deleteUser);
  return user;
};

module.exports = {
  getAllUsersAdminController,
  registerNewUserAdminController,
  deleteUserAdminController,
};