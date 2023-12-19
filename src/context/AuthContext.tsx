import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";

import { IUser } from "@/types";
import { getCurrentUser } from "@/lib/appwrite/api";

export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
  followers: "",
  verified: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  mode: false,
  forex: false,
  coin: false,
  toggleMode: false,
  loading: false,
  fetchData: () => {},
  fetchForexData: () => {},
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [coin, setCoin] = useState([]);
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
          // followers: currentAccount.followers,
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
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);



  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.coinranking.com/v2/coins?token=coinranking9bbba664219afc1683d728ce38d82a8cc832637a8c765ad9`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCoin(data.data.coins);
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      // setIsLoading(false);
    }
  };

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
    fetchData();
    fetchForexData();
  }, []);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userInfo");

    if (storedUserDetails) {
      const userInfo = JSON.parse(storedUserDetails);
      setCurrentUser(userInfo);
    }
  }, []);

  const value = {
    user,
    setUser,
    toggleMode,
    mode,
    forex,
    coin,
    currentUser,
    toggleMode,
    loading,
    setLoading,
    fetchData,
    fetchForexData,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useUserContext = () => useContext(AuthContext);
