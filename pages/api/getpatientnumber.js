import Patientprofile from "../../models/patientProfileModel";
import connectDB from "./auth/lib/connectDB";
export default async function getUser(req, res) {
  try {
    await connectDB();
    const profile = (await Patientprofile.findOne({
      username: req.query.username,
    })) || { phone: "0000000" };
    res.status(200).json({ phone: profile.phone });
  } catch (err) {
    console.log(err);
    res.status(200).json({ error: "error sending" });
  }
}
