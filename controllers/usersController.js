const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToUsersFile = path.join(__dirname, '..', 'data', 'users.json');

const getAllUsers = (req, res) => {
  getDataFromFile({ pathToFile: pathToUsersFile })
    .then((users) => res.status(200).send(users))
    .catch((err) => console.error(err));
};

const doesUserExist = (req, res, next) => {
  getDataFromFile({ pathToFile: pathToUsersFile })
    .then((users) => {
      if (!users[req.params.id]) {
        res.status(400).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.locals.users = users;
      next();
    })
    .catch((err) => console.error(err));
};

const getProfile = (req, res, next) => {
  const { users } = res.locals;
  res.status(200).send(users[req.params.id]);
};

module.exports = { getAllUsers, doesUserExist, getProfile };
