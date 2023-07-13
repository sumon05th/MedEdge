import mongoose from "mongoose";
const reportSchema = new mongoose.Schema(
  {
    username: String,
    imageUrl: String,
    labName: String,
    labAddress: String,
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.reports || mongoose.model("reports", reportSchema);
export default Dataset;
