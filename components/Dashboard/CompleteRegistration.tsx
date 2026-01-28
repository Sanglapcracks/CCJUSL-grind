"use client";

import { updateRegistrationStatus } from "@/services/AuthService";
import { completeUserRegistration } from "@/services/UserService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function CompleteRegistration({id}: {id: string}) {
  const [data, setData] = useState({
    phone: "",
    college: "",
    year: "",
    department: "",
  });
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeUserRegistration(data, id).
    then(res => {
      console.log(res);
      if(res.ok){
        updateRegistrationStatus()
        .then(() => router.refresh())
      }
    });
  };

  return (
    <form
      className="font-jetbrains-mono flex flex-col items-center gap-8 p-12"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="text-4xl font-bold">Complete your Registration</h1>
      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={data.phone}
        onChange={(e) => {
          handleChange("phone", e.target.value);
        }}
        className="rounded-sm border px-2 py-1"
      />
      <input
        type="text"
        name="college"
        placeholder="College"
        value={data.college}
        onChange={(e) => {
          handleChange("college", e.target.value);
        }}
        className="rounded-sm border px-2 py-1"
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={data.department}
        onChange={(e) => {
          handleChange("department", e.target.value);
        }}
        className="rounded-sm border px-2 py-1"
      />
      <input
        type="text"
        name="year"
        placeholder="Year"
        value={data.year}
        onChange={(e) => {
          handleChange("year", e.target.value);
        }}
        className="rounded-sm border px-2 py-1"
      />
      <button type="submit" className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60">Submit</button>
    </form>
  );
}

export default CompleteRegistration;
