import Users from "../models/patientUserModel";
import Patientprofiles from "../models/patientProfileModel";
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
  function createUserID(firstName, lastName, phoneNumber) {
    // Get the first two characters of the names and capitalize them
    const formattedFirstName = firstName.slice(0, 2).toUpperCase();
    const formattedLastName = lastName.slice(0, 2).toUpperCase();
  
    // Get the last five digits of the phone number
    const formattedPhoneNumber = phoneNumber.replace(/\D/g, '');
    const lastFiveDigits = formattedPhoneNumber.slice(-5);
  
    // Concatenate formatted names and last five digits of phone number
    const userID = "PAT"+formattedFirstName + formattedLastName + lastFiveDigits;
  
    return userID;
  }

  const user = new Users({
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
    role: body.role,
    username: createUserID(body.firstname, body.lastname, body.phone),
    password: hashpass,
  });
  const profile = new Patientprofiles({
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
    phone: body.phone,
    role: body.role,
    address: "",
    pincode: 0,
    profilephoto: "https://upload.wikimedia.org/wikipedia/commons/b/b5/Windows_10_Default_Profile_Picture.svg",
    gender: "",
    age: 0,
    bloodgroup: "",
    username: createUserID(body.firstname, body.lastname, body.phone)
  });
  await user.save();
  await profile.save();
  res.status(200).json({ message: "Registered successfully" });
}
