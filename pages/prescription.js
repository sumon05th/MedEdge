import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";

export default function prescription() {
  const { data: session } = useSession();
  if (session.user.role !== "doctor") {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    );
  }
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState(0);
  const [image, setImage] = useState(null);
  console.log(image);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ph = await axios.get(
      `http://localhost:3000/api/getpatientnumber/?username=${username}`
    );
    const phone = ph.data.phone;
    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "prescriptiondata"); // Replace with your Cloudinary upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvefqwjbl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.secure_url; // Get the uploaded image URL

    const number = "91" + phone;
    const chatid = `${number}@c.us`;
    const res = await fetch(
      "https://api.green-api.com/waInstance7103832087/sendFileByUrl/9037e1378e404f429d9b24934c7282c7786a8e8a0ef14ee294",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: chatid,
          urlFile: imageUrl,
          fileName: "prescription.jpg",
          caption: `Your Prescptions from Dr. ${session.user.name}`,
        }),
      }
    );

    // Save the URL and username to MongoDB
    const patientData = {
      username,
      imageUrl,
      doctorName: session.user.name,
    };

    const saveResponse = await fetch("/api/saveprescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(patientData),
    });
    let datat = await saveResponse.json();
    if (datat.message) {
      setMessage(datat.message);
    }
    if (datat.message === "Patient data saved successfully.") {
      window.location.reload();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label>Upload Prescription:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
      </form>

      <p>{message}</p>
      <button className="h-10 w-20 border-2 font-bold bg-red-500  hover:bg-red-700 hover:text-white border-gray-500 rounded-md">
        <a href="http://localhost:3000/profile">Go Back to Profile</a>
      </button>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
