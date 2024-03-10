module.exports = (sequelize, DataTypes) => {
  const moviesAndSeriesByUser = sequelize.define(
    "moviesAndSeriesByUser",
    {
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      original_language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  moviesAndSeriesByUser.associate = function (models) {
    moviesAndSeriesByUser.belongsTo(models.User, {
      foreignKey: "user_id",
    });
  };
  return moviesAndSeriesByUser;
};
