const { Sequelize, DataTypes } = require("sequelize");
const database = require("../../config/database");

database
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
const Users = database.define("users", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

database
  .sync()
  .then(() => {
    console.log("Users table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

const signup = async (data) => {
  return Users.findOne({ where: { email: data.email } }).then((res) => {
    if (res === null) {
      return Users.create(data)
        .then((res) => {
          return true;
        })
        .catch((error) => {
          console.error("error: ", error);
        });
    } else {
      return false;
    }
  });
};
const signin = async (data) => {
  return Users.findOne({ where: { email: data.email } }).then((res) => {
    if (res === null) {
      return { response: res, message: "User not found" };
    } else {
      return { response: res, message: "User was found" };
    }
  });
};
module.exports = { signup, signin };
