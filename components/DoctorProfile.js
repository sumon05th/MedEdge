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
  


  const fetchData = () => {
    const url = `http://localhost:3000/api/getdoctorprofile/?email=${emailt}`;
    return axios.get(url)
      .then((response) => {
        setProfile(response.data)
        setAge(response.data.age)
       setCurrentworkplace(response.data.currentworkplace)
        setExperience(response.data.experience)
        setGender(response.data.gender)
        setrole(response.data.role)
        setSpeciality(response.data.speciality)
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const updateProfile = async (e) => {
    e.preventDefault();
    const email = session.user.email;
    const res = await fetch(`http://localhost:3000/api/updatedoctorprofile/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, age, gender ,experience,currentworkplace,speciality}),
    });
    Router.reload();
  };


  return (<div>
    <Image src={profile?.profilephoto} alt="Picture of the author" width={200} height={200} />
    <div>{profile?.firstname}</div>
    <div>{profile?.lastname}</div>
    <div>{profile?.email}</div>
    <div>{profile?.phone}</div>
    <div>{profile?.role}</div>
    <div>{profile?.username}</div>

    
    

    <label>
      Age
      <input
        name="age"
        type="text"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
    </label>
    <label>
     Experience
      <input
        name="experience"     
        type="text"
        value={experience}
        onChange={(e) =>setExperience(e.target.value)}
      />
    </label>
    <label>
      Currentworkplace
      <input
        name="currentworkplace"
        type="text"
        value={currentworkplace}
        onChange={(e) => currentworkplace(e.target.value)}
      />
    </label>
    <label>
      Speciality
      <input
        name="speciality"
        type="text"
        value={speciality}
        onChange={(e) => setSpeciality(e.target.value)}
      />
    </label>
    <label>
      Gender
      <input
        name="gender"
        type="text"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      />
    </label>
    <button type="submit" onClick={(e) => updateProfile(e)}>Submit</button>
  </div>);
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
