import { sendTestEmail } from './src/utils/sendMail.js';

sendTestEmail()
  .then(() => console.log('✅ Тестовий лист надіслано!'))
  .catch((err) => console.error('❌ Помилка надсилання:', err));
