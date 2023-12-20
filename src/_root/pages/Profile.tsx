import {
  Route,
  Routes,
  Link,
  Outlet,
  useParams,
  useLocation,
} from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui";
import { LikedPosts } from "@/_root/pages";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queries";
import { GridPostList, Loader } from "@/components/shared";
import Verified from "@/components/ui/verified";

interface StabBlockProps {
  value: string | number;
  label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
  <div className="flex flex-col gap-2 items-center justify-start">
    <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
    <p className="small-medium lg:base-medium text-light-2">{label}</p>
  </div>
);

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const { data: currentUser } = useGetUserById(id || "");

  if (!currentUser)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-col flex-1 gap-7 w-full">
          <div className="flex items-center justify-between w-full">
            <img
              src={
                currentUser.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="profile"
              className="w-[4em] h-[4em] lg:h-36 lg:w-36 rounded-full"
            />
            <div className="flex gap-8 items-center justify-start flex-wrap z-20">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={currentUser.posts.length} label="Followers" />
              <StatBlock value={currentUser.posts.length} label="Following" />
            </div>
          </div>

          <div className="flex flex-col flex-1 justify-between w-full">
            <div className="flex flex-col w-full">
              <h1 className="flex text-left h3-bold md:h2-semibold items-center justify-start  w-full">
                {currentUser.name}
                <Verified user={currentUser}/>
              </h1>
              <p className="small-regular md:body-medium text-primary_A1 text-left">
                @{currentUser.username}
              </p>
            </div>

            <p className="small-medium md:base-medium text-left mt-3 max-w-screen-sm">
              {currentUser.bio}
            </p>
          </div>

          <div className="flex justify-start gap-4">
            <div className={`${user.id !== currentUser.$id && "hidden"}`}>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg ${
                  user.id !== currentUser.$id && "hidden"
                }`}>
                <img
                  src={"/assets/icons/edit.svg"}
                  alt="edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>
            <div className={`${user.id === id && "hidden"}`}>
              <Button
                type="button"
                className={`bg-primary_A1 px-5 ${
                  isFollowing ? "followed" : ""
                }`}
                onClick={handleFollow}>
                {isFollowing ? "Following" : "Follow"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/posts.svg"}
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>
          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `/profile/${id}/liked-posts` && "!bg-dark-3"
            }`}>
            <img
              src={"/assets/icons/like.svg"}
              alt="like"
              width={20}
              height={20}
            />
            Liked Posts
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={currentUser.posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPosts />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
