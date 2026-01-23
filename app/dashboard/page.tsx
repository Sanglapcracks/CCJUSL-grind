import CompleteRegistration from "@/components/Dashboard/CompleteRegistration";
import Dashboard from "@/components/Dashboard/Dashboard";
import { checkAuthentication } from "@/services/AuthService";
import React from "react";

async function Page() {
  const user = await checkAuthentication();

  if(user.registrationComplete) return <Dashboard />
  return <CompleteRegistration id={user.id} />
}

export default Page;