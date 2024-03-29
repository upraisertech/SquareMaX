import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { Loader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { useSignOutAccount } from "@/lib/react-query/queries";
import { useUserContext, INITIAL_USER } from "@/context/AuthContext";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [hide, setHide] = useState(true);
  const { user, setUser, setIsAuthenticated, isLoading } = useUserContext();

  const { mutate: signOut } = useSignOutAccount();

  setTimeout(() => {
    setHide(false);
  }, 3000);

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
    <nav className="leftsidebar h-screen fixed overflow-y-auto">
      <div className="flex flex-col gap-6">
        <Link to="/" className="flex gap-3 mb-3 items-center">
          <img src="/assets/icons/logo.png" alt="logo" className="" />
          <h1 className="text-[20px] font-bold">SquaremaX</h1>
        </Link>

        {isLoading || !user.email ? (
          <>
            {hide ? (
              <Loader />
            ) : (
              <div className="h-14">
                <button
                  className="px-12 py-3 mb-[16em] text-white rounded-full bg-primary-A1 w-full"
                  onClick={() => navigate(`/sign-in`)}>
                  Sign in
                </button>
              </div>
            )}
          </>
        ) : (
          <Link to={`/profile/${user.id}`} className="flex gap-3 items-center">
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-14 w-14 rounded-full"
            />
            <div className="flex flex-col">
              <p className="flex items-center base-medium lg:body-bold text-light-1">
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
              <p className="small-regular text-light-3">@{user.username}</p>
            </div>
          </Link>
        )}

        <ul className="flex flex-col gap-4">
          {sidebarLinks.map((link: INavLink) => {
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
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                  />
                  {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Button
        variant="ghost"
        className="shad-button_ghost mt-12"
        onClick={(e) => handleSignOut(e)}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
