"use client";

import { sendVerificationEmail } from "@/services/EmailService";
import { matchVerificationCode } from "@/services/UserService";
import React, { useState } from "react";

function VerifyEmail({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);

  const handleSubmit = () => {
    matchVerificationCode(email, code)
    .then(res => alert(res));
  };

  const handleSendCode = () => {
    setCodeSent(true);
    sendVerificationEmail(email);
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
        disabled={codeSent}
      >
        Verify Code
      </button>
    </div>
  );
}

export default VerifyEmail;
