const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const consign = require("consign");
var cors = require("cors");
const jwt = require("jsonwebtoken");

module.exports = () => {
  const app = express();

  // SETANDO VARIÁVEIS DA APLICAÇÃO
  app.set("port", 3333 || config.get("server.port"));

  app.use(cors());

  // MIDDLEWARES
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
  app.use(bodyParser.json());
  app.use(express.static("uploads"));
  app.use(express.static("public"));

  // ENDPOINTS
  consign({ cwd: "api" }).then("controllers").then("routes").into(app);

  return app;
};
