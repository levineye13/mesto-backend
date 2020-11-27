const cardsRouter = require('express').Router();
const cards = require('./../data/cards.json');

const sendCards = (req, res) => {
  res.status(200).send(cards);
};

cardsRouter.get('/cards', sendCards);

module.exports = { cardsRouter };
