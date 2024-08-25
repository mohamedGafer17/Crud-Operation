import mongoose from "mongoose";



const connectDB = async() => {
    return await mongoose.connect(process.env.DB_URL)
    // return await mongoose.connect("mongodb://127.0.0.1:27017/Saraha")
    .then (result=> {
        console.log(`DB Connected`)
    }) .catch(err => console.log(`Fail to connectDB ........${err}`))
}
export default connectDB