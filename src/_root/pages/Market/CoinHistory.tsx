import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowDropUp, MdOutlineArrowDropDown } from "react-icons/md";
import axios from "axios";
import "./coin.css";
import { useUserContext } from "@/context/AuthContext";

const CoinHistory = () => {
  const { coins } = useUserContext();
  const [coin, setCoin] = useState({
    rank: null,
    price_change_percentage_24h: null,
    volume: 0,
    name: "",
    png64: "",
    code: "",
    symbol: "",
    rate: 0,
    cap: 0,
    allTimeHighUSD: 0,
    circulatingSupply: 0,
    maxSupply: 0,
    totalSupply: 0,
    toFixed: 0,
  });

  const { code } = useParams();
  let navigate = useNavigate();

  const list = coins.find(
    (list: { code: { toString: () => string | undefined } }) =>
      list.code.toString() === code
  );

  const fetchData = async () => {
    const URL = "https://api.livecoinwatch.com/coins/single/history";
    const API_KEY = "b67d5e20-9a1e-43ce-9642-81a3260ea30d";

    try {
      console.log(code);
      const response = await axios.post(
        URL,
        {
          currency: "USD",
          code: [code],
          start: 1706000292006,
          end: 1706086692007,
          meta: true,
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
  useEffect(() => {
    fetchData();
  }, [code]);

  return (
    <div className="flex flex-col mt-7 m-3 gap-6 h-screen w-full">
      {coin ? (
        <>
          <div className="flex items-center justify-start">
            <div
              onClick={() => navigate(-1)}
              className="hover:text-primary-A1 cursor-pointer">
              Cryptocurrencies
            </div>
            <IoIosArrowForward />
            <h1 className="text-[grey]">{coin.name} Price</h1>
          </div>
          <div className="">
            <span className="bg-primary-A1 px-3 py-1 rounded-lg shadow-lg">
              Rank # {coin.rank}
            </span>
            <p className="flex py-3 gap-2 mt-3 justify-start items-center">
              <img
                src={coin.png64}
                className="w-[50px] rounded-full"
                alt={coin.name}
              />
              <div className="flex flex-col gap-x-3 justify-center items-start">
                <div className="text-[16px] font-bold">
                  {coin.name} {coin.symbol}
                </div>
                <div className="uppercase text-[12px] md:text-[10px]">
                  {coin.code} Price
                </div>
              </div>
            </p>
            <div className="flex flex-row gap-3">
              <div className="text-[20px] font-bold">
                {list.rate ? (
                  <h1>${(list.rate * 1).toLocaleString()}</h1>
                ) : null}
              </div>
              <div
                className={`flex flex-row text-right mr-auto items-start
            ${
              coin.price_change_percentage_24h &&
              coin.price_change_percentage_24h < 0
                ? "text-red"
                : "text-[green]"
            }
          `}>
                <div>
                  {coin.price_change_percentage_24h &&
                  coin.price_change_percentage_24h < 0 ? (
                    <MdOutlineArrowDropDown />
                  ) : (
                    <MdOutlineArrowDropUp />
                  )}
                </div>
                {coin && coin.price_change_percentage_24h !== null
                  ? (coin.price_change_percentage_24h * 1).toFixed(2)
                  : "N/A"}
                %
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="flex flex-row justify-between w-full">
                <h4>all Time High</h4>
                {coin.allTimeHighUSD ? <p>${coin.allTimeHighUSD.toLocaleString()}</p> : null}
              </div>
              {/* <div className="flex flex-row justify-between w-full">
                <h4>24 Hour High</h4>
                {coin.high_24h ? (
                  <p>${coin.high_24h.toLocaleString()}</p>
                ) : null}{" "}
              </div> */}
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="flex flex-row justify-between w-full">
                <h4>Market Cap</h4>
                {list.cap ? (
                  <p>${(list.cap * 1).toLocaleString()}</p>
                ) : null}
              </div>
              <div className="flex flex-row justify-between w-full">
                <h4>Circulating Supply</h4>
                {coin.circulatingSupply ? (
                  <p>{coin.circulatingSupply.toLocaleString()}</p>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 w-full">
              <div className="flex flex-row justify-between w-full">
                <h4>Total Supply</h4>
                {coin.totalSupply ? (
                  <p>${(coin.totalSupply * 1).toLocaleString()}</p>
                ) : null}
              </div>
              <div className="flex flex-row justify-between w-full">
                <h4>max Supply</h4>
                {coin.maxSupply ? (
                  <p>{(coin.maxSupply * 1).toLocaleString()}</p>
                ) : null}
              </div>
            </div>
          </div>

          <div className="">
            <div className="">
              <h3>About</h3>
              {/* <p>{coin.description}</p> */}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CoinHistory;
