require('dotenv').config();
const express=require('express');
const ejs=require('ejs')
const DBConnect=require('./src/config/dbcon')
const path=require('path')
const app=express();
DBConnect()


//setup ejs
app.set('view engine','ejs');
app.set('views','views')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
//create a static folder
app.use(express.static('public'))

//static folder

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/uploads',express.static('uploads')); 


const homeRoute=require('./src/router/homeRoute')
app.use(homeRoute)

const studentRoute=require('./src/router/apis/student.api')
const studentejsRoute=require('./src/router/studentejsroute')
app.use('/api',studentRoute)
app.use(studentejsRoute)

const Port=process.env.PORT || 3009

app.listen(Port,()=>{
    console.log(`server is running on port http://localhost:${Port}`)
})