module.exports.handleError = ({ responce, error, errorCode }) => {
  console.error(error.stack);
  responce.status(errorCode).send({ message: error.message });
};
