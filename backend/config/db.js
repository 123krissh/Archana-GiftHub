import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    } catch {
        console.log("MongoDB connection failed.", Error); 
        process.exit(1);
    }
};

export default connectDB;