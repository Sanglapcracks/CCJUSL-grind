import React from "react";

function Events() {
  return (
    <div id="events" className="flex w-full flex-col items-center gap-y-20 bg-black py-8">
      <h1 className="text-6xl sm:text-8xl font-semibold">EVENTS</h1>
      <ul className="flex w-5/6 flex-col gap-y-6 lg:w-4/5 2xl:w-3/5 2xl:gap-y-12">
        <li className="flex flex-col gap-2">
          <span className="text-xl font-semibold">H42</span>
          <p>
            A thrilling three-member team contest where you have the opportunity
            to unleash your coding prowess in a battleground of algorithms.
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <span className="text-xl font-semibold">Pass The Baton</span>
          <p>
            A relay problem-solving contest where collaboration is the key.
            Think of it as the relay race of the coding world, where
            participants taken turns solving the same problems.
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <span className="text-xl font-semibold">Sherlocked</span>
          <p>
            Unlock the power of your creativity! This challenge demands your sharp observation, imaginative flair, and lightning-fast reasoning skills. It&apos;s a mix of coding challenges, brain teasers, and the excitement of a capture-the-flag competition.
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <span className="text-xl font-semibold">
            Hackforge - Forging the Future
          </span>
          <p>
            Embark on a high-energy 12 hour team hackathon that holds the power to make a real impact on society. Experience the excitement of brainstorming, prototyping and pitching your projects to a panel of esteemed judges.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Events;
