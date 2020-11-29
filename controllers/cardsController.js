const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToCardsFile = path.join(__dirname, '..', 'data', 'cards.json');

/**
 * @param  {Object} req - объект запроса к серверу
 * @param  {Object} res - объект ответа сервера
 */
const getCards = async (req, res) => {
  try {
    const cards = await getDataFromFile({ pathToFile: pathToCardsFile });
    res.status(200).send(cards);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getCards };
