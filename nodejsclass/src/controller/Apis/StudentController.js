const Student = require("../../models/student.model");
const StatusCode = require("../../utils/statusCode");
const fs = require("fs");

class StudentController {
  async createStudent(req, res) {
    try {
      const { name, email, phone, city, state, country } = req.body;

      const existingStudent = await Student.findOne({ email: email });
      if (existingStudent) {
        // Delete uploaded image
        if (req.file) {
          fs.unlink(req.file.path, (err) => {
            if (err) console.log(err);
          });
        }

        return res.status(StatusCode.BAD_REQUEST).json({
          status: false,
          message: "Student with this email already exists",
        });
      }

      const studentdata = new Student({
        name: name,
        email: email,
        phone: phone,
        city: city,
        state: state,
        country: country,
      });

      if (req.file) {
        studentdata.image = req.file.path;
      }
      const data = await studentdata.save();
      if (data) {
        return res.status(StatusCode.CREATED).json({
          status: true,
          message: "Student created successfully",
          data: data,
        });
      } else {
        return res.status(StatusCode.BAD_REQUEST).json({
          status: false,
          message: "Student not created",
          data: null,
        });
      }
    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllStudents(req, res) {
    try {
      const studata = await Student.find();
      if (!studata || studata.length == 0) {
        return res.status(StatusCode.NOT_FOUND).json({
          status: false,
          message: "No student found",
          data: null,
        });
      }
      return res.status(StatusCode.OK).json({
        status: true,
        message: "All students data",
        total: studata.length,
        data: studata,
      });
    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getStudentById(req, res) {
    try {
      const id = req.params.id;
      const studata = await Student.findById(id);
      if (!studata) {
        return res.status(StatusCode.NOT_FOUND).json({
          status: false,
          message: "No student found",
          data: null,
        });
      }
      return res.status(StatusCode.OK).json({
        status: true,
        data: studata,
      });
    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async updateStudent(req, res) {
    try {
      const id = req.params.id;
      const { name, email, phone, city, state, country } = req.body;

      const studata = await Student.findByIdAndUpdate(
        id,
        { name, email, phone, city, state, country },
        { new: true },
      );
      if (!studata) {
        return res.status(StatusCode.NOT_FOUND).json({
          status: false,
          message: "No student found",
          data: null,
        });
      }
      return res.status(StatusCode.OK).json({
        status: true,
        message: "Student updated successfully",
      });
    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async deleteStudent(req, res) {
    try {
      const id = req.params.id;
      const studata = await Student.findByIdAndDelete(id);
      if (!studata) {
        return res.status(StatusCode.NOT_FOUND).json({
          status: false,
          message: "No student found",
        });
      }
      return res.status(StatusCode.OK).json({
        status: true,
        message: "Student deleted successfully",
      });
    } catch (error) {
      return res.status(StatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new StudentController();
