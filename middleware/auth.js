const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("No autenticado, sin JWT");
    error.statuCode = 401;
    throw error;
  }

  const token = authHeader.split(" ")[1];
  let revisarToken;
  try {
    revisarToken = jwt.verify(token, process.env.clavesecreta);
  } catch (error) {
    error.statuCode = 500;
    throw error;
  }

  if (!revisarToken) {
    const error = new Error("no autenticado");
    error.statuCode = 401;
    throw error;
  }
  next();
};
