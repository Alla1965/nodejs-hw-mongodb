// src/server.js
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import router from './routers/index.js';

import notFoundHandler from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function setupServer() {
  const app = express();

  // Налаштування CORS
  app.use(cors());

  // Налаштування логгера Pino
  app.use(pinoHttp());
  app.use(express.json());

  app.use('/contacts', router);

  app.use(errorHandler);
  app.use(notFoundHandler);

  // Визначення порту
  const PORT = process.env.PORT || 3000;

  // // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
