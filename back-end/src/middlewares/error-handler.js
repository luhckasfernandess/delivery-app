const errorHandler = async (error, _req, res, next) => {
  if (error.status) {
    res.status(error.status).json({ message: error.message });
  } else {
    res.status(500).json({ message: error.message });

  }
  next();
};

module.exports = errorHandler;