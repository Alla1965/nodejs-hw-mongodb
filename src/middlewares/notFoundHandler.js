// src/middlewares/notFoundHandler.js
import createHttpError from 'http-errors';

export default function notFoundHandler(req, res, next) {
  console.log(`❌ Route not found: ${req.method} ${req.originalUrl}`);
  next(createHttpError(404, 'Route not found'));
}
