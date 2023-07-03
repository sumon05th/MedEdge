import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
import Image from "next/image";
function Doctorprofile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;
  const [speciality, setSpeciality] = useState();
  const [age, setAge] = useState();
  const [currentworkplace, setCurrentworkplace] = useState();
  const [gender, setGender] = useState();
  const [role, setrole] = useState();
  const [experience, setExperience] = useState();
  const [reports, setReports] = useState();
  const [image, setImage] = useState(null);
  const [imagefile, setImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchData = () => {
    const url = `http://localhost:3000/api/getdoctorprofile/?email=${emailt}`;
    return axios.get(url).then((response) => {
      setProfile(response.data);
      setAge(response.data.age);
      setCurrentworkplace(response.data.currentworkplace);
      setExperience(response.data.experience);
      setGender(response.data.gender);
      setrole(response.data.role);
      setSpeciality(response.data.speciality);
      setImage(response.data.profilephoto);
    });
  };

  const fetchreports = () => {
    const url = `http://localhost:3000/api/getreport/?username=${profile?.username}`;
    return axios.get(url).then((response) => {
      setReports(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchreports();
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
    const res = await fetch(`http://localhost:3000/api/updatedoctorprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        age,
        gender,
        experience,
        currentworkplace,
        speciality,
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
            Doctor Details
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
          <div className=" mt-2 font-semibold font-mono ml-2 text-lg">
            <span className="font-semibold font-mono"> Contact :</span>
            {profile?.phone}
          </div>
          <div className="  mt-2 font-semibold font-mono ml-2 text-lg ">
            <span className="font-semibold font-mono"> Role :</span>
            {profile?.role}
          </div>

          <div className=" grid-flow-col">
            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Age:
                </span>

                <input
                  placeholder="Enter Your Age"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="age"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Experience:
                </span>

                <input
                  placeholder="Experience"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="experience"
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Currentworkplace:
                </span>

                <input
                  placeholder="Please fill the entry"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="currentworkplace"
                  type="text"
                  value={currentworkplace}
                  onChange={(e) => setCurrentworkplace(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Speciality:
                </span>

                <input
                  placeholder="Enter Your Specialisation"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="speciality"
                  type="text"
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                />
              </div>
            </div>

            <div class="relative h-11 mt-1 w-full min-w-[200px]">
              <div class="flex items-center">
                <span className="font-semibold font-mono ml-2 text-lg  leading-tight text-blue-gray-500">
                  {" "}
                  Gender:
                </span>

                <input
                  placeholder="Enter Your Gender"
                  class="peer h-full flex-grow-0 flex-shrink-0 border-b border-blue-gray-200 bg-transparent pt-4 pl-4 ml-5 pb-1.5 font-sans text-md font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200  focus:border-pink-500 focus:outline-0 disabled:border-2 disabled:bg-blue-gray-50"
                  name="gender"
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-3  place-items-center mt-4 ">
          <div>
            <button
              className="h-10 w-20 border-2 font-bold hover:bg-green-900 hover:text-white bg-green-400 mr-40  border-gray-500 rounded-md"
              type="submit"
              onClick={(e) => updateProfile(e)}
            >
              Update
            </button>
          </div>
          <div className="h-10 w-20 border-2 font-bold bg-red-500  hover:bg-red-700 hover:text-white border-gray-500 rounded-md">
            <button>
              <a href="http://localhost:3000/prescription">
                Upload Prescription
              </a>
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
      <div></div>
    </div>
  );
}

export default Doctorprofile;
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
