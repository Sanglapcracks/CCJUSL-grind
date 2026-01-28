"use client";

import { matchVerificationCode, verifyEmail } from "@/services/UserService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { User } from "@/types";
import { updateVerification } from "@/services/AuthService";

function VerifyEmail({ user }: { user: User }) {
  const email = user.email;
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const router = useRouter();

  const handleSubmit = () => {
    matchVerificationCode(email, code)
    .then(res => {
      if(res){
        updateVerification()
        .then(() => router.refresh())
      }
    });
  };

  const handleSendCode = () => {
    setCodeSent(true);
    verifyEmail(email)
    .then(res => console.log(res));
  };
  return (
    <div className="font-jetbrains-mono flex flex-col items-center gap-8 p-12">
      <h1 className="text-5xl font-semibold">Verify your email</h1>
      <p>An email will be sent to your registered email address with a code.</p>
      <button
        className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        onClick={() => handleSendCode()}
        disabled={codeSent}
      >
        Send Email
      </button>
      <input
        type="text"
        name="code"
        placeholder="Enter Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="rounded-sm border px-2 py-1"
      />
      <button
        className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        onClick={() => handleSubmit()}
      >
        Verify Code
      </button>
    </div>
  );
}

export default VerifyEmail;
