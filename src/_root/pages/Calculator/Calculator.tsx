import { useEffect, useState } from "react";
import CalcTap from "./CalcTap";
import { Loader } from "@/components/shared";
// import { useToast } from "@/components/ui/use-toast";
// import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";

const Calculator = () => {
  // const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex flex-row overflow-hidden h-full mx-auto items-start justify-center w-full">

      <div className="w-full">
        {isLoading ? <Loader /> : <CalcTap />}
      </div>
    </div>
  );
};

export default Calculator;
