const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToCardsFile = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  getDataFromFile({
    pathToFile: pathToCardsFile,
    callback: (err, data) => {
      if (err) {
        throw new Error(`Ошибка: ${err.message}`);
      }
      res.status(200).send(JSON.parse(data));
    },
  });
};

module.exports = { getCards };
