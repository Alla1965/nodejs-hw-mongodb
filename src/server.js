// src/server.js
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import contactsRouter from './routes/contactsRoutes.js';

export function setupServer() {
  const app = express();

  // Налаштування CORS
  app.use(cors());

  // Налаштування логгера Pino
  app.use(pinoHttp());
  app.use(express.json());

  app.use('/', contactsRouter);

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Визначення порту
  const PORT = process.env.PORT || 3000;

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
