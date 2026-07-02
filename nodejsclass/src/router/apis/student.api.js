const express = require('express');
const StudentController = require('../../controller/Apis/StudentController');
const router = express.Router();




router.post('/create-student',StudentController.createStudent)
router.get('/students',StudentController.getAllStudents)





module.exports = router;