// schéma de la base de données et api
// tests d'intégration
// Bonus 1 : rechercher des vidéos par tags
// Bonus 2 : pagination de la liste des vidéos
// Bonus 3 : un fichier docker-compose pour lancer le projet et l'ensemble des dépendances
// Bonus 4 : un modèle user (email, password) avec les services d'authentification (signup, login, logout)
// Bonus 5 : un user peut ajouter des vidéos dans une table de favoris et un user ne peut pas voir les favoris des autres users
//TODO: Bonus 6 : un service elasticsearch pour l'indexation et la recherche des vidéos par mots-clés (indexation du nom, de la description et des tags associés à une vidéo)
//TODO: Bonus 7 : configurer un point d’accès graphql (avec Apollo) permettant de récupérer la liste des videos et une vidéo par son id. Les vidéos doivent pouvoir être retournées avec les tags associés.
//TODO: Bonus 8 : la page détails d’une vidéo doit pouvoir être mise en cache par le navigateur et par un CDN pendant 5 minutes, décrire la stratégie permettant de réaliser cette demande et mettre en place les modifications nécessaires dans le code

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
