import mongoose from "mongoose";
const profileSchema = new mongoose.Schema(
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
    speciality: { 
      type: String, 
    },

    age: {
      type: Number,
    },
    role: {
      type: String,
    },
    phone: {
      type: Number,
    },
    address: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    profilephoto: {
      type: String,
    },
    experience: {
      type: Number,
    }, 
    currentworkplace: {
      type: String,
    },
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.doctorprofiles ||
  mongoose.model("doctorprofiles", profileSchema);
export default Dataset;
