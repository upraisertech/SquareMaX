// import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link, NavLink, useLocation } from "react-router-dom";
// import diamond from "../../assets/Diamond.svg";
// import achievement from "../../assets/Achievement.svg";
// import badge from "../../assets/levelbadge.svg";
import { navdata } from "@/constants/index";
import { INITIAL_USER, useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
// import Loader from "./Loader";
import { IoMdClose } from "react-icons/io";
import { FC, ReactElement } from "react";
import { INavLink } from "@/types";
import { Button } from "../ui";

interface Props {
  setSideNav: any;
}
const SideNavMobile: FC<Props> = ({ setSideNav }): ReactElement => {
  let navigate = useNavigate();
  const { pathname } = useLocation();
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  const handleSignOut = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signOut();
    setIsAuthenticated(false);
    setUser(INITIAL_USER);
    navigate("/sign-in");
  };
  return (
    <>
      <div className="fixed w-[90%] flex flex-col gap-y-4 px-5 pt-8 left-0 bg-black overflow-y-scroll h-screen z-[9999] top-0">
        <div className="flex items-center justify-between">
          <button> </button>
          <button
            className="text-white text-[25px]"
            onClick={() => setSideNav(false)}>
            <IoMdClose />
          </button>
        </div>

        {isLoading || !user.email ? (
          <div className="h-14">
            {/* <Loader /> */}
            <button
              className="px-12 py-3 mb-[16em] text-white rounded-full bg-primary-A1 w-full"
              onClick={() => navigate(`/sign-in`)}>
              Sign in
            </button>
          </div>
        ) : (
          <Link
            to={`/profile/${user.id}`}
            onClick={() => setSideNav(false)}
            className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="flex items-center base-medium lg:body-bold text-white">
                {user.name}
                {user?.verified === true && (
                  <>
                    <img
                      title="verified user"
                      className="w-3 h-3 ml-1"
                      src="/assets/images/M/checklist.png"
                    />
                  </>
                )}
              </p>
              <p className="small-regular text-primary_A1">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul
          onClick={() => setSideNav(false)}
          className="flex flex-col mt-5 gap-2">
          {navdata.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <li
                key={link.label}
                className={`leftsidebar-link group ${
                  isActive && "bg-primary-500"
                }`}>
                <NavLink
                  to={link.route}
                  className="flex gap-4 items-center p-4">
                  <img
                    src={link.imgURL}
                    alt={link.label}
                    className={`group-hover:invert-white w-5 ${
                      isActive ? "invert-white" : ""
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <Button
          variant="ghost"
          className="shad-button_ghost"
          onClick={(e) => handleSignOut(e)}>
          <img src="/assets/icons/logout.svg" alt="logout" />
          <p className="small-medium lg:base-medium">Logout</p>
        </Button>
      </div>
    </>
  );
};

export default SideNavMobile;
