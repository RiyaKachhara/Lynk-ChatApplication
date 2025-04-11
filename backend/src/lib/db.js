import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        // const conn = await mongoose.connect("mongodb+srv://riyakachhara2211:test12345@cluster0.b4qqpma.mongodb.net/chat_db?retryWrites=true&w=majority&appName=Cluster0");

        console.log(`MongoDB connected : ${conn.connection.host}`)
    }catch(error){
        console.log("MongoDB connection error : ", error);
    }
};