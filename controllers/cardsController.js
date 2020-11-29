const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToCardsFile = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  getDataFromFile({ pathToFile: pathToCardsFile })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(404).send({ error: err.message }));
};

module.exports = { getCards };
