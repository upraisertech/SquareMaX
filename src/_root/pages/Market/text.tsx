// import { useState } from "react";
// import { useUserContext } from "@/context/AuthContext";
// import { useNavigate } from "react-router-dom";
// // import { useLocation } from "react-router-dom";

// interface Coin {
//   name: string;
//   image: string;
//   symbol: string;
//   current_price: number;
//   market_cap: number;
//   // Add any other properties here as needed
// }

// const BasicTablePage = () => {
//   const { coins } = useUserContext();
//   let navigate = useNavigate();

//   // const numberWithCommas = (x: string) => {
//   //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   // };

//   const numberWithCommas = (x: string) => {
//     const parts = x.split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return parts.join(".");
//   };

//   const abbreviateMarketCap = (market_cap: number) => {
//     if (market_cap >= 1000000) {
//       const abbreviatedMarketCap = (market_cap / 1000000000).toFixed(2);
//       return `${abbreviatedMarketCap}M`;
//     }
//     if (market_cap >= 1000) {
//       const abbreviatedMarketCap = (market_cap / 1000).toFixed(2);
//       return `${abbreviatedMarketCap}K`;
//     } else {
//       return numberWithCommas(market_cap.toFixed(2));
//     }
//   };

//   // useEffect(() => {
//   //   fetchData();
//   // }, []);

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filteredHistory, setFilteredHistory] = useState<Coin[]>(coins);

//   const handleSearch = (value: string) => {
//     setSearchTerm(value);
//     setFilteredHistory(
//       coins.filter(
//         (coin: Coin) =>
//           coin.symbol.toLowerCase().includes(value.toLowerCase()) ||
//           coin.name.toLowerCase().includes(value.toLowerCase())
//       )
//     );
//   };

//   return (
//     <div
//       className="w-full h-screen pb-[4em] overflow-x-auto"
//       title="Cryptocurrency prices and signals">
//       <div className="text-primary-A2 text-[20px] text-center font-bold w-auto">
//         Cryptocurrency prices and signals
//       </div>
//       <div className="flex flex-row p-3 gap-10 items-center justify-between w-full">
//         <div></div>
//         <input
//           onChange={(e) => handleSearch(e.target.value)}
//           value={searchTerm}
//           className="text-black text-[15px] border border-grey_80 p-2 rounded-md font-normal w-[20em] focus-within:ring-2 ring-primary-A1"
//           type="text"
//           placeholder="Search for a coin..."
//         />
//       </div>
//       <div className="inline-block w-full align-middle md:mx-[3rem]">
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
//             <thead className="bg-primary-A1 text-white text-left -mt-12 mb-7">
//               <tr>
//                 {columns.map((column, i) => (
//                   <th key={i} scope="col" className="py-3 pl-3 table-th">
//                     {column.label}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-left">
//               {filteredHistory.length !== 0 ? (
//                 filteredHistory.map((row, i) => {
//                   return (
//                     <tr
//                       onClick={() => navigate(`/market/${row.name}`)}
//                       key={i}
//                       className="hover:bg-primary-A1 hover:text-white cursor-pointer">
//                       <td className="table-td pl-3">{i + 1}</td>
//                       <td className="flex table-td py-3 gap-2 justify-start items-center">
//                         <img
//                           src={row.image}
//                           className="w-[20px]"
//                           alt={row.name}
//                         />
//                         <div className="flex flex-col md:flex-row gap-x-3 justify-center items-center">
//                           <div className="text-[12px] font-bold">{row.name}</div>
//                           <div className="uppercase text-[12px] md:text-[10px]">{row.symbol}</div>
//                         </div>
//                       </td>
//                       <td
//                         title={(row.current_price * 1).toFixed(10)}
//                         className="table-td ">
//                         {row.current_price}
//                       </td>
//                       <td
//                         title={numberWithCommas(
//                           (row.market_cap * 1).toFixed(2)
//                         )}
//                         className="table-td">
//                         ${abbreviateMarketCap(row.market_cap * 1)}
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <td
//                   className="text-primary-A2 text-center text-[20px] pt-[7em] font-normal tracking-tight"
//                   colSpan={4}>
//                   Not found
//                 </td>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// const columns = [
//   {
//     label: "#",
//     field: "harsh",
//   },
//   {
//     label: "All coins",
//     field: "all_coins",
//   },
//   {
//     label: "Price",
//     field: "price",
//   },
//   {
//     label: "Market cap",
//     field: "marketCap",
//   },
// ];
// export default BasicTablePage;
