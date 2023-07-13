import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";

function PatientProfile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;

  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const [bloodgroup, setBloodgroup] = useState();
  const [pincode, setPincode] = useState();
  const [gender, setGender] = useState();
  const [reports, setReports] = useState();
  const [username, setUsername] = useState();
  const [prescriptions, setPrescriptions] = useState();
  // const [image, setImage] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = () => {
    const url = `http://localhost:3000/api/getpatientprofile/?email=${emailt}`;
    return axios.get(url).then((response) => {
      setProfile(response.data);
      setAge(response.data.age);
      setAddress(response.data.address);
      setBloodgroup(response.data.bloodgroup);
      setPincode(response.data.pincode);
      setGender(response.data.gender);
    });
  };

  const fetchreports = () => {
    const url = `http://localhost:3000/api/getreport/?username=${profile?.username}`;
    return axios.get(url).then((response) => {
      setReports(response.data);
    });
  };
  const fetchprescriptions = () => {
    const url = `http://localhost:3000/api/getprescription/?username=${profile?.username}`;
    return axios.get(url).then((response) => {
      setPrescriptions(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchreports();
  }, [profile]);

  useEffect(() => {
    fetchprescriptions();
  }, [profile]);

  const updateProfile = async (e) => {
    e.preventDefault();
    const email = session.user.email;
    const formData = new FormData();
    formData.append("file", imagefile);
    formData.append("upload_preset", "profilephotos"); // Replace with your Cloudinary upload preset
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dvefqwjbl/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    const imageUrl = data.secure_url; // Get the uploaded image URL
    const res = await fetch(`http://localhost:3000/api/updatepatientprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        address,
        age,
        pincode,
        bloodgroup,
        gender,
        profilephoto: imageUrl,
      }),
    });
    Router.reload();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();

    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="m-6 mr-10 ml-10">
      <div className="bg-sky-200 rounded-md pb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <Image
          className=" mx-auto pt-2 pb-2 "
          src={selectedImage || profile?.profilephoto}
          alt="Picture of the author"
          width={200}
          height={200}
        />
        <div className=" mt-2 text-center font-bold  ">
          {" "}
          <span className="font-semibold font-mono"> UserName :</span>{" "}
          {profile?.username}
        </div>
      </div>
      <div className="bg-red-100 mt-3 rounded-lg pb-4">
        <div className=" ml-16 p-4">
          <h3 className=" flex items-center justify-center font-bold ">
            Patient Details
          </h3>
          <div className=" mt-2 font-semibold font-mono ml-2 text-lg ">
            <span className="font-semibold font-mono "> Name :</span>
            {profile?.firstname} {profile?.lastname}
          </div>

          <div className=" mt-2 font-semibold font-mono ml-2 text-lg">
            <span className="font-semibold font-mono"> Contact :</span>
            {profile?.phone}
          </div>
          <div className="  mt-2 font-semibold font-mono ml-2 text-lg ">
            <span className="font-semibold font-mono"> Email :</span>
            {profile?.email}
          </div>

          <div className=" grid-flow-col ">
            <div className="relative h-11 mt-1 w-full min-w-[200px]">
              <div className="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Age:
                </span>

                <input
                  placeholder="Enter Your Age"
                  className="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>

            <div className="relative h-11 mt-1 w-full min-w-[200px]">
              <div className="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Address:
                </span>

                <input
                  placeholder="Enter Your Address"
                  className="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 block w-[50%] overflow-hidden resize-both min-h-40px leading-20px font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="Enter Your Adress "
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="relative h-11 mt-1 w-full min-w-[200px]">
              <div className="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Pincode:
                </span>

                <input
                  placeholder="Pincode"
                  className="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="pincode"
                  type="number"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>

            <div className="relative h-11 mt-1 w-full min-w-[200px]">
              <div className="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Blood Group:
                </span>

                <input
                  placeholder="Enter Blood Group"
                  className="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="bloodgroup"
                  type="text"
                  value={bloodgroup}
                  onChange={(e) => setBloodgroup(e.target.value)}
                />
              </div>
            </div>

            <div className="relative h-11 mt-1 w-full min-w-[200px]">
              <div className="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  Gender:
                </span>

                <input
                  placeholder="Your Gender"
                  className="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md  font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="gender"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-2  place-items-center mt-4 ">
          <div>
            <button
              className="h-10 w-20 border-2 font-bold hover:bg-green-900 hover:text-white bg-green-400 mr-40  border-gray-500 rounded-md"
              type="submit"
              onClick={(e) => updateProfile(e)}
            >
              Update
            </button>
          </div>
          <div>
            <button
              className="h-10 w-20 border-2 font-bold bg-red-500  hover:bg-red-700 hover:text-white border-gray-500 rounded-md"
              onClick={() =>
                signOut({
                  callbackUrl: `${window.location.origin}`,
                })
              }
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="bg-green-200 p-8 mt-4 rounded-lg grid grid-cols-2 gap-3">
        <div>
          <h3 className=" flex  font-bold ">Patient Lab Reports</h3>

          {reports?.map((report) => (
            <div>
              <p className="font-mono font-semibold">
                <span className="font-bold text-gray-500">Lab:</span>
              </p>
              <p className="font-mono font-semibold">{report.labName}</p>
              <p className="font-mono font-semibold">{report.labAddress}</p>

              <Image
                className="ml-10 mt-3"
                src={report.imageUrl}
                alt="Picture of the author"
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>

        <div className="ml-6 ">
          <h3 className=" font-bold ">Patient prescription</h3>
          {prescriptions?.map((prescription) => (
            <div className="mt-4">
              <p className="font-mono font-semibold">
                <span className="font-bold text-gray-500">Doctor:</span>
                {prescription.doctorName}
              </p>
              <Image
                className="ml-10 mt-3"
                src={prescription.imageUrl}
                alt="Picture of the author"
                width={200}
                height={200}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
// export async function getServerSideProps() {
//   const session = await getSession(context);
//   const email = session.user.email;
//   const profile = await fetch(
//     `http://localhost:3000/api/getpatientprofile/?email=${email}`
//   ).then((res) => res.json());
//   return {
//     props: {
//       session,
//       check,
//       profile,
//       email,
//     },
//   };
// }
