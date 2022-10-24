require("dotenv").config();
const uuidv4 = require("uuid/v4");
const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (app) => {
  const controller = {};
  controller.me = async (req, res) => {
    res.status(200).send({ status: true, message: "allowed" });
  };

  controller.signup = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = { email: req.body.email, password: hashedPassword };
      const response = await usersModel.signup(user);
      if (response) {
        res.status(201).send("User created successfully");
      } else {
        res.status(403).send("Email already exists");
      }
    } catch {
      res.status(500).send();
    }
  };

  controller.signin = async (req, res) => {
    const data = await usersModel.signin(req.body);

    if (!data) {
      res.status(404).json(data.message);
    } else {
      try {
        if (await bcrypt.compare(req.body.password, data.response.password)) {
          const email = req.body.email;
          const user = { email: email };
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
          res.json({ user: user, accessToken: accessToken });
        } else {
          res.status(500).send("E-mail ou senha incorretos");
        }
      } catch (error) {
        res.status(500).send(data.message);
      }
    }
  };

  return controller;
};
