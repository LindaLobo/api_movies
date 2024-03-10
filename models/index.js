const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://${process.env.DATA_BASE_USER}:${process.env.DATA_BASE_PASSWORD}@${process.env.DATA_BASE_HOST}:${process.env.DATA_BASE_PORT}/${process.env.DATA_BASE_NAME}`,
  { dialect: "postgres" }
);

//checking if connection is done
sequelize
  .authenticate()
  .then(() => {
    console.log(`Database connected to movies`);
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require("./userModel")(sequelize, DataTypes);
db.moviesAndSeriesByUser = require("./moviesAndserieByUser")(
  sequelize,
  DataTypes
);

//exporting the module
module.exports = db;
