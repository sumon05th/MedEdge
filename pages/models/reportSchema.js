import mongoose from "mongoose";
const reportSchema = new mongoose.Schema(
  {
    username: String,
    imageUrl: String,
  },
  { timestamps: true }
);
let Dataset =
  mongoose.models.reports || mongoose.model("reports", reportSchema);
export default Dataset;
