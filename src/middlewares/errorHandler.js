

export const errorHandler = (err, req, res, next) => {
  const status = err.status || 404;

  res.status(status).json({
    message: err.message || 'Something went wrong',
    error: err.errors || [],
  });
};
