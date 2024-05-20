import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
const MONGODB_URI = process.env.MONGODB_URI

export default async function conectDB(){
    
    try {
        mongoose.connect(MONGODB_URI)
        console.log("banco conectado")          
    } catch (error) {
        console.log("error: ", error.message)
    }
}
