const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToCardsFile = path.join(__dirname, '..', 'data', 'cards.json');

/**
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const getCards = (req, res) => {
  getDataFromFile({ pathToFile: pathToCardsFile })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(404).send({ error: err.message }));
};

module.exports = { getCards };
