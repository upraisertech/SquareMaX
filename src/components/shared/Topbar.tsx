import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queries";
import SideNavMobile from "./sidenavmobile";

const Topbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const [sideNav, setSideNav] = useState(false);

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-2 items-center">
          <img src="/assets/icons/logo.png" alt="logo" className="" />
          <h1>SquaremaX</h1>
        </Link>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <div className="flex-center gap-3">
            <img
              onClick={() => setSideNav(!sideNav)}
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </div>
          {sideNav && <SideNavMobile setSideNav={setSideNav} />}
        </div>
      </div>
    </section>
  );
};

export default Topbar;
