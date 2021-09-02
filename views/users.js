const router = require("express").Router();

const validation = require("../controllers/middlewares/validation");
const { requireAuth, checkUser } = require("../controllers/middlewares/auth");

const {
  signup,
  login,
  logout,
  accessFavorites,
} = require("../controllers/users");

// Signup
router.post("/signup", validation, signup);

// Login
router.post("/login", validation, login);

// Logout
router.get("/logout", logout);

// Private Routes
// A user must be logged in to see his favorites and cannot see those of other users
router.get("/favorites", requireAuth, checkUser, accessFavorites);

module.exports = router;
