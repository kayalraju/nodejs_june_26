const {Product}=require('../models/index')


class ProductController{
    async CreateProduct(req,res){
        try{
            //console.log(req.body)
            const {name,email,phone}=req.body
            const user=await Product.create({name,email,phone})
            res.status(201).json({
                success:true,
                message:"user created successfully",
                data:user
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
           
            const user=await User.findAll()
            res.status(201).json({
                success:true,
                data:user
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