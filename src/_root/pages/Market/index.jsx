import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, storage, auth } from "../../firebase-config";
import myContext from "../../context/data/myContext";
import Market from "./text";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const context = useContext(myContext);
  const { currentUser } = context;

  return (
    <>
      <div className="pt-[2em] h-screen justify-start items-start w-full">
        <Market />
      </div>
    </>
  );
};

export default ProfilePage;
