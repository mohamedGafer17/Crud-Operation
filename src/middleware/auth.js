import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/errorHandling.js";
import userModel from "../../DB/model/User.model.js";

export const auth = asyncHandler(async (req, res, next) => {
    const {authorization} = req.headers;
    console.log({authorization});
    
    if (!authorization?.startsWith(process.env.TOKEN_BEARER)) {
        return next(new Error("authorization is required or In-valid Bearer key", {cause:401 }))
    }
    console.log(authorization.startsWith(process.env.TOKEN_BEARER));
    const token = authorization.split(process.env.TOKEN_BEARER)
    console.log(token);
    const decoded = jwt.verify(token, process.env.TOKEN_SIGNATURE)
    console.log({ decoded });
    if (!decoded?.id) {
        return next(new Error("In-valid token payload", { cause: 400 }))    
    }
    const user = await userModel.findById(decoded.id);
    console.log({ user });
    if (!user) {
        return next(new Error("Not Register account", {cause:404}))
    }
    req.user = user
    return next()
})

















// export const auth = asyncHandler(async (req, res, next) => {
//     const {authorization} = req.headers;
//     console.log({authorization});
//     if (!authorization?.startsWith("Bearer ")) {
//         return next(new Error("authorization id required or In-valid Bearer key", {cause:401 }))
//     }
//     console.log(authorization.startsWith("Bearer "));
//     const token = authorization.split("Bearer ")[1]
//     console.log(token);
//     const decoded = jwt.verify(token, "Alahly club of the century")
//     console.log({ decoded });
//     if (!decoded?.id) {
//         return next(new Error("In-valid token payload", { cause: 400 }))    
//     }
//     const user = await userModel.findById(decoded.id);
//     console.log({user});
//     if (!user) {
//         return next(new Error("Not Register account", {cause:404}))
//     }
//     req.user = user
//     return next()
// })
    
    