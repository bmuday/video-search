const jwt = require("jsonwebtoken");
require("dotenv").config();
const port = process.env.server_port;

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if token exists and is verified
  if (token) {
    jwt.verify(token, process.env.secretkey, (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        res.json("Invalid token, please login");
      } else {
        console.log("decodedToken:", decodedToken);
        // Next middleware
        next();
      }
    });
  } else {
    res.json("Invalid token, please login");
  }
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.secretkey, (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        // Next middleware
        next();
      } else {
        // retrieve user infos
        // Next middleware
        next();
      }
    });
  } else {
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
