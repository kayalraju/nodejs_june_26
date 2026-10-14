const express = require("express");
const productController = require("../controller/product.controller");
const Validation = require("../validations/index");
const ProductValidation = require("../validations/product.validation");
const upload = require("../middleware/multer");
const router = express.Router();




router.post('/create/product',upload.single("image"),Validation.validate(ProductValidation.CreateProduct),productController.createProduct);
router.get('/products', productController.getProducts);
// router.get('/product/:slug', productController.getProductBySlug);
// router.put('/product/:slug',upload.single("image"),Validation.validate(ProductValidation.UpdateProduct),productController.updateProduct);
// router.delete('/product/:id', productController.deleteProduct);




module.exports = router;
