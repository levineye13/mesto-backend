const Card = require('./../models/card');
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
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    if (!cards) {
      throw new Error('На сервере произошла ошибка');
    }
    res.status(STATUS_OK).send(cards);
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: INTERNAL_SERVER_ERROR,
    });
  }
};

/**
 * Функция добавления карточки
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const createCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  try {
    if (name && link) {
      const newCard = await Card.create({ name, link, owner: { _id } });
      res.status(STATUS_OK).send(newCard);
      return;
    }
    throw new Error('Переданы некорректные данные в метод создания карточки');
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: BAD_REQUEST_ERROR,
    });
  }
};

/**
 * Функция удаления карточки
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  try {
    const deletedCard = await Card.findByIdAndRemove(cardId);
    if (!deletedCard) {
      throw new Error('Карточка с таким id не найдена');
    }
    res.status(STATUS_OK).send(deleteCard);
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: NOT_FOUND_ERROR,
    });
  }
};

/**
 * Функция лайка карточки
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const likeCard = async (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: _id } },
      { new: true }
    );
    return updatedCard;
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: NOT_FOUND_ERROR,
    });
  }
};

/**
 * Функция дизлайка карточки
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const dislikeCard = async (req, res) => {
  const { _id } = req.user;
  const { cardId } = req.params;

  try {
    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: _id } },
      { new: true }
    );
    return updatedCard;
  } catch (err) {
    handleError({
      responce: res,
      error: err,
      errorCode: NOT_FOUND_ERROR,
    });
  }
};

module.exports = { getCards, createCard, deleteCard, likeCard, dislikeCard };
