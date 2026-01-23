"use client";

import {
  completeRegistration,
  resetJoiningCode,
} from "@/services/EventsService";
import { Event, Team } from "@/types";
import React, { useState } from "react";

function TeamControls({ team, event }: { team: Team, event: Event }) {
  const [joiningCode, setJoiningCode] = useState(team.joiningCode);
  const [resettingCode, setResettingCode] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard
      .writeText(team.joiningCode)
      .then(() => alert("Copied Joining Code")); // TODO: replace with react hot toast
  };

  const handleCompleteRegistration = () => { // TODO: add confirmation dialogue before calling the completeRegistration function
    completeRegistration(team, event)
      .then(() => alert("Registration complete!")) // TODO: replace with react hot toast, also change status
      .catch((err: Error) => console.error(err));
  };

  const handleResetCode = () => {
    setResettingCode(true);
    resetJoiningCode(team)
      .then((res) => {
        if (res.ok && res.code) setJoiningCode(res.code);
        else alert("Error occurred while resetting code");
      })
      .catch((err) => {
        console.error(err);
        alert("Error occurred while resetting code");
      })
      .finally(() => setResettingCode(false));
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <button
        className="rounded-xs bg-white px-2 py-1 text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
        onClick={() => handleCompleteRegistration()}
      >
        Confirm Registration
      </button>
      <div className="flex flex-col items-center gap-2  border-t border-gray-200/30 p-4">
        <p>Team Joining Code</p>
        <div className="flex w-full items-center justify-between gap-12 rounded-sm bg-gray-200/10 py-1.5 pr-2 pl-4 text-center">
          <span>{joiningCode}</span>
          <button
            className="cursor-pointer rounded-sm border border-white/20 bg-black/80 px-2 py-1 text-sm transition-colors duration-200 hover:border-white/40 active:border-white/60"
            onClick={() => handleCopyCode()}
          >
            Copy
          </button>
        </div>
        <button
          className="rounded-xs bg-white px-2 py-1 text-sm text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
          onClick={() => handleResetCode()}
          disabled={resettingCode}
        >
          Reset Joining Code
        </button>
      </div>
    </div>
  );
}

export default TeamControls;
