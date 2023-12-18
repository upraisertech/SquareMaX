import React, { useContext, useEffect, useState } from "react";
import myContext from "context/data/myContext";
import { useLocation } from "react-router-dom";

const BasicTablePage = () => {
  const context = useContext(myContext);
  const { fetchData, mode, coin } = context;
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredHistory, setFilteredHistory] = useState(coin);

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  const handleSearch = (value) => {
    setSearchTerm(value);
    setFilteredHistory(
      coin.filter(
        (coin) =>
          coin.name.toLowerCase().includes(value.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(value.toLowerCase()) ||
          coin.marketCap.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div
      className="w-full h-screen pb-[4em] overflow-x-auto"
      title="Hover Table"
    >
      <div
        className="text-primary-A2 text-[20px] text-center font-bold w-auto"
        variant="body5"
      >
        Cryptocurrency prices and signals
      </div>
      <div className="flex flex-row p-3 gap-10 items-center justify-between w-full">
        <div></div>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          className="text-black text-[15px] border border-grey_80 p-2 rounded-md font-normal w-[20em] focus-within:ring-2 ring-primary-A1"
          type="text"
          placeholder="Enter a name, email or phone number"
        />
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-auto">
          <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
            <thead className="bg-primary-A1 text-white -mt-12 mb-7">
              <tr>
                {columns.map((column, i) => (
                  <th key={i} scope="col" className="py-3 pl-3 table-th">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody
              className="divide-y divide-slate-100 dark:divide-slate-700"
              style={{ color: mode === "dark" ? "white" : "" }}
            >
              {filteredHistory.length !== 0 ? (
                filteredHistory.map((row, i) => {
                  return (
                    <tr
                      key={i}
                      style={{ color: mode === "dark" ? "white" : "" }}
                      className="hover:bg-primary-A1 hover:text-white"
                    >
                      <td className="table-td pl-3">{i + 1}</td>
                      <td className="flex table-td py-3 gap-2 justify-start items-center">
                        <img
                          src={row.iconUrl}
                          className="w-[20px]"
                          alt={row.name}
                        />
                        <div className="flex flex-col text-[12px]">
                          {/* <>{row.name}</><br/> */}
                          <>{row.symbol}</>
                        </div>
                      </td>
                      <td className="table-td ">
                        {numberWithCommas((row.price * 1).toFixed(3))}
                      </td>
                      <td className="table-td ">
                        ${numberWithCommas((row.marketCap * 1).toFixed(2))}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <td
                  className="text-primary-A2 text-center text-[20px] pt-[7em] font-normal tracking-tight"
                  colSpan="4"
                >
                  Not found
                </td>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const columns = [
  {
    label: "#",
    field: "harsh",
  },
  {
    label: "All coins",
    field: "all_coins",
  },
  {
    label: "Price",
    field: "price",
  },
  {
    label: "Market cap",
    field: "marketCap",
  },
];
export default BasicTablePage;
