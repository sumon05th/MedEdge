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
      }),
    });
    Router.reload();
  };
  return (
    <div className="">
      <Image className=" mx-auto "
        src={profile?.profilephoto}
        alt="Picture of the author"
        width={200}
        height={200}
      />
      <div className=" mt-2 text-center  ">UserName : {profile?.username}</div>
      {/* <button
        onClick={() =>
          signOut({
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        Sign out
      </button> */}
      <div className=" ml-16 p-3">
        <div> Name :{profile?.firstname} {profile?.lastname}</div>
        {/* <div>{profile?.lastname}</div> */}

        <div> Contact :{profile?.phone}</div>
        <div>Email :{profile?.email}</div>
        {/* <div>{profile?.username}</div> */}
        <div>
          <p>
            <label>
              Age:
              <input className="mt-2 pl-3 font-sans text-md text-gray-700  bg-green-200 rounded-md"
                name="age"
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label className="font-semibold">
              Address :
              <input className="mt-2 pl-3 font-sans text-md text-gray-700  bg-green-200 rounded-md"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Pincode :
              <input className="mt-2 pl-3 font-sans text-md text-gray-700  bg-green-200 rounded-md"
                name="pincode"
                type="text"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Blood Group :
              <input className="mt-2 pl-3 font-sans text-md text-gray-700  bg-green-200 rounded-md"
                name="bloodgroup"
                type="text"
                value={bloodgroup}
                onChange={(e) => setBloodgroup(e.target.value)}
              />
            </label>
          </p>
          <p>
            <label>
              Gender :
              <input className="mt-2  pl-3 font-sans text-md text-gray-700  bg-green-200 rounded-md"
                name="gender"
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </label>
          </p>
        </div>
      </div>
      <div className=" grid grid-cols-2  place-items-center mt-4 ">
        <div>
          <button className="h-10 w-20 border-2 font-bold hover:bg-green-900 hover:text-white bg-green-400 mr-40  border-gray-500 rounded-md" type="submit" onClick={(e) => updateProfile(e)}>
            Update
          </button>
        </div>
        <div>
          <button className="h-10 w-20 border-2 font-bold bg-red-500  hover:bg-red-700 hover:text-white border-gray-500 rounded-md"
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
      <h2>Lab Reports</h2>
      {reports?.map((report) => (
        <>
          <Image
            src={report.imageUrl}
            alt="Picture of the author"
            width={200}
            height={200}
          />
          <p>{report.labName}</p>
          <p>{report.labAddress}</p>
        </>
      ))}
      <h2>Prescription</h2>
      {prescriptions?.map((prescription) => (
        <>
          <Image
            src={prescription.imageUrl}
            alt="Picture of the author"
            width={200}
            height={200}
          />
          <p>{prescription.doctorName}</p>

        </>
      ))}
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
