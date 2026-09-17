const {Product}=require('../models/index')


class ProductController{
    async CreateProduct(req,res){
        try{
            //console.log(req.body)
            const {name,price,description}=req.body
            const product=await Product.create({name,price,description})
            res.status(201).json({
                success:true,
                message:"Product created successfully",
                data:product
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }
    async getProduct(req,res){
        try{
            //console.log(req.body)
           
            const product=await Product.findAll()
            res.status(201).json({
                success:true,
                message:"Product fetched successfully",
                data:product
            })

        }catch(err){
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
    }

}


module.exports=new ProductController()