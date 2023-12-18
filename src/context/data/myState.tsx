import React, { useEffect, useState } from "react";
import MyContext from "./myContext";

interface Props {
  children: React.ReactNode;
}

interface User {
  // Define the structure of user data
  // For example:
  id: string;
  name: string;
  // ... other user properties
}

interface Coin {
  // Define the structure of coin data
  // For example:
  id: string;
  name: string;
  // ... other coin properties
}

interface ForexData {
  // Define the structure of forex data
  // For example:
  symbol: string;
  price: number;
  // ... other forex properties
}

const MyState: React.FC<Props> = (props) => {
  const [mode, setMode] = useState<string>("light");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [coin, setCoin] = useState<Coin[]>([]);
  const [forex, setForex] = useState<ForexData[]>([]);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "white";
    } else {
      setMode("dark");
      document.body.style.backgroundColor = "#3c3c3c";
    }
  };

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
      const userInfo = JSON.parse(storedUserDetails) as User;
      setCurrentUser(userInfo);
    }
  }, []);

  return (
    <MyContext.Provider
      value={{
        mode,
        forex,
        coin,
        currentUser,
        toggleMode,
        loading,
        setLoading,
        fetchData,
        fetchForexData,
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
