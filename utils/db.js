import mongoose from "mongoose";
let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true); // set the strict query to true
  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
    });

    isConnected = true;
    console.log("MongoDB is already connected");
  } catch (e) {
    console.log(e);
  }
};
