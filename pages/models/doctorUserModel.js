import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    gender:{
      type:String,
    },
    doctorid: {
      type: String,
    },
    exprerience: {

      type: Number,

    },
    age: {  
      type: Number,
    },
    speciality: { 
      type: String, 
    },
    currentworkplace: {
      type: String,
    },
    role: {
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
