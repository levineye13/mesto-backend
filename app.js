const express = require('express');
const path = require('path');

const { PORT = 3000 } = process.env;

const app = express();

const users = require('./data/users.json');
const cards = require('./data/cards.json');

app.get('/users', (req, res) => {
  res.status(200).send(users);
});

app.get('/cards', (req, res) => {
  res.status(200).send(cards);
});

app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!users[id]) {
    res
      .status(400)
      .send(JSON.stringify({ message: 'Нет пользователя с таким id' }));
    return;
  }

  res.send(users[id]);
});

// app.get('/', (req, res) => {
//   res
//     .status(400)
//     .send(JSON.stringify({ message: 'Запрашиваемый ресурс не найден' }));
// });

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log('Port ' + PORT);
});
