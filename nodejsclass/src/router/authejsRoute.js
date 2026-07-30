const express = require('express');
const AuthEjsController = require('../controller/AuthEjsController');
const AuthCheck = require('../middleware/auth');

const router = express.Router();







router.get('/register',AuthEjsController.register)
router.post('/register/create',AuthEjsController.registercreate)
router.get('/login',AuthEjsController.login)
router.post('/login/create',AuthEjsController.loginCreate)
router.get('/dashboard',AuthCheck,AuthEjsController.CheckAuth,AuthEjsController.dashboard)
router.get('/logout',AuthCheck,AuthEjsController.CheckAuth,AuthEjsController.logout)




module.exports=router