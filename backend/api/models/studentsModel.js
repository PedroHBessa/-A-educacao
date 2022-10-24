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
const Students = database.define("students", {
  studentId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  academic_record: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

database
  .sync()
  .then(() => {
    console.log("Students table was created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });

const createStudent = (data) => {
  Students.create(data.student)
    .then((res) => {
      console.log("Student created!");
    })
    .catch((error) => {
      console.error("Failed to create a new record : ", error);
    });
};
const getStudent = async (studentId) => {
  return Students.findOne({ where: { studentId: studentId } })
    .then((res) => {
      return { student: res };
    })
    .catch((error) => {
      console.error("Student not found : ", error);
    });
};

const getStudents = async () => {
  return Students.findAll()
    .then((res) => {
      return { students: res };
    })
    .catch((error) => {
      console.error("Failed to retrieve data : ", error);
    });
};

const removeStudent = async (studentId) => {
  return Students.destroy({ where: { studentId: studentId } })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("Failed to remove data : ", error);
    });
};

const updateStudent = async (studentId, newValues) => {
  return Students.update(newValues, { where: { studentId: studentId } })
    .then((res) => {
      return res;
    })
    .catch((error) => {
      console.error("Failed to remove data : ", error);
    });
};

module.exports = {
  getStudents,
  getStudent,
  createStudent,
  removeStudent,
  updateStudent,
};
