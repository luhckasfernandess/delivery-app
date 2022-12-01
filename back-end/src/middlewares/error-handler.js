const errorHandler = async (error, _req, res, next) => {
  res.status(500).json({ message: error.message });
  next();
};

module.exports = errorHandler;