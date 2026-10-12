const express=require('express')



const Router=express.Router()


Router.get('/error',(req,res)=>{
    res.send("product route")
})








module.exports=Router