const express = require('express');
const StudentEjsController = require('../controller/StudentEjsController');

const router = express.Router();




router.get('/student',StudentEjsController.list)
router.get('/student/store',StudentEjsController.store)
router.post('/student/create',StudentEjsController.create)
router.get('/student/delete/:id',StudentEjsController.delete)





module.exports = router;