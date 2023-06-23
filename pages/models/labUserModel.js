import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    name: {
      type: String,
    },
    role: {
      type: String,
    },
    labid: {  
      type: String,
    },
    labtype: {
      type: String,
    },
    phone: {
      type: Number,
    },
    password: {
      type: String,
    },

  },
  { timestamps: true }
);
let Dataset = mongoose.models.users || mongoose.model("users", userSchema);
export default Dataset;
