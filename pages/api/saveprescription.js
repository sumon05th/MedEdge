import Prescriptions from "../../models/prescriptionSchema";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, imageUrl, doctorName } = req.body;

      // Create a new patient document
      const newPatient = new Prescriptions({
        username,
        imageUrl,
        doctorName,
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
