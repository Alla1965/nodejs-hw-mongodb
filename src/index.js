import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

(async () => {
  try {
    await initMongoConnection(); // чекаємо з'єднання

    setupServer(); // запускаємо сервер
  } catch (error) {
    console.error(' Помилка підключення до бази:', error.message);
    process.exit(1);
  }
})();
