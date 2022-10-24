const { authenticateToken } = require("../auth/token");

module.exports = (app) => {
  const controller = app.controllers.usersController;

  app.route("/api/signup").post(controller.signup);

  app.route("/api/signin").post(controller.signin);

  app.route("/api/me").get(authenticateToken, controller.me);
};
