module.exports = (app) => {
  const controller = app.controllers.studentsController;

  app
    .route("/api/students")
    .get(controller.getStudents)
    .post(controller.createStudent);

  app
    .route("/api/student")
    .post(controller.getStudent)
    .delete(controller.removeStudent)
    .put(controller.updateStudent);
};
