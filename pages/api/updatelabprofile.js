import Labprofile from "../../models/labProfileModel";
import connectDB from "./auth/lib/connectDB";
export default async function handler(req, res) {
  try {
    await connectDB();
    const body = req.body;
    const profile = await Labprofile.findOneAndUpdate(
      {
        email: body.email,
      },
      { address: body.address, pincode: body.pincode, age: body.age, bloodgroup: body.bloodgroup, gender: body.gender, labtype: body.labtype, labid: body.labid }
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: "error" });
  }
}