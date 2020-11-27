const usersRouter = require('express').Router();
const users = require('./../data/users.json');

const sendAllUsers = (req, res) => {
  res.status(200).send(users);
};

const doesUserExist = (req, res, next) => {
  if (!users[req.params.id]) {
    res.status(400).send({ message: 'Нет пользователя с таким id' });
    return;
  }

  next();
};

const sendUser = (req, res, next) => {
  res.status(200).send(users[req.params.id]);
};

usersRouter.get('/users', sendAllUsers);
usersRouter.get('/users/:id', doesUserExist);
usersRouter.get('/users/:id', sendUser);

module.exports = { usersRouter };
