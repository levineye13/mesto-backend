const usersRouter = require('express').Router();
const {
  getAllUsers,
  doesUserExist,
  getProfile,
  createUser,
} = require('./../controllers/usersController.js');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:userId', doesUserExist, getProfile);
usersRouter.post('/users', createUser);

module.exports = { usersRouter };
