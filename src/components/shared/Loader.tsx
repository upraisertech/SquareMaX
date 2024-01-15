// import { useNavigate } from "react-router-dom";

export default function Loader() {
  // const navigate = useNavigate();

  return (
    <div
      // onClick={() => navigate(`/sign-in`)}
      className="flex-center mt-[-13em] md:mt-[-10em] h-screen w-full">
      <img
        src="/assets/icons/loader.svg"
        alt="loader"
        width={24}
        height={24}
        className="animate-spin"
      />
    </div>
  );
}
