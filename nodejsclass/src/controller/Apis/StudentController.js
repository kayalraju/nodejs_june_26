const Student = require("../../models/student.model");

class StudentController {
  async createStudent(req, res) {
    //console.log(req.body)
    try {
      const { name, email, phone, city, state, country } = req.body;

      const studentdata = new Student({
        name: name,
        email: email,
        phone: phone,
        city: city,
        state: state,
        country: country,
      });

      const data = await studentdata.save();

      if (data) {
        return res.status(201).json({
          status: true,
          message: "Student created successfully",
          data: data,
        });
      } else {
        return res.status(400).json({
          status: false,
          message: "Student not created",
          data: null,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllStudents(req, res) {
    try{
      const studata=  await Student.find()
      if(!studata || studata.length==0){
        return res.status(404).json({
          status:false,
          message:"No student found",
          data:null
        })
      }
      return res.status(200).json({
        status:true,
        message:"All students data",
        total:studata.length,
        data:studata
      })
    }catch(error){
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  }
}

module.exports = new StudentController();
