import mongoose from "mongoose";


export const connectDB = async()=>{
    await mongoose.connect(`mongodb+srv://jaiswalabhishek377_db_user:${process.env.MONGODB_PASSWORD}@cluster0.de2o2kr.mongodb.net/?appName=Cluster0`).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.log("Error connecting to MongoDB:", err);
    });
}

