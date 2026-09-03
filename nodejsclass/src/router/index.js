
const express=require('express')

const router=express.Router()
const adminRoute=require('./apis/adminRoute')
const authRoutes=require('./apis/authRouter')
const studentRoute=require('./apis/student.api')


//this route is for api
router.use('/api/v1/admin',adminRoute)
router.use('/api/v2/user',authRoutes)
router.use('/api/v3/student',studentRoute)









module.exports=router