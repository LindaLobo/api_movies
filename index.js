const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const cors = require("cors");
const db = require("./models");
const routes = require("./routes/routes");

const port = 4000;

const app = express();

// middleware => se ejecuta antes de cualquier cosa
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors un mecanismo que permite el intercambio de informacion restrigida entre diferentes dominios
app.use(cors());

//base de datos

db.sequelize.sync().then(() => {
  console.log("base de datos sincronizada");
});

//ruta
app.use("/api", routes);

app.listen(port, () => {
  console.log(`conectado en puerto ${port}`);
});
