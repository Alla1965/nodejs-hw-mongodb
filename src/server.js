// src/server.js
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import router from './routes/index.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
// import authRouter from './routes/auth.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function setupServer() {
  const app = express();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(pinoHttp());
  app.get('/', (req, res) => {
    console.log('📢 direct GET /');
    res.send('Direct route works!');
  });
  app.use(router);

  // app.use('/auth', authRouter);
  app.use(errorHandler);

  app.use(notFoundHandler);

  // Визначення порту
  const PORT = process.env.PORT || 3000;

  // // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
