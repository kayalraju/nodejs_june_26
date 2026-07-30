require('dotenv').config();
const express=require('express');
const ejs=require('ejs')
const DBConnect=require('./src/config/dbcon')
const path=require('path')
const cors=require('cors')
const cookieParser=require('cookie-parser')
const session=require('express-session')
const app=express();
DBConnect()


app.use(cors())
//setup ejs
app.set('view engine','ejs');
app.set('views','views')

app.use(cookieParser())
app.use(session({
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24 // 24 hours
     }
  }))
  
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//create a static folder
app.use(express.static('public'))

//static folder

app.use('/uploads',express.static(path.join(__dirname,'uploads')))
app.use('/uploads',express.static('uploads')); 



const AuthEjsRouter=require('./src/router/authejsRoute')
app.use(AuthEjsRouter)

const authRouter=require('./src/router/apis/authRouter')
app.use('/api',authRouter)

const homeRoute=require('./src/router/homeRoute')
app.use(homeRoute)

const studentRoute=require('./src/router/apis/student.api')
const studentejsRoute=require('./src/router/studentejsroute')
app.use('/api',studentRoute)
app.use(studentejsRoute)

//admin route
const adminRoute=require('./src/router/apis/adminRoute')
app.use('/admin/api',adminRoute)

const Port=process.env.PORT || 3009

app.listen(Port,()=>{
    console.log(`server is running on port http://localhost:${Port}`)
})