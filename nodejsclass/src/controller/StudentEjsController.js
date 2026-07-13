const Student = require("../models/student.model");

class StudentEjsController {
  async list(req, res) {
    try {
      const studata = await Student.find();
      res.render("crud/list", {
        title: "list page",
        data: studata,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async store(req, res) {
    try {
      res.render("crud/add", {
        title: "store page",
      });
    } catch (error) {
      console.log(error);
    }
  }

  async create(req,res){
    console.log(req.body)
    try{
      const {name,email,phone,city,state,country}=req.body
      const studentdata=new Student({
        name:name,
        email:email,
        phone:phone,
        city:city,
        state:state,
        country:country
      })
      const data=await studentdata.save()
      res.redirect('/student')
    }catch(error){
      console.log(error)
    }
  }

  async delete(req,res){
    try{
      const id=req.params.id
      const studata=await Student.findByIdAndDelete(id)
      res.redirect('/student')
    }catch(error){
      console.log(error)
    }
  }
}

module.exports = new StudentEjsController();
