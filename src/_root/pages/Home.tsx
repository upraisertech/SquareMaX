import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, PostCard, UserCard, Skeleton } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { useState, useEffect } from "react";

const Home = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  const {
    data: postsData,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  const [sortedPosts, setSortedPosts] = useState<Models.Document[]>([]);

  useEffect(() => {
    if (postsData && postsData.documents) {
      const sorted = postsData.documents
        .slice()
        .sort((a: Models.Document, b: Models.Document) => {
          // Change '$createdAt' to your post creation date property
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA; // Sort in descending order, modify if needed
        });
      setSortedPosts(sorted);
    }
  }, [postsData]);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 w-full">
      <div className="home-container h-screen">
        <div className="home-posts w-full">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !sortedPosts ? (
            <Skeleton />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              {sortedPosts?.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
