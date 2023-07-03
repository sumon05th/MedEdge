// import React, { useState } from "react";
// import { useSession, getSession } from "next-auth/react";

// export default function report() {
//   const { data: session } = useSession();
//   if (session.user.role !== "lab") {
//     return (
//       <div>
//         <h1>Access Denied</h1>
//       </div>
//     );
//   }
//   console.log(session.user);
//   const [message, setMessage] = useState("");
//   const [username, setUsername] = useState("");
//   const [image, setImage] = useState(null);

//   const handleUsernameChange = (e) => {
//     setUsername(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Upload image to Cloudinary
//     const formData = new FormData();
//     formData.append("file", image);
//     formData.append("upload_preset", "reportdata"); // Replace with your Cloudinary upload preset

//     const response = await fetch(
//       "https://api.cloudinary.com/v1_1/dvefqwjbl/image/upload",
//       {
//         method: "POST",
//         body: formData,
//       }
//     );

//     const data = await response.json();
//     const imageUrl = data.secure_url; // Get the uploaded image URL

//     // Save the URL and username to MongoDB
//     const patientData = {
//       username,
//       imageUrl,
//       labName: session.user.name,
//     };

//     const saveResponse = await fetch("/api/savereportdata", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(patientData),
//     });
//     let datat = await saveResponse.json();
//     if (datat.message) {
//       setMessage(datat.message);
//     }
//     if (datat.message === "Patient data saved successfully.") {
//       window.location.reload();
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username:</label>
//           <input type="text" value={username} onChange={handleUsernameChange} />
//         </div>
//         <div>
//           <label>Image:</label>
//           <input type="file" accept="image/*" onChange={handleImageChange} />
//         </div>
//         <button type="submit">Submit</button>
//       </form>

//       <p>{message}</p>

//       <div>
//         <button>
//           <a href="http://localhost:3000/profile">Go Back to Lab</a>
//         </button>
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   return {
//     props: {
//       session,
//     },
//   };
// }

import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";

export default function report() {
  const { data: session } = useSession();
  if (session.user.role !== "lab") {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    );
  }
  console.log(session.user);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(null);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "reportdata"); // Replace with your Cloudinary upload preset

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvefqwjbl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.secure_url; // Get the uploaded image URL

    // Save the URL and username to MongoDB
    const patientData = {
      username,
      imageUrl,
      labName: session.user.name,
    };

    const saveResponse = await fetch("/api/savereportdata", {
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
    <div className="bg-green-200 grid justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className="pt-3 pb-3 mt-20 font-semibold font-mono ml-2 text-lg">
          <label>Username:</label>
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div className="pt-3 pb-3 mt-20 font-semibold font-mono ml-2 text-lg">
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <div className=" mt-4 pb-3 mt-10 h-10 w-40 ml-2 border-1 font-bold hover:bg-green-900 hover:text-white bg-green-400 mr-40  border-gray-500 rounded-md">
          <button type="submit">Submit</button>
        </div>
      </form>

      <p>{message}</p>

      <div className="mt-20 mb-10 h-10 w-40 ml-2 border-1 font-bold hover:bg-green-900 hover:text-white bg-blue-400 mr-40  border-gray-500 rounded-md ">
        <button>
          <a href="http://localhost:3000/profile">Go Back to Lab</a>
        </button>
      </div>
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
