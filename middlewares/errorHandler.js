const notFound = require("./notFound");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode).json({
    success: false,
    error: { message: err.message, stack: err.stack },
  });
};

module.exports = errorHandler;
