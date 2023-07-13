import Reports from "../../models/reportSchema";
import connectDB from "./auth/lib/connectDB";
import Labprofile from "../../models/labProfileModel";
export default async function handler(req, res) {
  if (req.method === "POST") {
    await connectDB();
    try {
      const { username, imageUrl, labName } = req.body;
      const profile = await Labprofile.findOne({
        name: labName,
      });
      // Create a new patient document
      const newPatient = new Reports({
        username,
        imageUrl,
        labAddress: profile.address || "default address",
        labName,
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
