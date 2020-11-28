const path = require('path');
const { getDataFromFile } = require('./../helpers/reader.js');

const pathToCardsFile = path.join(__dirname, '..', 'data', 'cards.json');

const getCards = (req, res) => {
  getDataFromFile({ pathToFile: pathToCardsFile })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => res.status(400).send({ error: `Ошибка: ${err.message}` }));
};

//*callback style
// const getCards = (req, res) => {
//   getDataFromFile({
//     pathToFile: pathToCardsFile,
//     callback: (err, data) => {
//       if (err) {
//         throw new Error(`Ошибка: ${err.message}`);
//       }
//       res.status(200).send(JSON.parse(data));
//     },
//   });
// };

module.exports = { getCards };
