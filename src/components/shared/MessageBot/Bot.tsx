import React from "react";
import { useNavigate } from "react-router-dom";

const Bot: React.FC = () => {
  const navigate = useNavigate();

  return (
    <a onClick={() => navigate(`/create-post`)}>
      <div className="fixed bg-black bottom-[1.7em] sm:right-8 right-4 z-[999] md:hidden cursor-pointer text-white text-4xl w-[50px] h-[50px] flex font-bold items-center justify-center rounded-full animate-bounce">
        <div className="flex">
          <img src="/assets/icons/gallery-add.svg" alt="" />
        </div>
      </div>
    </a>
  );
};

export default Bot;
