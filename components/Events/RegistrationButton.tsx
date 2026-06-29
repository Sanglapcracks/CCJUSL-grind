import { getAuthStatus } from "@/services/AuthService";
import { getRegistrationStatus } from "@/services/EventsService";
import { RegistrationStatus } from "@/types/events";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

async function RegistrationButton({
  registrationOpen,
  slug,
}: {
  registrationOpen: boolean;
  slug: string;
}) {
  const user = await getAuthStatus();
  const registrationStatus = user
    ? (await getRegistrationStatus(user.id, slug)).status
    : RegistrationStatus.NOT_REGISTERED;

  if (registrationStatus !== RegistrationStatus.NOT_REGISTERED)
    return (
      <Link href={`/eventRegistration/${slug}`} className="border border-red-400 px-6 py-3 text-xl text-red-400">Registration Details</Link>
    );

  // Only render the Register button if registrations are explicitly open
  if (!registrationOpen) return null;

  return (
    <Link
      href={`/eventRegistration/${slug}`}
      className="border border-red-400 px-6 py-3 text-xl text-red-400 lg:text-2xl 2xl:text-3xl"
    >
      Register
    </Link>
  );
}

export default RegistrationButton;
