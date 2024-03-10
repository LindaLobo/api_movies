const express = require("express");
const userController = require("../controllers/userController");
const { signup, login } = userController;
const userAuth = require("../middleware/auth");
const {
  saveMovie,
  getMovieID,
  getAllMovieByUser,
} = require("../controllers/moviesAndserieControllers");

const router = express.Router();

//le pasamos el middleware y estas son las rutas

router.post("/signup", signup);
router.post("/login", login);
router.post("/save_movie", userAuth, saveMovie);
router.get("/favorite/:id", userAuth, getMovieID);
router.get("/favorites", userAuth, getAllMovieByUser);

module.exports = router;
