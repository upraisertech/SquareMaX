// import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Models } from "appwrite";

type UserCardProps = {
  user: Models.Document;
};

  const Verified = ({ user }: UserCardProps) => {

  return (
    <>
      {user?.verified === true && (
        <>
          <img title="verified user" className="w-3 h-3 ml-1" src="/assets/images/M/checklist.png" />
        </>
      )}
    </>
  );
};

export default Verified;
