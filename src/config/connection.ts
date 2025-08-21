import mongoose from "mongoose";
import config from "./config";

async function connectDB() {
  try {
    await mongoose.connect(config.dbUri, { connectTimeoutMS: 2000 });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectDB;
