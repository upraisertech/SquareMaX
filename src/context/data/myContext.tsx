// // import { createContext } from "react";

// // const myContext = createContext();

// // export default myContext;








// import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { IUser } from "@/types";
// import { getCurrentUser } from "@/lib/appwrite/api";

// export const INITIAL_USER: IUser = {
//   id: '',
//   name: '',
//   username: '',
//   email: '',
//   imageUrl: '',
//   bio: '',
//   followers: [], // Update to an empty array
//   verified: false,
// };

// interface IContextType {
//   user: IUser;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   setUser: React.Dispatch<React.SetStateAction<IUser>>;
//   setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
//   checkAuthUser: () => Promise<boolean>;
//   mode: string;
//   forex: any[];
//   coin: any[];
//   toggleMode: () => void;
//   fetchData: () => void;
//   fetchForexData: () => void;
// }

// const AuthContext = createContext<IContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState<IUser | null>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [mode, setMode] = useState("light");
//   const [coin, setCoin] = useState<any[]>([]);
//   const [forex, setForex] = useState<any[]>([]);

//   const toggleMode = () => {
//     const newMode = mode === "dark" ? "light" : "dark";
//     setMode(newMode);
//     document.body.style.backgroundColor = newMode === "light" ? "white" : "#3c3c3c";
//   };

//   const checkAuthUser = async () => {
//     setIsLoading(true);
//     try {
//       const currentAccount = await getCurrentUser();
//       if (currentAccount) {
//         const userData: IUser = {
//           id: currentAccount.$id,
//           name: currentAccount.name,
//           username: currentAccount.username,
//           email: currentAccount.email,
//           imageUrl: currentAccount.imageUrl,
//           bio: currentAccount.bio,
//           followers: currentAccount.followers,
//           verified: currentAccount.verified,
//         };
//         setUser(userData);
//         setIsAuthenticated(true);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error(error);
//       return false;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`https://api.coinranking.com/v2/coins?token=coinranking9bbba664219afc1683d728ce38d82a8cc832637a8c765ad9`);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setCoin(data.data.coins);
//     } catch (error) {
//       console.error("Error fetching coin data:", error);
//     }
//   };

//   const fetchForexData = async () => {
//     try {
//       const response = await fetch(`https://www.rebatekingfx.com/api/live-chart/datafeed/search?lang=en`);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setForex(data);
//     } catch (error) {
//       console.error("Error fetching forex data:", error);
//     }
//   };

//   useEffect(() => {
//     const cookieFallback = localStorage.getItem("cookieFallback");
//     if (!cookieFallback || cookieFallback === "[]") {
//       navigate("/sign-in");
//     }
//     checkAuthUser();
//     fetchData();
//     fetchForexData();
//   }, [navigate]);

//   const value: IContextType = {
//     user: INITIAL_USER,
//     setUser: () => {},
//     toggleMode,
//     mode,
//     forex,
//     coin,
//     fetchData,
//     fetchForexData,
//     isLoading,
//     isAuthenticated,
//     setIsAuthenticated,
//     checkAuthUser,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useUserContext = (): IContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useUserContext must be used within an AuthProvider");
//   }
//   return context;
// };
