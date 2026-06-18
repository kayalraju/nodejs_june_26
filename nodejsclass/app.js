const express=require('express');




const app=express();





app.get('/about',(req,res)=>{
    res.send('welcome to about page')
})

app.get('/contact',(req,res)=>{
    res.send('welcome to contact page')
})

const homeRoute=require('./src/router/homeRoute')
app.use(homeRoute)


const Port=3009

app.listen(Port,()=>{
    console.log(`server is running on port http://localhost:${Port}`)
})