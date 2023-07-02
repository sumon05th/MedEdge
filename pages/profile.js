import React, { useEffect, useState } from "react";
import { useSession, signOut, getSession } from "next-auth/react";
import PatientProfile from "@/components/PatientProfile";
import axios from "axios";
import DoctorProfile from "@/components/DoctorProfile";
import LabProfile from "@/components/LabProfile";
function profile() {
  const { data: session } = useSession();
  return (
    <div>
      {session.user.role === "patient" && <PatientProfile />}
      {session.user.role === "doctor" && <DoctorProfile />}
      {session.user.role === "lab" && <LabProfile />}
    </div>
  );
}

export default profile;
export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
