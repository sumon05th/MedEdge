// import React, { useEffect, useState } from "react";
// import { useSession, signOut, getSession } from "next-auth/react";
// import axios from "axios";
// import Router, { useRouter } from "next/router";
// function LabProfile() {
//   const router = useRouter();
//   const query = router.query;
//   const [profile, setProfile] = useState();
//   const { data: session } = useSession();
//   const emailt = session.user.email;

//   // const [age, setAge] = useState();
//   const [address, setAddress] = useState();
//   // const [bloodgroup, setBloodgroup] = useState();
//   const [pincode, setPincode] = useState();
//   // const [gender, setGender] = useState();

//   const fetchData = () => {
//     const url = `http://localhost:3000/api/getlabprofile/?email=${emailt}`;
//     return axios.get(url).then((response) => {
//       setProfile(response.data);
//       // setAge(response.data.age)
//       setAddress(response.data.address);
//       // setBloodgroup(response.data.bloodgroup)
//       setPincode(response.data.pincode);
//       // setGender(response.data.gender)
//     });
//   };
//   useEffect(() => {
//     fetchData();
//   }, []);
//   const updateProfile = async (e) => {
//     e.preventDefault();
//     const email = session.user.email;
//     const res = await fetch(`http://localhost:3000/api/updatelabprofile/`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, address, pincode }),
//     });
//     Router.reload();
//   };

//   return (
//     <div>
//       <div>{profile?.name}</div>
//       {/* <div>{profile?.lastname}</div> */}
//       <div>{profile?.email}</div>
//       <div>{profile?.phone}</div>
//       <div>{profile?.username}</div>
//       {/* <label>
//       Age
//       <input
//         name="age"
//         type="text"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//       />
//     </label> */}
//       <label>
//         Pincode
//         <input
//           name="pincode"
//           type="text"
//           value={pincode}
//           onChange={(e) => setPincode(e.target.value)}
//         />
//       </label>
//       <label>
//         Address
//         <input
//           name="address"
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//       </label>
//       {/* <label>
//       Blood Group
//       <input
//         name="bloodgroup"
//         type="text"
//         value={bloodgroup}
//         onChange={(e) => setBloodgroup(e.target.value)}
//       />
//     </label> */}
//       {/* <label>
//       Gender
//       <input
//         name="gender"
//         type="text"
//         value={gender}
//         onChange={(e) => setGender(e.target.value)}
//       />
//     </label> */}
//       <div>
//         <button
//           className="h-10 w-20 border-2 font-bold bg-red-500  hover:bg-red-700 hover:text-white border-gray-500 rounded-md"
//           onClick={() =>
//             signOut({
//               callbackUrl: `${window.location.origin}`,
//             })
//           }
//         >
//           Sign out
//         </button>
//       </div>

//       <button type="submit" onClick={(e) => updateProfile(e)}>
//         Submit
//       </button>

//       <div>
//         <button className="h-10 w-20 border-2 font-bold hover:bg-green-900 hover:text-white bg-green-400 mr-40  border-gray-500 rounded-md">
//           <a href="http://localhost:3000/report">Upload Lab Report: </a>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LabProfile;
// // export async function getServerSideProps() {
// //   const session = await getSession(context);
// //   const email = session.user.email;
// //   const profile = await fetch(
// //     `http://localhost:3000/api/getlabprofile/?email=${email}`
// //   ).then((res) => res.json());
// //   return {
// //     props: {
// //       session,
// //       check,
// //       profile,
// //       email,
// //     },
// //   };
// // }

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
    return axios.get(url).then((response) => {
      setProfile(response.data);
      // setAge(response.data.age)
      setAddress(response.data.address);
      // setBloodgroup(response.data.bloodgroup)
      setPincode(response.data.pincode);
      // setGender(response.data.gender)
    });
  };
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

  return (
    <div className="bg-red-200 m-3 mb-4 pt-10 grid justify-center items-center">
      <div>
        <div className=" mt-2 font-semibold font-mono ml-2 text-lg ">
          <span className="font-semibold font-mono "> Name :</span>
          {profile?.name}
        </div>
        {/* <div>{profile?.lastname}</div> */}
        <div className="  mt-2 font-semibold font-mono ml-2 text-lg ">
          <span className="font-semibold font-mono"> Email :</span>
          {profile?.email}
        </div>
        <div className=" mt-2 font-semibold font-mono ml-2 text-lg">
          <span className="font-semibold font-mono"> Contact :</span>
          {profile?.phone}
        </div>
        <div className=" mb-4 mt-2 font-semibold font-mono ml-2 text-lg">
          <span className="font-semibold font-mono"> Username :</span>
          {profile?.username}
        </div>
        {/* <label>
      Age
      <input
        name="age"
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </label> */}
        <label className="mt-10 font-semibold font-mono ml-2 pt-3 text-lg">
          Pincode
          <input
            name="pincode"
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </label>
        <label className="mt-2 pb-10 pt-3 font-semibold flex font-mono ml-2 text-lg">
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
      </div>

      <div>
        <button className="space-y-4 pb-3 h-10 w-40 border-1 font-bold hover:bg-green-900 hover:text-white bg-green-400 mr-40  border-gray-500 rounded-md">
          <a href="http://localhost:3000/report">Upload Lab Report: </a>
        </button>
      </div>

      <div className="space-y-4 pt-3 pb-3 h-10 w-20 border-2 font-bold  hover:bg-blue-900 hover:text-white bg-blue-300 mr-40  border-gray-500 rounded-md">
        <button type="submit" onClick={(e) => updateProfile(e)}>
          Submit
        </button>
      </div>

      <div className="bg-red-200 mt-6">
        <button
          className="space-y-4 h-10 w-20 border-2 font-bold bg-red-500  hover:bg-red-700 hover:text-white border-gray-500 rounded-md"
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
  );
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
