const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./middlewares/jwtGenerator");
const cookieParser = require("cookie-parser");

const signup = async (req, res) => {
  try {
    // retrieve user credentials
    const { email, password } = req.body;

    // check if user exists
    const user = await pool.query("select * from Users where email=$1", [
      email,
    ]);
    if (user.rows > 0)
      res.status(401).json("User already exists, please login instead.");

    // hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = await pool.query(
      "insert into Users(email, password) values($1, $2) returning *",
      [email, hashPassword]
    );

    // generate token
    const id = newUser.rows[0].id;
    const maxAge = 5 * 60 * 60; // in seconds
    const token = jwtGenerator(id, maxAge);
    res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 5 }); // expires in 5min
    res.json(`User logged in for ${maxAge} with token ${token}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    // retrieve user credentials
    const { email, password } = req.body;

    // check if user doesn't exist
    const user = await pool.query("select * from Users where email=$1", [
      email,
    ]);
    if (user.rows.length === 0)
      res.status(401).json("Email or password is incorrect.");

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) res.status(401).json("Email or password is incorrect.");

    // generate token
    const id = user.rows[0].id;
    const maxAge = 1000 * 60 * 5;
    const token = jwtGenerator(id, maxAge);
    res.cookie("jwt", token, { httpOnly: true, maxAge }); // in milliseconds, expires in 5min
    res.json(`User logged in with token ${token}`);
  } catch (err) {
    console.log(err.message);
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // expires in 1ms
  res.json("User logged out");
};

const accessFavorites = async (req, res) => {
  /* try {
    const { description } = req.body;
    const newuser = await pool.query(
      "insert into user(description) values($1) returning *;",
      [description]
    );
    res.send(newuser.rows[0]);
    console.log("New user created");
  } catch (err) {
    console.log(err.message);
  } */
  res.json("accessFavorites");
};

module.exports = {
  signup,
  login,
  logout,
  accessFavorites,
};
