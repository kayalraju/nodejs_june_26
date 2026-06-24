const express=require('express');
const ejs=require('ejs')



const app=express();



//setup ejs
app.set('view engine','ejs');
app.set('views','views')




const homeRoute=require('./src/router/homeRoute')
app.use(homeRoute)


const Port=3009

app.listen(Port,()=>{
    console.log(`server is running on port http://localhost:${Port}`)
})