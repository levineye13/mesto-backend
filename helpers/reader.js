const fsPromises = require('fs').promises;

/**
 * @async
 * @param  {String} {pathToFile} - путь к файлу
 * @returns {Object} - объект, преобразованный из JSON
 */
const getDataFromFile = async ({ pathToFile }) => {
  try {
    const res = await fsPromises.readFile(pathToFile, { encoding: 'utf-8' });
    const data = JSON.parse(res);
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getDataFromFile };
