const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./middlewares/jwtGenerator");

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
    const maxAge = 15 * 60; // in seconds
    const token = jwtGenerator(id, maxAge);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // expires in 15min
    res.json(`User logged in with token ${token}`);
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
    const maxAge = 15 * 60;
    const token = jwtGenerator(id, maxAge);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // in milliseconds, expires in 15min
    res.json(`User logged in with token ${token}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const logout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 }); // expires in 1ms
  res.json("User logged out");
};

const addFavoriteVideos = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { videoNames } = req.body;

    let favoriteVideos = [];
    for (videoName of videoNames) {
      let favoriteVideo = await pool.query(
        "insert into Favorite_video(users_id, video_id) (select $1, id from Video where name=$2) returning *",
        [id, videoName]
      );
      favoriteVideos.push(favoriteVideo.rows[0]);
    }
    console.log("AddFavoriteVideos Request");
    res.send(favoriteVideos);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getFavoriteVideos = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const favoriteVideos = await pool.query(
      "select name from Video where id in (select video_id from Favorite_video where users_id=$1)",
      [id]
    );
    console.log("GetFavoriteVideos Request");
    res.send(favoriteVideos.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteFavoriteVideos = async (req, res) => {
  try {
    const { id } = res.locals.user;
    const { videoNames } = req.body;

    let favoriteVideos = [];
    for (videoName of videoNames) {
      let favoriteVideo = await pool.query(
        "delete from Favorite_video where users_id=$1 and video_id in (select id from Video where name=$2) returning *",
        [id, videoName]
      );
      favoriteVideos.push(favoriteVideo.rows[0]);
    }
    console.log("DeleteFavoriteVideos Request");
    console.log(favoriteVideos);
    res.send(favoriteVideos);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = {
  signup,
  login,
  logout,
  addFavoriteVideos,
  getFavoriteVideos,
  deleteFavoriteVideos,
};
