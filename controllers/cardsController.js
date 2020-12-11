const Card = require('./../models/card');
const {
  STATUS_OK,
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  INTERNAL_SERVER_ERROR,
} = require('./../utils/constants');

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
    res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
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
    res.status(BAD_REQUEST_ERROR).send({ message: err.message });
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
    const deletedCard = await Card.findByIdAndDelete(cardId);
    if (!deletedCard) {
      throw new Error('Карточка с таким id не найдена');
    }
    res.status(STATUS_OK).send(deleteCard);
  } catch (err) {
    res.status(NOT_FOUND_ERROR).send({ message: err.message });
  }
};

module.exports = { getCards, createCard, deleteCard };
