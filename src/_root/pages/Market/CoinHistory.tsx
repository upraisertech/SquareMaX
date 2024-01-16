import { useUserContext } from "@/context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineArrowDropUp,MdOutlineArrowDropDown  } from "react-icons/md";
import "./coin.css";
// import { useEffect, useState } from "react";

// interface Coin {
//   id: string;
//   symbol: string;
//   name: string;
//   description: string;
//   // Add other properties as needed
// }

const CoinHistory = () => {
  const { coins } = useUserContext();
  const { name } = useParams();
  let navigate = useNavigate();

  const coin = coins.find(
    (coin: { name: { toString: () => string | undefined } }) =>
      coin.name.toString() === name
  );

  return (
    <div className="flex flex-col mt-7 m-3 gap-6 h-screen">
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
        <div className="rank">
          <span className="bg-primary-A1 px-3 py-1 rounded-lg shadow-lg">
            Rank # {coin.market_cap_rank}
          </span>
        </div>
        <p className="flex py-3 gap-2 mt-3 justify-start items-center">
          <img src={coin.image} className="w-[50px] rounded-full" alt={coin.name} />
          <div className="flex flex-col gap-x-3 justify-center items-start">
            <div className="text-[16px] font-bold">{coin.name}</div>
            <div className="uppercase text-[12px] md:text-[10px]">
              {coin.symbol} Price
            </div>
          </div>
        </p>
        <div className="flex flex-row gap-3">
          <div className="text-[20px] font-bold">
            {coin.current_price ? (
              <h1>${coin.current_price.toLocaleString()}</h1>
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
              coin.price_change_percentage_24h < 0
                ? <MdOutlineArrowDropDown />
                : <MdOutlineArrowDropUp />}
            </div>
            {coin && coin.price_change_percentage_24h !== null
              ? (coin.price_change_percentage_24h * 1).toFixed(2)
              : "N/A"}
            %
          </div>
        </div>
      </div>

      <div className="content">
        <table>
          <thead>
            <tr>
              <th>1h</th>
              <th>24h</th>
              <th>7d</th>
              <th>14d</th>
              <th>30d</th>
              <th>1yr</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {coin.market_data?.price_change_percentage_1h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                      1
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {coin.market_data?.price_change_percentage_24h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                      1
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {coin.market_data?.price_change_percentage_24h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                      1
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {coin.market_data?.price_change_percentage_24h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                      1
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {coin.market_data?.price_change_percentage_24h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                      1
                    )}
                    %
                  </p>
                ) : null}
              </td>
              <td>
                {coin.market_data?.price_change_percentage_24h_in_currency ? (
                  <p>
                    {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                      1
                    )}
                    %
                  </p>
                ) : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="content">
        <div className="stats">
          <div className="left">
            <div className="row">
              <h4>24 Hour Low</h4>
              {coin.market_data?.low_24h ? (
                <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div className="row">
              <h4>24 Hour High</h4>
              {coin.market_data?.high_24h ? (
                <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
              ) : null}{" "}
            </div>
          </div>
          <div className="right">
            <div className="row">
              <h4>Market Cap</h4>
              {coin.market_data?.market_cap ? (
                <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
              ) : null}
            </div>
            <div className="row">
              <h4>Circulating Supply</h4>
              {coin.market_data ? (
                <p>{coin.market_data.circulating_supply}</p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="about">
          <h3>About</h3>
          <p>{coin.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CoinHistory;
