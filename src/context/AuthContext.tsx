import { useNavigate } from "react-router-dom";
import { SetStateAction, createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER: IUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  imageUrl: '',
  bio: '',
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
  forex: [],
  coins: false,
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
  coins: any; // Update type to boolean
  toggleMode: () => void;
  // fetchData: () => void;
  fetchForexData: () => void;
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("light");
  const [coins, setCoin] = useState([]);
  const [forex, setForex] = useState([]);

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

  useEffect(() => {
    const cookieFallback = localStorage.getItem("cookieFallback");
    if (
      cookieFallback === "[]" ||
      cookieFallback === null ||
      cookieFallback === undefined
    ) {
      navigate("/calculator");
    }

    checkAuthUser();
  }, []);



  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false`);
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const data = await response.json();
  //     setCoin(data.data);
  //     console.log(data.data);
  //   } catch (error) {
  //     console.error("Error fetching coin data:", error);
  //   } finally {
  //     // setIsLoading(false);
  //   }
  // };
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=500&page=1&sparkline=false'

  useEffect(() => {
  setTimeout(() => {
    axios.get(url).then((response: { data: SetStateAction<never[]>; }) => {
      setCoin(response.data)
      // console.log(response.data)
    }).catch((error: any) => {
      console.log(error)
    })
  }, 2000);
  }, [])

  const fetchForexData = async () => {
    try {
      const response = await fetch(`https://www.rebatekingfx.com/api/live-chart/datafeed/search?lang=en`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setForex(data);
    } catch (error) {
      console.error("Error fetching forex data:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
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
    mode,
    forex,
    coins,
    fetchForexData,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = (): IContextType => useContext(AuthContext);
