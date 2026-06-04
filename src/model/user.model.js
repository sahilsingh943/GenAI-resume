const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"User Already Taken" ],
        required:true,
    },
    email:{
        type:String,
        unique:[true,"email Already Taken" ],
        required:true,
    },
    password:{
        type:String,
        required:true,
    }

})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel
