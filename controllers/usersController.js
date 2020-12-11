const User = require('./../models/user');

/**
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
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
    const users = await User.find({});
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

/**
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const addUser = async (req, res) => {
  const { name, about, avatar } = req.body;

  await User.create({ name, about, avatar });
};

module.exports = { getAllUsers, doesUserExist, getProfile, addUser };
