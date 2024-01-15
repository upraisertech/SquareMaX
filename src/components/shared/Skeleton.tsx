// import React from "react";

import { useNavigate } from "react-router-dom";

export default function Skeleton() {
  const navigate = useNavigate();
  
  return (
    <div onClick={() => navigate(`/sign-in`)} className="gap-3 flex-center h-screen w-full">
      <div className="flex flex-col mb-3 gap-4 w-full">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>

      <hr />

      <div className="flex flex-col my-3 gap-4 w-full">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>

      <hr />

      <div className="flex flex-col my-3 gap-4 w-full">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>

      <hr />

      <div className="flex flex-col mb-3 gap-4 w-full">
        <div className="flex gap-4 items-center">
          <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-40"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
        <div className="skeleton h-10 w-full"></div>
      </div>
    </div>
  );
}
