const express = require("express");  // express ko import kiya 
const app = express() // express sever ko app naam se initialize kiya
app.use(express.json())

const authRouter = require('./routes/auth.routes') // yha se auth ko call kiya
app.use("/api/auth" ,authRouter) 

module.exports = app // for export app to server