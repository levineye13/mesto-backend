const express = require('express');
const path = require('path');
const { cardsRouter } = require('./routes/cards.js');
const { usersRouter } = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('Port ' + PORT);
});
