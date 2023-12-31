import { Models } from "appwrite";
import { Link, useNavigate } from "react-router-dom";
// import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { PostStats } from "@/components/shared";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import Verified from "../ui/verified";

type PostCardProps = {
  post: Models.Document;
};

const PostCard = ({ post }: PostCardProps) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  if (!post.creator) return null;

  const renderTags = () => {
    if (!post.tags || post.tags.length === 0) return null;
    return (
      <ul className="flex gap-1 mt-2">
        {post.tags.map((tag: string, index: number) => (
          <li key={`${tag}${index}`} className="text-light-3 small-regular">
            #{tag}
          </li>
        ))}
      </ul>
    );
  };

  const renderCaption = () => {
    if (!post.caption) return null;
    const links = createLinks(post.caption, 16);
    return <p>{links}</p>;
  };

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator.imageUrl || "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col text-left justify-start">
            <p className="flex items-center base-medium lg:body-bold text-light-1">
              {post.creator.name}
              <Verified user={post.creator} />
            </p>
            <div className="flex gap-2 text-light-3 items-center">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              {post.location && <p className="subtle-semibold lg:small-regular">
                {` • ${post.location}`}
              </p>}
            </div>
          </div>
        </div>

        {user.id === post.creator.$id && (
          <Link to={`/update-post/${post.$id}`}>
            <img
              src={"/assets/icons/edit.svg"}
              alt="edit"
              width={20}
              height={20}
            />
          </Link>
        )}
      </div>

      <div className="small-medium lg:base-medium py-5">
        {renderCaption()}
        {renderTags()}
      </div>

      {post.imageUrl && (
        <img
          onClick={() => navigate(`/posts/${post.$id}`)}
          src={post.imageUrl}
          alt="post image"
          className="cursor-pointer post-card_img"
        />
      )}

      <PostStats post={post} userId={user.id} id={post.$id} />
    </div>
  );
};

export default PostCard;

const createLinks = (text: string, textSize: number): JSX.Element[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const url = part.match(urlRegex)![0]; // Extracting URL
      return (
        <span key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", fontSize: `${textSize}px` }}
            title={`Preview: ${url}`}
          >
            {part}
          </a>
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
};
