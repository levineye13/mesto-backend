const usersRouter = require('express').Router();
const users = require('./../data/users.json');

usersRouter.get('/users', (req, res) => {
  res.status(200).send(users);
});

usersRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;

  if (!users[id]) {
    res
      .status(400)
      .send(JSON.stringify({ message: 'Нет пользователя с таким id' }));
    return;
  }

  res.send(users[id]);
});

module.exports = { usersRouter };
