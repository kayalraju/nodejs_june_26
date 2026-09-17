const express=require('express')
const productController = require('../controller/product.controller')
const router=express.Router()


router.post('/create/product',productController.CreateProduct)
router.get('/product',productController.getProduct)



module.exports=router