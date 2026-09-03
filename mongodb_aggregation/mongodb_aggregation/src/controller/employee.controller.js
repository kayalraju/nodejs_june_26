const Employee = require("../models/employee.model");
const httpStatusCode = require("../utils/httpstatuscode");
class EmployeeController {
  async createEmployee(req, res) {
    try {
      const { firstname, lastname, email, gender, salary, department } =
        req.body;
      const newEmployee = new Employee({
        firstname: firstname,
        lastname: lastname,
        email: email,
        gender: gender,
        salary: salary,
        department: department,
      });

      const employee = await newEmployee.save();
      if (!employee) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Employee is not created",
          data: null,
        });
      } else {
        return res.status(httpStatusCode.CREATED).json({
          status: true,
          message: "Employee created successfully!",
          data: employee,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllEmployee(req, res) {
    try {
      const aggregateQuery = [
        {
          $match: {
            gender: "male", 
          },
        },
        { $project: { firstname: 0 } },
        { $sort: { createdAt: -1 } },
        { $limit: 10 },
        { $skip: 5 },
      ];

      const employee = await Employee.aggregate(aggregateQuery);

      if (!employee || employee.length === 0) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "Employee not found",
          data: [],
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          status: true,
          message: "All employee gets successfully",
          data: employee,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }

  async getAllEmployeeaggregate(req, res) {
    try {
      
      const employee = await Employee.aggregate([
        // {
        //   $match: {
        //     gender: "male",
        //     // $or: [
        //     //   { firstname: { $regex: req.query.search, $options: "i" } },
        //     //   { lastname: { $regex: req.query.search, $options: "i" } },
        //     //   { email: { $regex: req.query.search, $options: "i" } },
        //     // ],
        //   },
        // },
        // {
        //   $project: {
        //     firstname: 0,
        //   },
        // },
        // {
        //   $sort: {
        //     createdAt: -1,
        //   },
        // }

        // {
        //   $limit: 10,
        // }
        // {
        //   $skip: 5,
        // }

        // {
        //   $sample: { size: 5 },
        // }

        // {
        //   $group: {
        //     _id: "$department",
        //     totalEmployee: { $sum: 1 },
        //     averageSalary: { $avg: "$salary" },
        //   },
        // }

        //group by department and gender and get the total employee and average salary
        // {
        //   $group: {
        //     _id: { department: "$department", gender: "$gender" ,firstname: "$firstname"},
        //     totalEmployee: { $sum: 1 },
        //     averageSalary: { $avg: "$salary" },
        //   },
        // }
        // {
        //   $unwind: "$department",
        // },
        // {
        //   $group: {
        //     _id: { department: "$department", gender: "$gender" },
        //     totalEmployee: { $sum: 1 },
        //     averageSalary: { $avg: "$salary" },
        //   },
        // },

        // {
        //   $addFields: {
        //     fullName: { $concat: ["$firstname", " ", "$lastname"] },
        //     company: "google",
        //   },
        // }
      ]);

      if (!employee || employee.length === 0) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          status: false,
          message: "Employee not found",
          data: [],
        });
      } else {
        return res.status(httpStatusCode.OK).json({
          status: true,
          message: "All employee gets successfully",
          total: employee.length,
          data: employee,
        });
      }
    } catch (error) {
      return res.status(httpStatusCode.SERVER_ERROR).json({
        status: false,
        message: error.message,
      });
    }
  }
}
module.exports = new EmployeeController();
