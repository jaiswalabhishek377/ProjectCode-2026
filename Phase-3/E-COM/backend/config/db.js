import mongoose from "mongoose";
import { seedAdminUser } from "./seedAdmin.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || `mongodb+srv://jaiswalabhishek377_db_user:${process.env.MONGODB_PASSWORD}@cluster0.ofwiih2.mongodb.net/e_commerce_db?retryWrites=true&w=majority`);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        await seedAdminUser();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
};