// import React from "react";

import { useNavigate } from "react-router-dom";

export default function NoAuth() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full mr-auto items-start justify-start">
      <div className="flex flex-col gap-4">
        <div className="text-[20px] font-bold">Make a Prediction and Grab the Prizes!</div>
        <div className="text-[15px]">Free and easy way to win real money prizes with your virtual portfolio. Build an unbeatable investment strategy and get a share of a reward pool.</div>
      </div>
      <button
        className="px-12 py-3 mt-[4em] text-white rounded-full bg-primary-A1 w-full"
        onClick={() => navigate(`/sign-in`)}>
        Sign up to participate
      </button>
      <div className="skeleton h-10 w-full"></div>
    </div>
  );
}
