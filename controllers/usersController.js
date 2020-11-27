const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToUsersFile = path.join(__dirname, '..', 'data', 'users.json');

const getAllUsers = (req, res) => {
  getDataFromFile({
    pathToFile: pathToUsersFile,
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
    pathToFile: pathToUsersFile,
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

const getProfile = (req, res, next) => {
  const { users } = res.locals;
  res.status(200).send(users[req.params.id]);
};

module.exports = { getAllUsers, doesUserExist, getProfile };
