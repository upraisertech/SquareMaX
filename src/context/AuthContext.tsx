// import { useNavigate } from "react-router-dom";
import {
  // SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";
// import { useParams } from "react-router-dom";

export const INITIAL_USER: IUser = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  followers: [], // Update to an empty array
  verified: false,
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  mode: "",
  show: true,
  forex: [],
  coins: [],
  toggleMode: () => {},
  loading: false,
  fetchData: () => {},
  fetchForexData: () => {},
};

interface IContextType {
  user: IUser;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  mode: string;
  forex: any[];
  show: boolean;
  coins: any[]; // Update type to boolean
  toggleMode: () => void;
  fetchData: () => void;
  fetchForexData: () => void;
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const navigate = useNavigate();
  // const { page } = useParams();
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("light");
  const [coins, setCoin] = useState([]);
  const [forex] = useState([]);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#3c3c3c";
    }
  };

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
          followers: currentAccount.followers,
          verified: currentAccount.verified,
        });
        setIsAuthenticated(true);

        return true;
      }

      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   const cookieFallback = localStorage.getItem("cookieFallback");
  //   if (
  //     cookieFallback === "[]" ||
  //     cookieFallback === null ||
  //     cookieFallback === undefined
  //   ) {
  //     navigate("/calculator");
  //   }

  //   checkAuthUser();
  // }, []);
  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      setShow(false);
    }

    checkAuthUser();
  }, []);

  const fetchData = async () => {
    const URL = "https://api.livecoinwatch.com/coins/list";
    const API_KEY = "b67d5e20-9a1e-43ce-9642-81a3260ea30d";
  
    try {
      const response = await axios.post(
        URL,
        {
          "currency": "USD",
          "sort": "rank",
          "order": "ascending",
          "offset": 0,
          "limit": 500,
          "meta": true
        },
        {
          headers: {
            "content-type": "application/json",
            "x-api-key": API_KEY,
          },
        }
      );
      setCoin(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data");
    }
  };

  // const fetchData = async () => {
  //   const url =`https://api.livecoinwatch.com/coins/list?x-api-key=b67d5e20-9a1e-43ce-9642-81a3260ea30d`;
  //     // `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${page}60&page=1&sparkline=false`;
  //     await fetch(new Request("https://api.livecoinwatch.com/coins/list"), {
  //       method: "POST",
  //       headers: new Headers({
  //         "content-type": "application/json",
  //         "x-api-key": "<YOUR_API_KEY>",
  //       }),
  //       body: JSON.stringify({
  //         currency: "USD",
  //         sort: "rank",
  //         order: "ascending",
  //         offset: 0,
  //         limit: 2,
  //         meta: false,
  //       }),
  //     });
  //   axios
  //     .get(url)
  //     .then((response: { data: SetStateAction<never[]> }) => {
  //       setCoin(response.data);
  //       // console.log(response.data)
  //     })
  //     .catch((error: any) => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  // setTimeout(() => {
  // }, 2000);
  // }, [])

  const fetchForexData = async () => {};

  useEffect(() => {
    fetchData();
    fetchForexData();
  }, []);

  // useEffect(() => {
  //   const storedUserDetails = localStorage.getItem("userInfo");

  //   if (storedUserDetails) {
  //     const userInfo = JSON.parse(storedUserDetails);
  //     setCurrentUser(userInfo);
  //   }
  // }, []);

  const value: IContextType = {
    user,
    setUser,
    toggleMode,
    show,
    mode,
    forex,
    coins,
    fetchData,
    fetchForexData,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = (): IContextType => useContext(AuthContext);
