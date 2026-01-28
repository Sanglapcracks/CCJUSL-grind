"use client";

import { handleForgotPassword } from "@/services/UserService";
import React, { useState } from "react";

function Page() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    handleForgotPassword(email).then((res) => console.log(res));
  };
  return (
    <div className="font-jetbrains-mono flex flex-col items-center gap-8 p-12">
      <h1 className="text-5xl font-semibold">Forgot Password</h1>
      <p>
        If the email is registered, you will receive an email containing a link
        to a password reset page.
      </p>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="rounded-sm border px-2 py-1"
        placeholder="Email Addresss"
      />
      <button
        className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        onClick={() => handleSubmit()}
      >
        Send Email
      </button>
    </div>
  );
}

export default Page;
