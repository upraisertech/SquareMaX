import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";
import { useState } from "react";
import Verified from "../ui/verified";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="user-card flex-center items-center justify-between py-8">
      <Link to={`/profile/${user.$id}`} className="user-card border-none">
        <img
          src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="creator"
          className="rounded-full w-14 h-14"
        />

        <div className="flex-center flex-col gap-1">
          <p className="base-medium text-light-1 text-center line-clamp-1 flex items-center w-full">
            {user.name}
            <Verified user={user}/>
          </p>
          <p className="small-regular text-primary_A1 text-center line-clamp-1">
            @{user.username}
          </p>
        </div>
      </Link>
      <Button
        type="button"
        className={`bg-primary_A1 px-5 ${isFollowing ? "followed" : ""}`}
        onClick={handleFollow}>
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default UserCard;
