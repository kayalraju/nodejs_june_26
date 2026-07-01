require('dotenv').config();
const express=require('express');
const ejs=require('ejs')
const DBConnect=require('./src/config/dbcon')
const app=express();
DBConnect()


//setup ejs
app.set('view engine','ejs');
app.set('views','views')

//create a static folder
app.use(express.static('public'))


const homeRoute=require('./src/router/homeRoute')
app.use(homeRoute)


const Port=process.env.PORT || 3009

app.listen(Port,()=>{
    console.log(`server is running on port http://localhost:${Port}`)
})