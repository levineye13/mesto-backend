const path = require('path');
const users = require('../routes/users.js');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToUsersFile = path.join(__dirname, '..', 'data', 'users.json');

const getAllUsers = (req, res) => {
  getDataFromFile({ pathToFile: pathToUsersFile })
    .then((users) => res.status(200).send(users))
    .catch((err) => console.log(err));
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
    .catch((err) => console.log(err));
};

const getProfile = (req, res, next) => {
  const { users } = res.locals;
  res.status(200).send(users[req.params.id]);
};

//*callback style
// const getAllUsers = (req, res) => {
//   getDataFromFile({
//     pathToFile: pathToUsersFile,
//     callback: (err, data) => {
//       if (err) {
//         throw new Error(`Ошибка: ${err.message}`);
//       }
//       res.status(200).send(JSON.parse(data));
//     },
//   });
// };

// const doesUserExist = (req, res, next) => {
//   getDataFromFile({
//     pathToFile: pathToUsersFile,
//     callback: (err, data) => {
//       const users = JSON.parse(data);

//       if (!users[req.params.id]) {
//         res.status(400).send({ message: 'Нет пользователя с таким id' });
//         return;
//       }

//       res.locals.users = users;
//       next();
//     },
//   });
// };

module.exports = { getAllUsers, doesUserExist, getProfile };
