import {
  registerUser,
  loginUser,
  refreshSession,
  logoutUser,
  findUserByEmail,
  generateResetToken,
} from '../services/auth.js';
import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/session.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { sendPasswordResetEmail } from '../utils/sendMail.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../../src/db/models/user.js';

export const registerUserController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await registerUser({ name, email, password });

  res.status(201).json({
    status: 'success',
    message: 'Successfully registered a user!',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};
export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser({ email, password });

  res
    .cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
    })
    .cookie('accessToken', session.accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 хвилин
    })
    .status(200)
    .json({
      status: 'success',
      message: 'Successfully logged in an user!',
      data: {
        accessToken: session.accessToken,
      },
    });
};
export const refreshSessionController = async (req, res) => {
  const oldrefreshToken = req.cookies?.refreshToken;

  if (!oldrefreshToken) {
    throw createHttpError(401, 'No refresh token provided');
  }

  const session = await refreshSession(oldrefreshToken);
  res
    .cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .cookie('accessToken', session.accessToken, {
      httpOnly: false,
      secure: true,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    })
    .status(200)
    .json({
      status: 'success',
      message: 'Successfully refreshed a session!',
      data: {
        accessToken: session.accessToken,
      },
    });
};
export const logoutUserController = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw createHttpError(400, 'No refresh token provided');
  }
  const decodedToken = decodeURIComponent(refreshToken);
  await logoutUser(decodedToken);

  res.clearCookie('refreshToken');
  res.status(204).send();
};

export const requestResetEmailController = async (req, res) => {
 
  const { email } = req.body;

  // Знайти користувача в базі
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'Користувача не знайдено' });
  }

  // Генеруємо токен для скидання паролю
  const resetToken = await generateResetToken(user);
  console.log('🔐 Reset token:', resetToken);
  // Надсилаємо лист
  await sendPasswordResetEmail(user.email, resetToken);
  res.status(200).json({
    message: 'Лист для скидання пароля відправлено',
    resetToken,
  });
};
export const resetPasswordController = async (req, res) => {
  console.log('📦 Тіло запиту:', req.body);
  const { token, password } = req.body;
  if (!token || !password) {
    throw createHttpError(400, 'Missing token or password');
  }

  let decoded;
  try {
    decoded = jwt.verify(token, getEnvVar('JWT_SECRET'));
  } catch (err) {
    console.error('JWT verification error:', err.message);
    throw createHttpError(401, 'Token is expired or invalid.');
  }

  const user = await findUserByEmail(decoded.email);
  if (!user) {
    throw createHttpError(404, 'User not found!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  await user.save();

  await SessionsCollection.deleteMany({ userId: user._id });
  
  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
