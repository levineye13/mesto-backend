const express = require('express');
const path = require('path');
const { cardsRouter } = require('./routes/cards.js');
const { usersRouter } = require('./routes/users.js');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(cardsRouter);
app.use(usersRouter);

app.all('*', (req, res) => {
  res.status(400).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log('Port ' + PORT);
});
