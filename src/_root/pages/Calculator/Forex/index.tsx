import React, { FC, ReactElement, useEffect, useState } from "react";
import Results from "./Results";
// import {useUserContext} from "@/context/AuthContext";
import { forexLists } from "../Data/Forex";

interface Coin {
  symbol: string;
  full_name: string;
  description: string;
}
export interface IListsProps {
  positionSize: number;
  moneyRisk: number;
  forexLists: number;
}

const Calculator: FC<IListsProps> = (): ReactElement => {
  const [accountBalance, setAccountBalance] = useState<string>("");
  const [riskPercentage, setRiskPercentage] = useState<string>("");
  const [stopLossPips, setStopLossPips] = useState<string>("");
  const [positionSize, setPositionSize] = useState<string | null>(null);
  const [moneyRisk, setMoneyRisk] = useState<number | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<Coin>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInstrumentSelect = (forexLists: any) => {
    setSelectedInstrument(forexLists);
  };

  // const handleCurrencyPairChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setSelectedCurrencyPair(e.target.value);
  // };

  // const HandleApi = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   setIsOpen(!isOpen);
  //   fetchForexData();
  // };

  const calculatePositionSize = () => {
    if (stopLossPips === "0") {
      setPositionSize("Stop loss cannot be zero.");
    } else {
      const riskPercentageDecimal = parseFloat(riskPercentage.replace("%", "")) / 100;
      const stopLossAmount = parseFloat(accountBalance) * riskPercentageDecimal;
      const size = (stopLossAmount / parseFloat(stopLossPips)).toFixed(4);
      setPositionSize(size);
      setMoneyRisk(parseFloat(accountBalance) * riskPercentageDecimal);
      localStorage.setItem("accountBalance", accountBalance);
      localStorage.setItem("riskPercentage", riskPercentage);
      localStorage.setItem("stopLossPips", stopLossPips);
    }
  };

  const handleRiskPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("%", "");
    setRiskPercentage(value);
  };

  const loadUserInputFromLocalStorage = () => {
    const savedAccountBalance = localStorage.getItem("accountBalance");
    const savedRiskPercentage = localStorage.getItem("riskPercentage");
    const savedStopLossPips = localStorage.getItem("stopLossPips");

    if (savedAccountBalance) {
      setAccountBalance(savedAccountBalance);
    }

    if (savedRiskPercentage) {
      setRiskPercentage(savedRiskPercentage);
    }

    if (savedStopLossPips) {
      setStopLossPips(savedStopLossPips);
    }
  };

  useEffect(() => {
    loadUserInputFromLocalStorage();
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredHistory, setFilteredHistory] = useState(forexLists);
  // console.log(forexLists)
 
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredHistory(
      forexLists.filter(
        (forexLists) =>
        forexLists.symbol.toLowerCase().includes(value.toLowerCase()) ||
        forexLists.full_name.toLowerCase().includes(value.toLowerCase())||
        forexLists.description.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-12 md:w-full mx-3 text-start items-start justify-center">
      <div className="flex flex-col gap-3 mr-5 w-full md:w-auto text-start items-center justify-center">
        <div className="flex flex-col lg:flex-row gap-3 text-start items-center justify-center w-full">
          <div className="bg-none flex-col flex w-full">
            <div className="label">
              <span className="label-text">Instrument🎸</span>
            </div>
            <div className="py-3 px-3 w-full text-start cursor-pointer rounded-md border-1 bg-white text-black items-start justify-center focus-within:ring-1 ring-primary-A1">
              <div title={selectedInstrument?.full_name}
                onClick={() => { setIsOpen(!isOpen); }}
                className="flex flex-col gap-2.5 items-start justify-start w-full"
              >
                <div
                  className={`text-[13px] justify-end items-center gap-[5px] inline-flex cursor-pointer`}
                >
                  <div className="font-normal leading-[18px]">
                    {selectedInstrument ? (
                      <>
                         ({selectedInstrument.symbol})
                      </>
                    ) : (
                      "Select Pair"
                    )}
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute bg-[white] h-[24em] w-[90%] md:w-[25em] z-50 mt-[1.5rem] ml-[-1rem] p-[10px] gap-3 overflow-y-auto border border-gray-300 rounded-md shadow-lg">
                  <div className="bg-white w-full">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="px-3 border-none outline-none"
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <hr />
                  </div>
                  {filteredHistory.map((forex, index) => (
                    <button
                      key={index + 1}
                      className="text-[13px] px-2 py-3 hover:bg-gray-100"
                      onClick={() => {
                        handleInstrumentSelect(forex);
                        setIsOpen(!isOpen);
                      }}>
                      <div className="flex flex-row items-center justify-between hover:bg-gray-100">
                        <div className="py-1">
                          {forex.full_name} ({forex.symbol})
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <label className="w-full">
            <div className="">
              <span className="label-text">Deposit currency💰</span>
            </div>
            <select className="select mt-2 select-bordered rounded-md bg-white text-black p-3 w-full">
              <option disabled selected>
                Deposit currency
              </option>
              <option>USD</option>
              <option>GBP</option>
              <option>EUR</option>
              <option>AUD</option>
              <option>CAD</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-3 text-start items-start justify-start w-full">
          <label className="w-full">
            <div className="label">
              <span className="label-text">Account Balance</span>
            </div>
            <input
              type="number"
              placeholder="$$$$"
              value={accountBalance}
              onChange={(e) => setAccountBalance(e.target.value)}
              className="input text-black p-3 input-bordered bg-[white] rounded-md w-full"
            />
          </label>

          <label className="w-full">
            <div className="label">
              <span className="label-text">Risk Percentage📉</span>
            </div>
            <input
              type="text"
              placeholder="%"
              value={riskPercentage + "%"}
              onChange={handleRiskPercentageChange}
              className="input text-black p-3 input-bordered bg-[white] rounded-md w-full"
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-3 text-start items-start justify-start w-full">
          <label className="w-full">
            <div className="label">
              <span className="label-text">Stop loss (pips)</span>
            </div>
            <input
              type="number"
              placeholder="pips"
              value={stopLossPips}
              onChange={(e) => setStopLossPips(e.target.value)}
              className="input text-black p-3 input-bordered bg-[white] rounded-md w-full"
            />
          </label>

          {/* <label className="w-full">
            <div className="label">
              <span className="label-text">
                {selectedInstrument ? selectedInstrument.name : "Pair"} Price
              </span>
            </div>
            <input
              type="number"
              placeholder="Price"
              value={selectedInstrument ? selectedInstrument.price : "Price"}
              // onChange={(e) => setStopLossPips(Number(e.target.value))}
              className="input input-bordered rounded-md w-full"
            />
          </label> */}
        </div>

        <button
          className="px-12 py-3 text-white rounded-full bg-primary-A1 w-full"
          onClick={calculatePositionSize}
        >
          Calculate
        </button>
      </div>
      <div>
        <h3 className="h3-bold mb-3 text-light-1">👇🏻Results👇🏻</h3>
        <Results positionSize={positionSize} moneyRisk={moneyRisk} forex={[]} />
      </div>
    </div>
  );
}

export default Calculator;