const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
/**
 * @name registerUserController
 * @description Register a new user
 * @access Public
 */

async function registerUserController(req,res){
    const{username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({
            message:"please provide username , email and password"
        })
    }

    const isUseralready = await userModel.findOne({
        $or: [ { username },{ email } ] 
    })
    if(isUseralready){
        return res.status(400).json({
            message:"User Already Exist"
        })
    }

    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash
    })
    return res.status(201).json({
        message:"User Created Successfully",
        user
    })

    const token = jwt.sign({userId:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"})

    res.cookie("token",token)
     res.status(201).json({
        message:"User Created Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
     })
}
 const loginUserController = async (req,res)=>{
    const{email,password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"User Not Found"
        })
    }
    const isPasswordCorrect = await bcrypt.compare(password,user.password)
    if(!isPasswordCorrect){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }
    const token = jwt.sign({userId:user._id, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn:"1d"})
    res.cookie("token",token)
    res.status(200).json({
        message:"Login Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
    if(!email || !password){
        return res.status(400).json({
            message:"please provide email and password"
        })
    }
    
 }



module.exports = {registerUserController,loginUserController}