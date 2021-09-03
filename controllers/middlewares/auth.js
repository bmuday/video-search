const jwt = require("jsonwebtoken");
require("dotenv").config();
const pool = require("../../db");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // Check if token exists and is verified
  if (token) {
    jwt.verify(token, process.env.secretkey, (err, decodedToken) => {
      if (err) {
        console.error(err.message);
        res.json("Invalid token, please login");
      } else {
        // Next middleware
        next();
      }
    });
  } else {
    console.log("No token");
    res.json("Please login");
  }
};

// Check current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.secretkey, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        // Next middleware
        next();
      } else {
        try {
          // retrieve user infos
          const user = await pool.query("select * from Users where id=$1", [
            decodedToken.user.id,
          ]);
          res.locals.user = user.rows[0];
          // Next middleware
          next();
        } catch (err) {
          console.log(err.message);
        }
      }
    });
  } else {
    console.log("No token");
    res.locals.user = null;
    // Next middleware
    next();
  }
};

module.exports = {
  requireAuth,
  checkUser,
};
