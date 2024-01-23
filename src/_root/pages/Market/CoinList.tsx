import { useEffect, useState } from "react";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./coin.css";

interface Coin {
  rank: any;
  price_change_percentage_24h: null;
  volume: any;
  name: string;
  png32: string;
  code: string;
  rate: number;
  cap: number;
  toFixed: number;
  // Add any other properties here as needed
}

const BasicTablePage = () => {
  const { coins, fetchData } = useUserContext();
  let navigate = useNavigate();

  // const numberWithCommas = (x: string) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  const numberWithCommas = (x: string) => {
    const parts = x.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  };

  const abbreviateMarketCap = (cap: number) => {
    if (cap >= 1000000) {
      const abbreviatedMarketCap = (cap / 1000000000).toFixed(2);
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

  return (
    <div
      className="w-full h-screen pb-[4em] overflow-x-auto"
      title="Cryptocurrency prices and signals">
      <div className="text-primary-A2 text-[20px] text-center font-bold w-auto">
        Cryptocurrency prices and signals
      </div>
      <div className="flex flex-col md:flex-row p-3 gap-10 items-center justify-center md:justify-between w-full">
        <div></div>
        <div className="flex flex-row w-full md:w-[20em] bg-white gap-3 text-black border border-grey_80 p-2 rounded-md focus-within:ring-2 ring-primary-A1 items-center justify-center">
          <FaSearch />
          <input
            onChange={(e) => handleSearch(e.target.value)}
            value={searchTerm}
            className="text-black text-[15px] font-normal w-full border-none outline-none"
            type="text"
            placeholder="Search for a coin..."
          />
        </div>
      </div>

      <div className="inline-block w-full md:w-[95%] align-middle md:mx-[2rem]">
        <div className="overflow-x-auto">
          <table className="container justify-start items-center">
            <thead className="">
              <tr className="font-bold text-white text-sm leading-normal capitalize">
                <th>#</th>
                <th className="coin-name">Coin</th>
                <th>Price</th>
                <th>24h</th>
                <th className="">Mkt Cap</th>
                <th className="hide-mobile">Volume</th>
              </tr>
            </thead>

            <tbody className="w-full text-left">
              {filteredHistory.length !== 0 ? (
                filteredHistory.map((coin) => {
                  return (
                    <tr
                      onClick={() => navigate(`/market/${coin.name}`)}
                      className="w-full coin-row gap-3">
                      <td>{coin.rank}</td>
                      <td className="flex py-3 gap-2 mr-auto justify-start items-center">
                        <img
                          src={coin.png32}
                          className="w-[20px]"
                          alt={coin.name}
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
                      <td className="flex flex-col text-left mr-auto items-start">
                        ${coin.rate.toLocaleString()}
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
                      <td className="">${abbreviateMarketCap(coin.cap * 1)}</td>
                      <td className="hide-mobile">
                        ${coin.volume.toLocaleString()}
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
          </table>
        </div>
      </div>
      <>
        <div>1</div>
        <div>2</div>
      </>
    </div>
  );
};

export default BasicTablePage;
