import { useEffect, useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./coin.css";
import ReactPaginate from "react-paginate";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";

interface Coin {
  rank: any;
  price_change_percentage_24h: null;
  volume: any;
  name: string;
  png64: string;
  code: string;
  rate: number;
  cap: number;
  toFixed: number;
  // Add any other properties here as needed
}

const BasicTablePage = () => {
  const { coins, fetchData } = useUserContext();
  let navigate = useNavigate();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState<Coin[]>([]);
  const PAGE_SIZE = 50;

  // const numberWithCommas = (x: string) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  const numberWithCommas = (x: string) => {
    const parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const abbreviateMarketCap = (cap: number) => {
    if (cap >= 1000000000) {
      const abbreviatedMarketCap = (cap / 1000000000).toFixed(2);
      return `${abbreviatedMarketCap}B`;
    }
    if (cap >= 1000000) {
      const abbreviatedMarketCap = (cap / 1000000).toFixed(2);
      return `${abbreviatedMarketCap}M`;
    }
    if (cap >= 1000) {
      const abbreviatedMarketCap = (cap / 1000).toFixed(2);
      return `${abbreviatedMarketCap}K`;
    } else {
      return numberWithCommas(cap.toFixed(2));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredHistory, setFilteredHistory] = useState<Coin[]>(coins);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredHistory(
      coins.filter(
        (coin: Coin) =>
          coin.code.toLowerCase().includes(value.toLowerCase()) ||
          coin.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const endOffset = itemOffset + PAGE_SIZE;
    setCurrentPage(filteredHistory.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredHistory.length / PAGE_SIZE));
  }, [itemOffset, PAGE_SIZE, filteredHistory]);

  const handlePageClick = (e: { selected: any }) => {
    const selectedPage = e.selected;
    setItemOffset(selectedPage * PAGE_SIZE);
  };

  return (
    <div>
      <div
        className="w-full h-screen pb-[-5em] overflow-y-auto"
        title="Cryptocurrency prices and signals">
        <div className="text-primary-A2 text-[20px] text-center font-bold w-auto">
          Cryptocurrency prices and signals
        </div>
        <div className="flex flex-col md:flex-row p-3 gap-10 items-center justify-center md:justify-between w-full">
          <div></div>
          <div className="flex flex-row w-full md:w-[20em] bg-white gap-3 text-black border border-grey_80 px-2 py-3 rounded-md focus-within:ring-2 ring-primary-A1 items-center justify-center">
            <FaSearch />
            <input
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
              className="text-black text-[15px] font-normal w-full bg-none border-none outline-none"
              type="text"
              placeholder="Search for a coin..."
            />
          </div>
        </div>

        <div className="inline-block w-full md:w-[95%] align-middle md:mx-[2rem]">
          <div className="w-full overflow-x-auto">
            <table className="pr-[20px] lg:pr-0 lg:ml-0">
              <thead className="w-full">
                <tr className="font-bold text-white coin-row text-sm leading-normal capitalize">
                  <td align="center">#</td>
                  <td className="mr-auto ml-3">Coin</td>
                  <td className="mr-auto">Price</td>
                  <td className="mr-auto">Mkt Cap</td>
                  <td className="mr-auto">Volume</td>
                </tr>
              </thead>

              <tbody className="w-full text-left">
                {filteredHistory.length !== 0 ? (
                  currentPage.map((coin) => {
                    return (
                      <tr
                        key={coin.rank}
                        onClick={() => navigate(`/history/${coin.code}`)}
                        className="w-full coin-row gap-3">
                        <td>{coin.rank}</td>
                        <td className="flex py-3 gap-2 mr-auto justify-start items-center">
                          <img
                            src={coin.png64}
                            className="w-[20px]"
                            alt={coin?.name}
                          />
                          <div className="flex flex-col md:flex-row gap-x-3 justify-center items-start">
                            <div className="text-[12px] font-bold">
                              {coin.name}
                            </div>
                            <div className="uppercase text-[12px] md:text-[10px]">
                              {coin.code}
                            </div>
                          </div>
                        </td>
                        <td className="flex flex-col mr-auto text-left items-end">
                          ${(coin.rate * 1).toLocaleString()}
                        </td>
                        {/* <td
                        className={`flex flex-col text-right mr-auto items-start
                          ${
                            coin.price_change_percentage_24h &&
                            coin.price_change_percentage_24h < 0
                              ? "text-red"
                              : "text-[green]"
                          }
                        `}>
                        {coin && coin.price_change_percentage_24h !== null
                          ? (coin.price_change_percentage_24h * 1).toFixed(2)
                          : "N/A"}
                        %
                      </td> */}
                        <td className="mr-auto text-left items-end">
                          ${abbreviateMarketCap(coin.cap * 1)}
                        </td>
                        <td className="">
                          ${(coin.volume * 1).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="text-primary-A2 text-center text-[20px] pt-[7em] font-normal tracking-tight">
                    Not found
                  </div>
                )}
              </tbody>
              <thead className="w-full">
                <tr className="flex flex-row mt-5 px-3 items-center justify-center gap-4 w-full">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel={<MdOutlineKeyboardDoubleArrowRight />}
                    containerClassName="pagination"
                    pageClassName="page"
                    activeClassName="page-active"
                    previousClassName="paginate-btns rotate-240"
                    nextClassName="paginate-btns"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pageCount} // Use the calculated pageCount based on filteredChapters
                    previousLabel={<MdOutlineKeyboardDoubleArrowLeft />}
                    renderOnZeroPageCount={null}
                  />
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <div className="flex flex-row mt-5 items-center justify-center gap-4 w-full"></div>
      </div>
    </div>
  );
};

export default BasicTablePage;
