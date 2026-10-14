const Product = require("../models/product.models");
const { clearProductsCache, getProductsCache, setProductsCache } = require("../services/product.cache");
const generateProductSlug = require("../utils/generateProductSlug");
const uploadFileCloudinary = require("../utils/uploadFileCludenary");

class ProductController {
  async createProduct(req, res) {
    try {
      const { name, description, category, price } = req.body;
      const duplicateProduct = await Product.findOne({ name });
      if (duplicateProduct) {
        return res.status(400).json({
          success: false,
          message: "Product with this name already exists",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Image file is required",
        });
      }
      // why used buffer - because I stored file in memory instead of local disk(multer storage)
      // multer.memoryStorage()
      // buffer is used to store the file in memory instead of local disk
      // buffer is a binary data format
      const result = await uploadFileCloudinary(req.file.buffer, "products");

      //create slug
      const slug = generateProductSlug(name, category);

      const product = new Product({
        name,
        description,
        category,
        price: Number(price),
        image: {
          url: result.secure_url,
          public_id: result.public_id,
        },
        slug,
      });
      const productCreate = await product.save();
      //Redis Product list/cache is now outdated.
      // Delete Redis cache AFTER successful DB save.
      await clearProductsCache();
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: productCreate,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }

  async getProducts(req,res){
    try {
      const cachedProducts = await getProductsCache();
      if (cachedProducts) {
        return res.status(200).json({
          success: true,
          source: "redis",
          products: cachedProducts,
        });
      }
      const products = await Product.find().sort({ createdAt: -1 }).lean();

      await setProductsCache(products);

      return res.status(200).json({
        success: true,
        source: "mongodb",
        products,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  }
}

module.exports = new ProductController();
