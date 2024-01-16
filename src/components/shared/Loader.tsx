// import { useNavigate } from "react-router-dom";

export default function Loader() {
  // const navigate = useNavigate();

  return (
    <div
      // onClick={() => navigate(`/sign-in`)}
      className={`flex-center w-full ${location.pathname === "/calculator" ? `mt-[-13em] md:mt-[-10em] h-screen`:""}`}>
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
