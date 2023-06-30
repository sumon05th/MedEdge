import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import axios from "axios";
import Router, { useRouter } from "next/router";
function LabProfile() {
  const router = useRouter();
  const query = router.query;
  const [profile, setProfile] = useState();
  const { data: session } = useSession();
  const emailt = session.user.email;

  // const [age, setAge] = useState();
  const [address, setAddress] = useState();
  // const [bloodgroup, setBloodgroup] = useState();
  const [pincode, setPincode] = useState();
  // const [gender, setGender] = useState();

  const fetchData = () => {
    const url = `http://localhost:3000/api/getlabprofile/?email=${emailt}`;
    return axios.get(url)
      .then((response) => {
        setProfile(response.data)
        // setAge(response.data.age)
        setAddress(response.data.address)
        // setBloodgroup(response.data.bloodgroup)
        setPincode(response.data.pincode)
        // setGender(response.data.gender)
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const updateProfile = async (e) => {
    e.preventDefault();
    const email = session.user.email;
    const res = await fetch(`http://localhost:3000/api/updatelabprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, address, pincode }),
    });
    Router.reload();
  };


  return (<div>
    <div>{profile?.name}</div>
    {/* <div>{profile?.lastname}</div> */}
    <div>{profile?.email}</div>
    <div>{profile?.phone}</div>
    <div>{profile?.username}</div>
    {/* <label>
      Age
      <input
        name="age"
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </label> */}
    <label>
      Pincode
      <input
        name="pincode"
        type="text"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
    </label>
    <label>
      Address
      <input
        name="address"
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </label>
    {/* <label>
      Blood Group
      <input
        name="bloodgroup"
        type="text"
        value={bloodgroup}
        onChange={(e) => setBloodgroup(e.target.value)}
      />
    </label> */}
    {/* <label>
      Gender
      <input
        name="gender"
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
    </label> */}
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

    <button type="submit" onClick={(e) => updateProfile(e)}>Submit</button>
  </div>);
}

export default LabProfile;
// export async function getServerSideProps() {
//   const session = await getSession(context);
//   const email = session.user.email;
//   const profile = await fetch(
//     `http://localhost:3000/api/getlabprofile/?email=${email}`
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
