const fs = require('fs');

const getDataFromFile = ({ pathToFile, callback }) => {
  return fs.readFile(pathToFile, { encoding: 'utf-8' }, (err, data) => {
    callback(err, data);
  });
};

module.exports = { getDataFromFile };
