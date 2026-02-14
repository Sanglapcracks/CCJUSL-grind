"use client";

import {
  checkRegistrationStatus,
  updateRegistrationStatus,
} from "@/services/AuthService";
import { completeUserRegistration } from "@/services/UserService";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import Tooltip from "../Tooltip";
import { Info } from "lucide-react";

const RegistrationSchema = z.object({
  phone: z
    .string()
    .min(8, "Invalid phone number")
    .regex(
      /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
      "Invalid phone number",
    ),
  college: z.string().min(1, "College is required"),
  year: z.string().min(1, "Year of Study is required"),
  department: z.string().min(1, "Department is required"),
  referralCode: z.string(),
});

function CompleteRegistration({ id }: { id: string }) {
  return (
    <Suspense>
      <RegistrationForm id={id} />
    </Suspense>
  );
}

function RegistrationForm({ id }: { id: string }) {
  const [data, setData] = useState({
    phone: "",
    college: "",
    year: "",
    department: "",
    referralCode: "",
  });
  const [errors, setErrors] = useState({
    phone: "",
    college: "",
    year: "",
    department: "",
    referralCode: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  useEffect(() => {
    checkRegistrationStatus(id).then((res) => {
      if (res.registrationComplete) {
        updateRegistrationStatus().then(() => {
          if (redirectUrl) router.push(redirectUrl);
          else router.refresh();
        });
      }
    });
  }, [id, redirectUrl, router]);

  const handleChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setErrors({
      phone: "",
      college: "",
      department: "",
      year: "",
      referralCode: "",
    });
    const isValid = RegistrationSchema.safeParse(data);
    if (!isValid.success) {
      isValid.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          setErrors((oldErrors) => ({
            ...oldErrors,
            [issue.path[0]]: issue.message,
          }));
        }
      });
      setLoading(false);
      return;
    }

    toast.loading("Submitting...");
    completeUserRegistration(data, id)
      .then((res) => {
        toast.dismiss();
        if (res.ok) {
          updateRegistrationStatus().then(() => {
            if (redirectUrl) router.push(redirectUrl);
            else router.refresh();
          });
        } else {
          toast.error(res.message);
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Error occurred");
      });

    setLoading(false);
  };

  return (
    <form
      className="flex h-full min-h-[80vh] flex-col items-center justify-center gap-6 py-8"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="mb-8 text-center text-4xl font-semibold sm:text-5xl">
        Complete Registration
      </h1>
      <div className="flex w-full flex-col items-center gap-2 sm:w-1/3 2xl:w-1/4">
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={data.phone}
          onChange={(e) => {
            handleChange("phone", e.target.value);
          }}
          className="w-full border border-white/20 bg-transparent px-6 py-4 font-light text-white transition-colors outline-none placeholder:text-white/40 focus:border-red-400"
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>
      <div className="flex w-full flex-col items-center gap-2 sm:w-1/3 2xl:w-1/4">
        <input
          type="text"
          name="college"
          placeholder="College"
          value={data.college}
          onChange={(e) => {
            handleChange("college", e.target.value);
          }}
          className="w-full border border-white/20 bg-transparent px-6 py-4 font-light text-white transition-colors outline-none placeholder:text-white/40 focus:border-red-400"
        />
        {errors.college && (
          <p className="text-sm text-red-500">{errors.college}</p>
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-2 sm:w-1/3 2xl:w-1/4">
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={data.department}
          onChange={(e) => {
            handleChange("department", e.target.value);
          }}
          className="w-full border border-white/20 bg-transparent px-6 py-4 font-light text-white transition-colors outline-none placeholder:text-white/40 focus:border-red-400"
        />
        {errors.department && (
          <p className="text-sm text-red-500">{errors.department}</p>
        )}
      </div>
      <div className="flex w-full flex-col items-center gap-2 sm:w-1/3 2xl:w-1/4">
        <input
          type="text"
          name="year"
          placeholder="Year of Graduation"
          value={data.year}
          onChange={(e) => {
            handleChange("year", e.target.value);
          }}
          className="w-full border border-white/20 bg-transparent px-6 py-4 font-light text-white transition-colors outline-none placeholder:text-white/40 focus:border-red-400"
        />
        {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
      </div>
      <div className="relative flex w-full flex-col items-center gap-2 sm:w-1/3 2xl:w-1/4">
        <div className="absolute top-1/2 -right-8 -translate-y-1/2">
          <Tooltip message="This is an optional field, in case you have a code given by a Campus Ambassador.">
            <Info className="flex h-6 w-6 cursor-help items-center justify-center rounded-full text-xs text-white/60 transition-colors hover:text-red-400" />
          </Tooltip>
        </div>
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code"
          value={data.referralCode}
          onChange={(e) => handleChange("referralCode", e.target.value)}
          className="w-full border border-white/20 bg-transparent px-6 py-4 font-light text-white transition-colors outline-none placeholder:text-white/40 focus:border-red-400"
        />

        {errors.referralCode && (
          <p className="text-sm text-red-500">{errors.referralCode}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="border border-red-400 px-8 py-3 tracking-wide text-white transition-colors hover:bg-red-400/30 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Submit
      </button>
    </form>
  );
}

export default CompleteRegistration;
