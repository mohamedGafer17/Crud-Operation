import userModel from '../../../../DB/model/User.model.js'
import bcrypt from 'bcryptjs'
import { asyncHandler } from '../../../utils/errorHandling.js'
import jwt from 'jsonwebtoken'
import sendEmail from '../../../utils/email.js'
import * as validators from "../validation.js"


// register
export const register = asyncHandler(async(req, res, next) => {
    try {
        const {firstName, lastName, userName, email, password} = req.body

        const validationResult = validators.signup.validate(req.body, {abortEarly: false})
        return res.json ({message: "Validation Error", validationResult})
    
    const checkUser = await userModel.findOne({ email })
    if (checkUser) {
        return res.json({message: "Email Exist"})
    }
    
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND))
    const user = await userModel.create({firstName, lastName, userName, email, password: hashPassword})
    const token = jwt.sign({id:user._id, email: user.email}, process.env.EMAIL_SIGNATURE)
    const html = `<a href= '${req.protocol}://${req.headers.host}/auth/confirmEmail/${token}'>Confirm Email</a>`
    await sendEmail({to: email , subject: "Confirm Email", html})

    return res.status(201).json({message: "Done", user})
    } catch (error) {
        return res.status(500).json({
        message: "Catch error", 
        error, 
        message: error.message,
         stack: error.stack
        })
    }
})

export const confirmEmail = asyncHandler(async(req, res, next) => {
    const {token} = req.params
    console.log({token});
    const decoded = jwt.verify(token, process.env.EMAIL_SIGNATURE)
    console.log({decoded});
    const user = await userModel.findByIdAndUpdate(decoded.id, {confirmEmail: true})
    return user ? res.json({ message: "Done"}) : next(new Error("Not register account", { cause : 404 }))
    
})



// ---------------------
// export const register = async(req, res, next) =>{
//     try {
//         const {firstName,lastName, userName, email, password} = req.body
//         const checkUser = await userModel.findOne({email})
//         if (checkUser) {
//             return res.json({message: "Email Exist"})
//         }

//         const users = await userModel.create({firstName, lastName, userName, email, password})
//         return res.json({message: " done", users})
//     } catch (error) {
//         return res.json({
//             message: "Catch error",
//             error,
//             message: error.message,
//             stack: error.stack
//         })
//     }
// }
// ---------------------------------------
// -----login-----------
export const login = asyncHandler(async(req, res, next) => {
    try {
        const { email, password} = req.body
    
    const user = await userModel.findOne({ email})
    if ( !user ) {
        return next(new Error("In-valid Email"))
    }
    console.log({password, hashPassword:user.password});
    const match = bcrypt.compareSync(password , user.password)
    console.log({match});
    if (!match) {
        return next (new Error ("In-valid Email Or Password "))
    }
    const token = jwt.sign({name:user.userName , id:user._id, isloggedIn: true}, process.env.TOKEN_SIGNATURE)
    return res.json({message: "Done", token})
    } catch (error) {
        return res.json({
        message: "Catch error", 
        error, 
        message: error.message,
         stack: error.stack
        })
    }
})


// export const login = async (req,res) => {
//     try {
    
//         const { email, password} = req.body
    
//         const user = await userModel.find({ email, password})
//         if (!user) {
//             return res.json({message: "Invalid email or password"})
//         }
//         return res.json ({message:"Done", user})
//     } catch (error) {
//         return res.json({ 
//             message: "Catch error", 
//             error, 
//             message: error.message,
//             stack: error.stack
//         })
//     }
// }


