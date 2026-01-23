"use client";

import { SessionUser, Event } from "@/types";
import React, { useState } from "react";
import { createTeam, joinTeam } from "@/services/EventsService";
import { useRouter } from "next/navigation";

function NotRegistered({ user, event }: { user: SessionUser; event: Event }) {
  const router = useRouter();
  const [teamName, setTeamName] = useState("");
  const [teamCode, setTeamCode] = useState("");

  const handleCreateTeam = (e: React.FormEvent) => {
    e.preventDefault();
    createTeam(event, user, teamName).then(() => router.refresh());
  };
  
  const handleJoinTeam = (e: React.FormEvent) => {
    e.preventDefault();
    joinTeam(event, user, teamCode).then(() => router.refresh());
  };

  return (
    <div className="font-jetbrains-mono flex flex-col items-center gap-8 p-12">
      <h1 className="text-5xl font-semibold">{event.name} Registration</h1>
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-xl">Create a new team</h4>
        <input
          type="text"
          placeholder="Team Name"
          value={teamName}
          onChange={(e) => {
            setTeamName(e.target.value);
          }}
          className="rounded-sm border px-2 py-1"
        />
        <button
          onClick={e => {handleCreateTeam(e)}}
          className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        >
          Create Team
        </button>
      </div>
      <div className="flex w-3/5 items-center justify-between gap-6">
        <div className="h-px w-full bg-white"></div>
        <p>OR</p>
        <div className="h-px w-full bg-white"></div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <h4 className="text-xl">Join an existing team</h4>
        <input
          type="text"
          placeholder="Joining Code"
          value={teamCode}
          onChange={(e) => {
            setTeamCode(e.target.value);
          }}
          className="rounded-sm border px-2 py-1"
        />
        <button
          onClick={e => {handleJoinTeam(e)}}
          className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        >
          Join Team
        </button>
      </div>
    </div>
  );
}

export default NotRegistered;
