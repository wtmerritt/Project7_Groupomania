"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Blogs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Blogs.belongsTo(models.User);
      // models.User.hasMany(Blogs);
    }
  }
  
  Blogs.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
      },
      body: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        required: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        required: true,
      },
      mediaUrl: DataTypes.STRING,
    },
    
    {
      sequelize,
      modelName: "Blogs",
    }
  );
  return Blogs;
};
