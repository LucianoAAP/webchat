module.exports = (err, _req, res, _next) => {
  if (err.status) {
    return res.status(err.status).json({ err: { message: err.message } });
  }

  return res.status(500).json({ message: err.message });
};
