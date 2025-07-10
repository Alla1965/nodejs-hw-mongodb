import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserSchema } from '../validation/auth.js';
import { registerUserController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import { loginUserSchema } from '../validation/auth.js';
import { loginUserController } from '../controllers/auth.js';
import { refreshSessionController } from '../controllers/auth.js';
import { logoutUserController } from '../controllers/auth.js';
import { resetPasswordSchema } from '../validation/auth.js';
import { resetPasswordController } from '../controllers/auth.js';
import { requestResetEmailSchema } from '../validation/auth.js';
import { requestResetEmailController } from '../controllers/auth.js';
const router = express.Router();


router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);
router.post('/refresh', ctrlWrapper(refreshSessionController));
router.post('/logout', ctrlWrapper(logoutUserController));

router.get('/ping', (req, res) => {
  res.send('pong from /auth');
});
router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);
router.get('/test-reset', (req, res) => {
  res.send('✅ /auth/test-reset працює');
});
router.get('/reset-password', (req, res) => {
  const { token } = req.query;
  res.send(`
    <h2>Скидання пароля</h2>
    <form method="POST" action="/auth/reset-pwd">
      <input type="hidden" name="token" value="${token}" />
      <input type="password" name="password" placeholder="Введіть новий пароль" required />
      <button type="submit">Скинути пароль</button>
    </form>
  `);
});

router.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default router;
