import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', ()=> console.log("Database conected"));

    await mongoose.connect(`${process.env.MONGODB_URL}/admin_dashbord`);
};

export default connectDB;