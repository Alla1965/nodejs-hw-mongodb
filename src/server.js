// src/server.js
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import contactsRouter from './routes/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
// Імпортуємо роутер
// import { getEnvVar } from './utils/getEnvVar.js';

// const PORT = Number(getEnvVar('PORT', '3000'));
export function setupServer() {
  const app = express();

  // Налаштування CORS
  app.use(cors());

  // Налаштування логгера Pino
  app.use(pinoHttp());
  app.use(express.json());

  app.use('/contacts', contactsRouter);
  console.log('test5');
  app.use(errorHandler);
  app.use(notFoundHandler);
  // app.use('*', notFoundHandler);
  console.log('test6');
  // Визначення порту
  const PORT = process.env.PORT || 3000;
  console.log('test7');
  // // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
