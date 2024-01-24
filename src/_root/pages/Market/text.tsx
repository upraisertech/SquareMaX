// import { useEffect, useState } from "react";
// import { useUserContext } from "@/context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { styled } from "@mui/material";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import ReactPaginate from "react-paginate";
// import { FaSearch } from "react-icons/fa";
// import "./coin.css";

// interface Coin {
//   rank: any;
//   price_change_percentage_24h: null;
//   volume: any;
//   name: string;
//   png64: string;
//   code: string;
//   rate: number;
//   cap: number;
//   toFixed: number;
//   itemOffset: any;
//   // Add any other properties here as needed
// }

// const StyledTableCell = styled(TableCell)(() => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: "#E8E9E8",
//     color: "black",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const BasicTablePage = () => {
//   const { coins, fetchData } = useUserContext();
//   let navigate = useNavigate();
//   const [currentUpdates, setCurrentUpdates] = useState([]);
//   const [pageCount, setPageCount] = useState(0);
//   const [itemOffset, setItemOffset] = useState(0);
//   const updatesPerPage = 6;

//   useEffect(() => {
//     const endOffset = itemOffset + updatesPerPage;
//     setCurrentUpdates(coins.slice(itemOffset, endOffset));
//     setPageCount(Math.ceil(coins.length / updatesPerPage));
//   }, [itemOffset, updatesPerPage, coins]);

//   const handlePageClick = (e: { selected: number }) => {
//     const newOffset = (e.selected * updatesPerPage) % coins.length;
//     setItemOffset(newOffset);
//   };

//   // const numberWithCommas = (x: string) => {
//   //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//   // };

//   const numberWithCommas = (x: string) => {
//     const parts = x.split(".");
//     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     return parts.join(".");
//   };

//   const abbreviateMarketCap = (cap: number) => {
//     if (cap >= 1000000) {
//       const abbreviatedMarketCap = (cap / 1000000000).toFixed(2);
//       return `${abbreviatedMarketCap}M`;
//     }
//     if (cap >= 1000) {
//       const abbreviatedMarketCap = (cap / 1000).toFixed(2);
//       return `${abbreviatedMarketCap}K`;
//     } else {
//       return numberWithCommas(cap.toFixed(2));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filteredHistory, setFilteredHistory] =
//     useState<Coin[]>(currentUpdates);

//   const handleSearch = (value: string) => {
//     setSearchTerm(value);
//     setFilteredHistory(
//       currentUpdates.filter(
//         (coin: Coin) =>
//           coin.code.toLowerCase().includes(value.toLowerCase()) ||
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
//       <div className="flex flex-col md:flex-row p-3 gap-10 items-center justify-center md:justify-between w-full">
//         <div></div>
//         <div className="flex flex-row w-full md:w-[20em] bg-white gap-3 text-black border border-grey_80 p-2 rounded-md focus-within:ring-2 ring-primary-A1 items-center justify-center">
//           <FaSearch />
//           <input
//             onChange={(e) => handleSearch(e.target.value)}
//             value={searchTerm}
//             className="text-black text-[15px] font-normal w-full border-none outline-none"
//             type="text"
//             placeholder="Search for a coin..."
//           />
//         </div>
//       </div>

//       <div className="inline-block w-full md:w-[95%] align-middle md:mx-[2rem]">
//         <div className="w-full overflow-x-auto">
//           <TableContainer
//             className="pr-[20px] lg:pr-0 ml-[25px] lg:ml-0"
//             component={Paper}>
//             <Table sx={{ minWidth: 1000 }} aria-label="customized table">
//               <TableHead className="w-full">
//                 <TableRow className="font-bold text-white text-sm leading-normal capitalize">
//                   <StyledTableCell align="center">#</StyledTableCell>
//                   <StyledTableCell align="center">Coin</StyledTableCell>
//                   <StyledTableCell align="center">Price</StyledTableCell>
//                   <StyledTableCell align="center">Mkt Cap</StyledTableCell>
//                   <StyledTableCell align="center">Volume</StyledTableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody className="w-full text-left">
//                 {filteredHistory.length !== 0 ? (
//                   filteredHistory.map((coin) => {
//                     return (
//                       <StyledTableRow
//                         key={coin.rank}
//                         onClick={() => navigate(`/history/${coin.code}`)}
//                         className="w-full coin-row gap-3">
//                         <StyledTableCell>{coin.rank}</StyledTableCell>
//                         <StyledTableCell>
//                           <div className="flex py-3 gap-2 justify-start items-center">
//                             <img
//                               src={coin.png64}
//                               className="w-[20px]"
//                               alt={coin?.name}
//                             />
//                             <div className="flex flex-col md:flex-row gap-x-3 justify-center items-start">
//                               <div className="text-[12px] font-bold">
//                                 {coin.name}
//                               </div>
//                               <div className="uppercase text-[12px] md:text-[10px]">
//                                 {coin.code}
//                               </div>
//                             </div>
//                           </div>
//                         </StyledTableCell>
//                         <StyledTableCell className="flex flex-col text-left items-start">
//                           ${(coin.rate * 1).toLocaleString()}
//                         </StyledTableCell>
//                         {/* <StyledTableCell
//                         className={`flex flex-col text-right mr-auto items-start
//                           ${
//                             coin.price_change_percentage_24h &&
//                             coin.price_change_percentage_24h < 0
//                               ? "text-red"
//                               : "text-[green]"
//                           }
//                         `}>
//                         {coin && coin.price_change_percentage_24h !== null
//                           ? (coin.price_change_percentage_24h * 1).toFixed(2)
//                           : "N/A"}
//                         %
//                       </StyledTableCell> */}
//                         <StyledTableCell className="">
//                           ${abbreviateMarketCap(coin.cap * 1)}
//                         </StyledTableCell>
//                         <StyledTableCell className="">
//                           ${(coin.volume * 1).toLocaleString()}
//                         </StyledTableCell>
//                       </StyledTableRow>
//                     );
//                   })
//                 ) : (
//                   <div className="text-primary-A2 text-center text-[20px] pt-[7em] font-normal tracking-tight">
//                     Not found
//                   </div>
//                 )}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </div>
//       </div>

//       <ReactPaginate
//         breakLabel="..."
//         nextLabel={<>n</>}
//         containerClassName="pagination"
//         pageClassName="page"
//         activeClassName="page-active"
//         previousClassName="paginate-btns"
//         nextClassName="paginate-btns"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={1}
//         pageCount={pageCount}
//         previousLabel={<>p</>}
//         renderOnZeroPageCount={null}
//       />
//     </div>
//   );
// };

// export default BasicTablePage;