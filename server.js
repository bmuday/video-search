const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

// Database connection
const db = require("./db");

// Middlewares

app.use(express.json());
app.use(cors());

// HTTP Request Logger
app.use(logger("tiny"));

// Route Middlewares
app.get("/api", (req, res) => {
  res.json({ msg: "Welcome to the API!" });
});

const videosRoutes = require("./views/videos");
app.use("/api/videos", videosRoutes);

const tagsRoutes = require("./views/tags");
app.use("/api/tags", tagsRoutes);

/* const usersRoutes = require("./views/users");
app.use("/api/users"); */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
