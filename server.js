require('dotenv').config()
const database = require("./src/config/Database")
database()
const app = require("./src/app");

app.listen(3000,()=>{
    console.log("app is running");
})
