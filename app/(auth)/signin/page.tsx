"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

function Page() {
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleUpdate = (value: string, field: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: "/dashboard",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  const handleSignInWithGoogle = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    signIn("google")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="font-jetbrains-mono flex flex-col items-center gap-8 p-12">
      <h1 className="my-12 text-4xl font-semibold">Sign In</h1>
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={data.email}
        onChange={(e) => handleUpdate(e.target.value, "email")}
        className="rounded-sm border px-2 py-1"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) => handleUpdate(e.target.value, "password")}
        className="rounded-sm border px-2 py-1"
      />
      <button
        onClick={(e) => handleSubmit(e)}
        disabled={loading}
        className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
      >
        Submit
      </button>
      <div className="flex w-2/5 items-center justify-between gap-6">
        <div className="h-px w-full bg-white"></div>
        <p>OR</p>
        <div className="h-px w-full bg-white"></div>
      </div>
      <button
        onClick={(e) => handleSignInWithGoogle(e)}
        className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        disabled={loading}
      >
        Sign in with Google
      </button>
      <div className="flex gap-x-8 text-sm justify-between">
        <p>Don&apos;t have an account?</p>
        <Link href={"/signup"} className="underline underline-offset-4">Sign Up</Link>
      </div>
      <Link href={"/forgot-password"} className="underline underline-offset-4 text-sm">Forgot Password</Link>
    </div>
  );
}

export default Page;
