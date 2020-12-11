const Card = require('./../models/card');

/**
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({});
    res.status(200).send(cards);
  } catch (err) {
    console.error(err);
  }
};

const addCard = async (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  await Card.create({ name, link, owner: _id });
};

const deleteCard = async (req, res) => {
  const { cardId } = req.params;

  await Card.findByIdAndDelete(cardId);
};

module.exports = { getCards, addCard, deleteCard };
