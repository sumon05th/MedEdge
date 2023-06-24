import mongoose from "mongoose";
import Reports from "../models/reportSchema";
// Connect to MongoDB using Mongoose
// mongoose.connect("mongodb://localhost:27017/mededge/", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Create a schema for the patient data
// const reportSchema = new mongoose.Schema({
//   username: String,
//   imageUrl: String,
// });

// Create a model based on the schema
// const Patient = mongoose.model("reports", reportSchema);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, imageUrl } = req.body;

      // Create a new patient document
      const newPatient = new Reports({
        username,
        imageUrl,
      });

      // Save the patient document to the database
      await newPatient.save();

      res.status(200).json({ message: "Patient data saved successfully." });
    } catch (error) {
      res
        .status(500)
        .json({ message: "An error occurred while saving the patient data." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}
