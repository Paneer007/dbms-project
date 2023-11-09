import config from "../config/config";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDatabase = async (database: string, uri?: string) => {
  try {
    database = config.mongodb;
    uri = config.mongodburi;
    console.log(uri);
    await mongoose.connect(uri + database);
    console.log("Connection with nosql database successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectMongoDatabase;
