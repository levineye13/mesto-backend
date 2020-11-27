const fs = require('fs');

const getDataFromFile = (pathToFile) => {
  return fs.readFile(pathToFile, { encoding: 'utf-8' }, (err, data) => {
    if (err) {
      throw new Error(`Ошибка: ${err.message}`);
    }
    return data;
  });
};
