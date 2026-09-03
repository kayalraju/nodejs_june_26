const express = require("express");
const router = express.Router();
const employeeController = require('../controller/employee.controller')

router.post("/employee", employeeController.createEmployee)
router.get("/employee", employeeController.getAllEmployee)
router.get("/employee/aggregate", employeeController.getAllEmployeeaggregate)

module.exports = router