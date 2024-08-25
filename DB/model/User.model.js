import { Schema , model } from "mongoose";
const userSchema = new Schema({
    firstName: {type: String, required: true, tolower:true},
    lastName: {type: String, required: true, tolower:true },
    userName: {type: String, required: true, tolower:true},
    email: {type: String, required: true, unique: true, tolower:true },
    password: {type: String, required: true},
    age:{ type: Number, default : 25},
    phone: {type: Number},
    profileImage: {public_id : String, secure_url:String},
    coverImages: {public_id : String, secure_url:String},
    gender: {type: String, default: "male" },//enum:['Male', 'Female']
    confirmEmail: {type: String, default: false},
},{timestamps: true})
const userModel = model("User", userSchema)
export default userModel