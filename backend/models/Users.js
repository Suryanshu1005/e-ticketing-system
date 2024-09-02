const {DataTypes} = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {isEmail: true},
    },
    password: {type: DataTypes.STRING, allowNull: false},
  },
  {
    // Create index for fasted email lookup
    indexes: [{fields: ["email"]}],
  }
);

module.exports = User;
