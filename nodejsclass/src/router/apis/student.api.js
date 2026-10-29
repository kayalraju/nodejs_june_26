const express = require('express');
const StudentController = require('../../controller/Apis/StudentController');
const upload = require('../../utils/multer');
const router = express.Router();




//router.post('/create-student',upload.single('image'),StudentController.createStudent)


/**
* @swagger
* /api/v3/student/create-student:
*   post:
*     summary: create Student
*     tags:
*       - Student
*     produces:
*       - application/json
*     parameters:
 *      - in: body
 *        name: Add student
 *        description: Add student in MongoDB.
 *        schema:
 *          type: object
 *          required:
 *            - name
 *            - email
 *            - phone
 *            - city
 *            - state
 *            - country
 *            - image
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            phone:
 *              type: string
 *            city:
 *              type: string
 *            state:
 *              type: string
 *            country:
 *              type: string
 *            image:
 *              type: string
 *     responses:
 *        200:
 *          description: student data added
 *        400:
 *          description: Bad Request
*        500:
*          description: Server Error
*/
router.post('/create-student',StudentController.createStudent)
/**
 * @swagger
 * /api/v3/student/students:
 *  get:
 *    summary: Get all the student from Database
 *    tags:
 *       - Student
 *    produces:
 *      - application/json
 *    responses:
 *      '200':
 *        description: data fetched successfully.
 */
router.get('/students',StudentController.getAllStudents)
router.get('/student/:id',StudentController.getStudentById)
router.put('/student/update/:id',StudentController.updateStudent)
router.delete('/student/delete/:id',StudentController.deleteStudent)




module.exports = router;