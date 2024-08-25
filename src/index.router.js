import connectDB from "../DB/connection.js"
import userRouter from "./modules/user/user.router.js"
import authRouter from "./modules/auth/auth.router.js"


const bootstrap = (app, express)=> {


    app.use(express.json())
    app.use("/auth" , authRouter)
    app.use("/user" , userRouter)
    app.use( "*", (req,res,next) =>{
        return res.json({message: "In-valid Routing"})
    })

    connectDB()
}

export default bootstrap