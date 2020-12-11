const cardsRouter = require('express').Router();
const {
  getCards,
  addCard,
  deleteCard,
} = require('./../controllers/cardsController.js');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', addCard);
cardsRouter.delete('/cards/:cardId', deleteCard);

module.exports = { cardsRouter };
