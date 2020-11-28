const fsPromises = require('fs').promises;

const getDataFromFile = async ({ pathToFile }) => {
  const res = await fsPromises.readFile(pathToFile, { encoding: 'utf-8' });
  const data = JSON.parse(res);
  return data;
};

//*callback style
// const getDataFromFile = ({ pathToFile, callback }) => {
//   return fs.readFile(pathToFile, { encoding: 'utf-8' }, (err, data) => {
//     callback(err, data);
//   });
// };

module.exports = { getDataFromFile };
