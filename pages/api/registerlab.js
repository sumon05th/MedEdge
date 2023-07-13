import Users from "../../models/labUserModel";
import Labprofiles from "../../models/labProfileModel";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  const body = req.body;
  const userExists = await Users.findOne({ phone: body.phone });
  if (userExists) {
    res.status(200).json({ message: "Already registered" });
    return;
  }
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  const hashpass = await bcrypt.hash(body.password, salt);
  const user = new Users({
    email: body.email,
    name: body.name,
    phone: body.phone,
    role: body.role,
    username: createUserID(body.name, body.phone),
    password: hashpass,
  });

  function createUserID(name, phoneNumber) {
    // Get the first two characters of the names and capitalize them
    const formattedName = name.slice(0, 2).toUpperCase();


    // Get the last five digits of the phone number
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const lastFiveDigits = formattedPhoneNumber.slice(-5);

    // Concatenate formatted name, lab type, and last five digits of the phone number
    const userID = "LAB" + formattedName + lastFiveDigits;

    return userID;
  }

  const profile = new Labprofiles({
    email: body.email,
    name: body.name,
    phone: body.phone,
    username: body.username,
    role: body.role,

    address: "",
    username: createUserID(body.name, body.phone),
    pincode: 0,
  });
  await user.save();
  await profile.save();
  res.status(200).json({ message: "Registered successfully" });
}
