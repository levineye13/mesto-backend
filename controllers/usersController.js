const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToUsersFile = path.join(__dirname, '..', 'data', 'users.json');

/**
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await getDataFromFile({ pathToFile: pathToUsersFile });
    res.status(200).send(users);
  } catch (err) {
    console.error(err);
  }
};

/**
 * middleware
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 * @param  {Function} next - аргумент обратного вызова для функции промежуточного обработчика
 */
const doesUserExist = async (req, res, next) => {
  try {
    const users = await getDataFromFile({ pathToFile: pathToUsersFile });
    if (!users[req.params.id]) {
      res.status(400).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.locals.users = users;
    next();
  } catch (err) {
    console.error(err);
  }
};

/**
 * middleware
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 * @param  {Function} next - аргумент обратного вызова для функции промежуточного обработчика
 */
const getProfile = (req, res, next) => {
  const { users } = res.locals;
  res.status(200).send(users[req.params.id]);
};

module.exports = { getAllUsers, doesUserExist, getProfile };
