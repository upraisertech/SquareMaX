import CalcTap from "./CalcTap";

// import { useToast } from "@/components/ui/use-toast";
import { Loader } from "@/components/shared";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Calculator = () => {
  // const { toast } = useToast();

  const {
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const { isError: isErrorCreators } = useGetUsers(10);

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
    <div className="flex flex-col overflow-hidden h-full mx-auto items-center justify-center w-full">
      {isPostLoading ? <Loader /> : <CalcTap />}
    </div>
  );
};

export default Calculator;
