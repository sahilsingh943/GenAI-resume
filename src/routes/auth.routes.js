const {Router} = require('express') // express mein router hota hai 
const authController = require("../controllers/auth.controllers")
const authRouter = Router()
authRouter.post("/register",authController.registerUserController)
/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
module.exports = authRouter