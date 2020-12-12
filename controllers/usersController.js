const User = require('./../models/user');
const {
  STATUS_OK,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('./../utils/constants');
const { handleError } = require('./../utils/utils');

/**
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    if (!users) {
      throw new Error('На сервере произошла ошибка');
    }
    res.status(STATUS_OK).send(users);
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * middleware
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 * @param  {Function} next - аргумент обратного вызова для функции промежуточного обработчика
 */
const doesUserExist = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const users = await User.find({});
    if (!users[userId] && typeof userId === 'number') {
      //if (!users[userId]) {
      throw new Error('Пользователь с таким id не найден');
    }

    res.locals.user = users[userId];
    next();
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: NOT_FOUND_ERROR,
    });
  }
};

/**
 * middleware
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 * @param  {Function} next - аргумент обратного вызова для функции промежуточного обработчика
 */
const getProfile = (req, res, next) => {
  const { user } = res.locals;
  res.status(STATUS_OK).send(user);
};

/**
 * Функция добавления пользователя
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const createUser = async (req, res) => {
  const { name, about, avatar } = req.body;
  try {
    if (name && about && avatar) {
      const newUser = await User.create({ name, about, avatar });
      res.status(STATUS_OK).send(newUser);
      return;
    }
    throw new Error(
      'Переданы некорректные данные в метод создания пользователя'
    );
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: BAD_REQUEST_ERROR,
    });
  }
};

/**
 * Функция обновления профиля
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const updateProfile = async (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  try {
    if (name && about) {
      const updatedProfile = await User.findByIdAndUpdate(
        _id,
        { name, about },
        { new: true, runValidators: true, upsert: true }
      );
      res.status(STATUS_OK).send(updatedProfile);
      return;
    }
    throw new Error('Переданы некорректные данные в метод обновления профиля');
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: BAD_REQUEST_ERROR,
    });
  }
};

/**
 * Функция обновления аватара
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  try {
    if (avatar) {
      const updatedAvatar = await User.findByIdAndUpdate(
        _id,
        { avatar },
        { new: true, runValidators: true, upsert: true }
      );
      res.status(STATUS_OK).send(updatedAvatar);
      return;
    }
    throw new Error('Переданы некорректные данные в метод обновления аватарки');
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: BAD_REQUEST_ERROR,
    });
  }
};

module.exports = {
  getAllUsers,
  doesUserExist,
  getProfile,
  createUser,
  updateProfile,
  updateAvatar,
};
