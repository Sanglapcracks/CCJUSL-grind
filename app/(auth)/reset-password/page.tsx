"use client";
import NotFound from "@/components/NotFound";
import {
  resetPassword,
  verifyPasswordResetToken,
} from "@/services/UserService";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

function Page() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    verifyPasswordResetToken(token)
      .then((res) => {
        if (res.ok && res.id) setUserId(res.id);
        else router.push("/404");
      })
      .catch((err) => {
        console.error(err);
        router.push("/404");
      });
  }, [token, router]);

  const handleSubmit = () => {
    if (password !== confirmPassword) {
      alert("Passwords dont match");
      return;
    }
    resetPassword(userId, password).then((res) => console.log(res));
  };

  return (
    <div className="font-jetbrains-mono flex flex-col items-center gap-8 p-12">
      <h1 className="text-4xl font-semibold">Reset your Password</h1>
      <input
        type="text"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="rounded-sm border px-2 py-1"
      />
      <input
        type="text"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
        className="rounded-sm border px-2 py-1"
      />
      <button
        className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        onClick={() => handleSubmit()}
      >
        Update Password
      </button>
    </div>
  );
}

export default Page;
