import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
  },
  { timestamps: true }
);

UserSchema.statics.encryptedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivePassword) => {
  return await bcrypt.compare(password, receivePassword);
};

export default mongoose.model("User", UserSchema);
