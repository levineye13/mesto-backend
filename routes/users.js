const usersRouter = require('express').Router();
const {
  getAllUsers,
  doesUserExist,
  getProfile,
} = require('./../controllers/usersController.js');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', doesUserExist, getProfile);

module.exports = { usersRouter };
