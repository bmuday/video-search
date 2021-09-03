const router = require("express").Router();

const validation = require("../controllers/middlewares/validation");
const { requireAuth, checkUser } = require("../controllers/middlewares/auth");

const {
  signup,
  login,
  logout,
  addFavoriteVideos,
  getFavoriteVideos,
  deleteFavoriteVideos,
} = require("../controllers/users");

// Signup
router.post("/signup", validation, signup);

// Login
router.post("/login", validation, login);

// Logout
router.get("/logout", logout);

// Check user on every request
router.get("*", checkUser);
router.post("*", checkUser);
router.delete("*", checkUser);

// Private Routes
// A user must be logged in to add, delete or see his favorite videos and cannot see those of other users

// add one or many favorite videos of a user
router.post("/favorites", requireAuth, addFavoriteVideos);

// get all favorite videos of a user
router.get("/favorites", requireAuth, getFavoriteVideos);

// delete one or many favorite videos of a user
router.delete("/favorites", requireAuth, deleteFavoriteVideos);

module.exports = router;
