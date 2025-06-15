import { registerUser } from '../services/auth.js';
import { loginUser } from '../services/auth.js';
import { refreshSession } from '../services/auth.js';
import createHttpError from 'http-errors';
import { logoutUser } from '../services/auth.js';

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
  await loginUser(req.body);

  const { email, password } = req.body;

  const session = await loginUser({ email, password });

  res
    .cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 днів
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
  const refreshToken = req.cookies?.refreshToken;

  if (!refreshToken) {
    throw createHttpError(401, 'No refresh token provided');
  }

  const { accessToken } = await refreshSession(refreshToken);

  res.status(200).json({
    status: 'success',
    message: 'Successfully refreshed a session!',
    data: { accessToken },
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
