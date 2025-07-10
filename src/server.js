import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import router from './routes/index.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import notFoundHandler from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { UPLOAD_DIR } from './constants/index.js';

export function setupServer() {
  const app = express();
  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(pinoHttp());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use(router);

  app.use(errorHandler);

  app.use(notFoundHandler);

  // Визначення порту
  const PORT = process.env.PORT || 3000;

  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
