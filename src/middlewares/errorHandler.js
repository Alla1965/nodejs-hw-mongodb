// src/middlewares/errorHandler.js

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 500;
  res.status(status).json({
    message: 'Something went wrong',
    error: err.message,
  });
};
