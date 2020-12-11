const usersRouter = require('express').Router();
const {
  getAllUsers,
  doesUserExist,
  getProfile,
  addUser,
} = require('./../controllers/usersController.js');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:userId', doesUserExist, getProfile);
usersRouter.post('/users', addUser);

module.exports = { usersRouter };
