import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', ()=> console.log("Database conected"));

    await mongoose.connect(`${process.env.MONGODB_URL}/optical-business-management`);
};

export default connectDB;