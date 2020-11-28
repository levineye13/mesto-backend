const cardsRouter = require('express').Router();
const { getCards } = require('./../controllers/cardsController.js');

cardsRouter.get('/cards', getCards);

module.exports = { cardsRouter };
