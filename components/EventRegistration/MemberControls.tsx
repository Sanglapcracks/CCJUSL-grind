'use client';

import { removeMember, transferTeamLead } from "@/services/EventsService";
import { Team } from "@/types";
import React from "react";

function MemberControls({newLeadId, team}: {newLeadId: string, team: Team}) {
    const handleTransferTeamLead = () => {
        transferTeamLead(team, newLeadId)
        .then(res => alert(res.message));
    }
    const handleRemoveMember = () => {
        removeMember(team, newLeadId)
        .then(res => alert(res.message));
    }
  return (
    <>
      <button className="w-fit rounded-xs bg-white px-2 py-1 text-sm text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
      onClick={()=>handleRemoveMember()}>
        Remove
      </button>
      <button className="w-fit justify-self-end rounded-xs bg-white px-2 py-1 text-sm text-black transition-colors duration-300 hover:bg-white/90 active:bg-white/60"
      onClick={()=>handleTransferTeamLead()}>
        Make Team Lead
      </button>
    </>
  );
}

export default MemberControls;
