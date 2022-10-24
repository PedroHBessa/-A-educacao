const uuidv4 = require("uuid/v4");
const studentsModel = require("../models/studentsModel");

module.exports = (app) => {
  const controller = {};
  controller.getStudents = async (req, res) => {
    const response = await studentsModel.getStudents();
    res.status(200).json(response);
  };

  controller.getStudent = async (req, res) => {
    const { studentId } = req.body;
    const response = await studentsModel.getStudent(studentId);
    res.status(200).json(response);
  };

  controller.createStudent = (req, res) => {
    const studentId = uuidv4();
    const student = req.body;
    studentsModel.createStudent({
      student: { ...student, studentId: studentId },
    });
    res.status(201).json(req.body);
  };

  controller.removeStudent = (req, res) => {
    const { studentId } = req.body;

    studentsModel.removeStudent(studentId).then((response) => {
      if (!response) {
        res.status(404).json("Student not found!");
      } else {
        res.status(201).json("Student was removed!");
      }
    });
  };
  controller.updateStudent = (req, res) => {
    const { studentId } = req.body;

    const newValues = req.body;

    studentsModel.updateStudent(studentId, newValues).then((response) => {
      if (!response) {
        res.status(404).json("Student not found!");
      } else {
        res.status(201).json("Student was updated!");
      }
    });
  };

  return controller;
};
