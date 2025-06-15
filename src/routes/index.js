// import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('📢 GET / запит отримано');
  res.send('Direct route works!');
});

router.use('/auth', authRouter);

router.use('/contacts', contactsRouter);

export default router;
