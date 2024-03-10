const db = require("../models");
const movies = db.moviesAndSeriesByUser;
const { jwtDecode } = require("jwt-decode");

const saveMovie = async (req, res) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decode = jwtDecode(token);
    let data = req.body;
    data["user_id"] = decode.id;
    const favorite = await movies.findOne({
      where: {
        item_id: data.item_id,
        user_id: data.user_id,
      },
    });
    if (favorite) {
      throw new Error("La pelicula Ya ha sido guardada");
    }
    await movies.create(data);
    res.status(201).json({ message: "Guardado con exito" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

const getMovieID = async (req, res) => {
  try {
    const favorite = await movies.findOne({ where: { id: req.params["id"] } });
    if (favorite) {
      res.status(201).json(favorite);
    } else {
      throw new Error("No existe");
    }
  } catch (error) {
    console.log(error);
    res.status(409).son({ message: error.message });
  }
};

const getAllMovieByUser = async (req, res) => {
  try {
    const token = req.get("Authorization").split(" ")[1];
    const decode = jwtDecode(token);
    let data = req.body;
    console.log(req.body);
    data["user_id"] = decode.id;
    const favorites = await movies.findAll({
      where: { user_id: data.user_id },
    });
    if (favorites) {
      res.status(201).json(favorites);
    } else {
      throw new Error("No hay favoritos guardados");
    }
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

module.exports = {
  saveMovie,
  getMovieID,
  getAllMovieByUser,
};
