import mongoose from "mongoose";
const Schema = mongoose.Schema;

const User = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password_digest: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("users", User);
