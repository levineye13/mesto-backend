const fsPromises = require('fs').promises;

const getDataFromFile = async ({ pathToFile }) => {
  try {
    const res = await fsPromises.readFile(pathToFile, { encoding: 'utf-8' });
    const data = res.ok
      ? JSON.parse(res)
      : Promise.reject(new Error(`Ошибка: ${res.status}`));
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getDataFromFile };
