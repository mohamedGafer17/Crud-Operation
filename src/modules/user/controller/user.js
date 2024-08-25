import jwt  from "jsonwebtoken";
import userModel from "../../../../DB/model/User.model.js";
import asyncHandler from 'express-async-handler'
import cloudinary from "../../../utils/cloudinary.js";


export const getUserProfile = asyncHandler(async(req, res, next) => {
    console.log(req.headers.authorization);
    const decoded = jwt.verify(req.headers.authorization, 'Alahly club of the century')
    console.log({decoded});
    const user = await userModel.findById(decoded.id)
    
    return res.json({ message: "Done", user})
})


export const changeProfilePic = asyncHandler(async(req, res, next) => {


    const {public_id, secure_url} = await cloudinary.uploader.upload(req.file.path, {folder: `saraha/user/${req.user._id}/profile`})

    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        {profileImage: {public_id, secure_url}},
        {new: true}
    )
    return res.json({ message: "Done", user, file: req.file})
})


export const changeCoverPic = asyncHandler(async(req, res, next) => {
    
    const coverImages = []
    for (const file of req.files) {
        coverImages.push(file.finalDest)
    }
    const user = await userModel.findByIdAndUpdate(
        req.user._id,
        { coverImages },
        {new: true}
    )
    return res.json({ message: "Done", user, file: req.files})
})