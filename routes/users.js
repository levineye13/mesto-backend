const usersRouter = require('express').Router();
const path = require('path');
const {
  getAllUsers,
  doesUserExist,
  getProfile,
} = require('./../controllers/usersController.js');

usersRouter.get('/users', getAllUsers);
usersRouter.get('/users/:id', doesUserExist);
usersRouter.get('/users/:id', getProfile);

module.exports = { usersRouter };
