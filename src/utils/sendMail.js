// src/utils/sendMail.js

import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { getEnvVar } from '../utils/getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',

  port: 465,

  secure: true, // Ukr.net використовує SSL
  auth: {
    user: getEnvVar('SMTP_USER'),
    pass: getEnvVar('SMTP_PASSWORD'),
  },
});
/**
 * Надсилання листа скидання пароля
 * @param {string} toEmail - email користувача
 * @param {string} token - токен для скидання
 */
export const sendPasswordResetEmail = async (toEmail, token) => {
  const appDomain = getEnvVar('APP_DOMAIN'); // https://yourapp.com
  const resetLink = `${appDomain}/auth/reset-password?token=${token}`;

  const options = {
    from: getEnvVar(SMTP.SMTP_FROM), // "Your App <you@ukr.net>"
    to: toEmail,
    subject: '🔐 Відновлення паролю',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Запит на скидання паролю</h2>
        <p>Ми отримали запит на скидання паролю для вашого акаунту.</p>
        <a href="${resetLink}" style="padding: 10px 20px; background: #007BFF; color: white; text-decoration: none; border-radius: 5px;">
          Скинути пароль
        </a>
        <p style="margin-top: 20px;">Якщо ви не надсилали запит — просто проігноруйте цей лист.</p>
      </div>
    `,
  };
  return await transporter.sendMail(options);
};
