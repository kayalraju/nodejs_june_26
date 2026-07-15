const express = require('express');
const StudentController = require('../../controller/Apis/StudentController');
const upload = require('../../utils/multer');
const router = express.Router();




router.post('/create-student',upload.single('image'),StudentController.createStudent)
router.get('/students',StudentController.getAllStudents)
router.get('/student/:id',StudentController.getStudentById)
router.put('/student/update/:id',StudentController.updateStudent)
router.delete('/student/delete/:id',StudentController.deleteStudent)




module.exports = router;