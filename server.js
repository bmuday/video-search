const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.server_port;

// Database connection
const db = require("./db");

// Middlewares
app.use(express.json());

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

// HTTP Request Logger
const logger = require("morgan");
app.use(logger("tiny"));

// Route Middlewares
app.get("/api", (req, res) => {
  res.json({ msg: "Welcome to the API!" });
});

const videosRoutes = require("./views/videos");
app.use("/api/videos", videosRoutes);

const tagsRoutes = require("./views/tags");
app.use("/api/tags", tagsRoutes);

const usersRoutes = require("./views/users");
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});

module.exports = {
  PORT,
};
