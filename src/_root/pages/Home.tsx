// import { Models } from "appwrite";
import { useState, useEffect } from "react";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard, NoAuth } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { useUserContext } from "@/context/AuthContext";

const Home = () => {
  const { checkAuthUser } = useUserContext();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      setShow(true);
    }

    checkAuthUser();
  }, []);

  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  // const { isError: isErrorPosts } = useGetRecentPosts();

  // const { data: postsData, isError: isErrorPosts } = useGetRecentPosts();
  // const [sortedPosts, setSortedPosts] = useState<Models.Document[]>([]);

  // useEffect(() => {
  //   if (postsData && postsData.documents) {
  //     const sorted = postsData.documents
  //       .slice()
  //       .sort((a: Models.Document, b: Models.Document) => {
  //         // Change '$createdAt' to your post creation date property
  //         const dateA = new Date(a.createdAt).getTime();
  //         const dateB = new Date(b.createdAt).getTime();
  //         return dateB - dateA; // Sort in descending order, modify if needed
  //       });
  //     setSortedPosts(sorted);
  //   }
  // }, [postsData]);

  if (isErrorCreators) {
    return (
      <div className="flex flex-1">
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
          <h2 className="h3-bold md:h2-bold text-left w-full">
            SquareMax Portfolio Battles
          </h2>
          {!show ? (
            <NoAuth />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full">
              <h2 className="h3-bold md:h2-bold text-left w-full">
                Portfilo Battle
              </h2>
            </ul>
          )}
        </div>
      </div>

      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="flex flex-col mx-auto gap-6 mt-12 pb-[10rem] w-[15em] h-screen fixed overflow-y-auto">
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
