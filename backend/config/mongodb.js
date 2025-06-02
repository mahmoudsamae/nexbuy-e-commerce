import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("database connected seccesfuly")
  } catch (error) {
    console.log("error :" + error);
  }
}

export default connectDB;