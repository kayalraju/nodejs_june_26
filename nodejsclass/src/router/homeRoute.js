const express = require('express');
const HomeController = require('../controller/HomeController');
const router = express.Router();







router.get('/',HomeController.home)
router.get('/about',HomeController.about)




module.exports=router