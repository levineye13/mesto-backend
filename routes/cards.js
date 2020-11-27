const cardsRouter = require('express').Router();
const path = require('path');
const { getCards } = require('./../controllers/cardsController.js');

cardsRouter.get('/cards', getCards);

module.exports = { cardsRouter };
