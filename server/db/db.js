import mongoose from "mongoose";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connection Succesfully!"))
    .catch((err) => {
      console.log(err);
    });
};

export default connectDB;
