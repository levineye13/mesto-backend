const cardsRouter = require('express').Router();
const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const sendCards = (req, res) => {
  getDataFromFile({
    pathToFile: path.join(__dirname, '..', 'data', 'cards.json'),
    callback: (err, data) => {
      if (err) {
        throw new Error(`Ошибка: ${err.message}`);
      }
      res.status(200).send(JSON.parse(data));
    },
  });
};

cardsRouter.get('/cards', sendCards);

module.exports = { cardsRouter };
