const usersRouter = require('express').Router();
const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const sendAllUsers = (req, res) => {
  getDataFromFile({
    pathToFile: path.join(__dirname, '..', 'data', 'users.json'),
    callback: (err, data) => {
      if (err) {
        throw new Error(`Ошибка: ${err.message}`);
      }
      res.status(200).send(JSON.parse(data));
    },
  });
};

const doesUserExist = (req, res, next) => {
  getDataFromFile({
    pathToFile: path.join(__dirname, '..', 'data', 'users.json'),
    callback: (err, data) => {
      const users = JSON.parse(data);
      if (!users[req.params.id]) {
        res.status(400).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.locals.users = users;
      next();
    },
  });
};

const sendUser = (req, res, next) => {
  const { users } = res.locals;
  res.status(200).send(users[req.params.id]);
};

usersRouter.get('/users', sendAllUsers);
usersRouter.get('/users/:id', doesUserExist);
usersRouter.get('/users/:id', sendUser);

module.exports = { usersRouter };
