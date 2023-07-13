import mongoose from "mongoose";
const prescriptionSchema = new mongoose.Schema(
  {
    username: String,
    imageUrl: String,
    doctorName: String,
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.prescriptions ||
  mongoose.model("prescriptions", prescriptionSchema);
export default Dataset;
