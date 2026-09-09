const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require('dotenv').config()

const express = require('express');
const dbCon = require('./src/config/dbCon');
const app = express()


dbCon()


app.use(express.json())

const employeeRouter = require('./src/router/employee.router')
app.use("/api", employeeRouter)
const lookupRoute=require('./src/router/lookupRoute')
app.use("/api", lookupRoute)

const PORT = process.env.PORT || 3007;
app.listen(PORT, ()=>{
    console.log(`app is listening on PORT ${PORT}`)
})