import React from "react";

export default function ZigZagDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden leading-none ${className}`}>
      <svg
        className="relative block h-12 w-full sm:h-16"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 100 10"
      >
        <polygon
          points="0,10 5,0 10,10 15,0 20,10 25,0 30,10 35,0 40,10 45,0 50,10 55,0 60,10 65,0 70,10 75,0 80,10 85,0 90,10 95,0 100,10"
          className="fill-black"
        />
      </svg>
    </div>
  );
}
