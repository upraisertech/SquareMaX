import React, { useEffect, useState } from "react";
import Results from "./Results";
import { useUserContext } from "@/context/AuthContext";

interface Coin {
  symbol: string;
  name: string;
  price: string;
  iconUrl: string;
  // Add any other properties here as needed
}
export interface IListsProps {
  positionSize: number;
  moneyRisk: number;
}
export interface ICountriesProps {
  forex: IListsProps[];
}

function CryptoCal() {
  const { fetchData, coin } = useUserContext();
  const [accountBalance, setAccountBalance] = useState<string>("");
  const [riskPercentage, setRiskPercentage] = useState<string>("");
  const [stopLossRange, setStopLossRange] = useState<number | string>("");
  const [positionSize, setPositionSize] = useState<number | string>("");
  const [moneyRisk, setMoneyRisk] = useState<number | string>("");
  // const [selectedCurrencyPair, setSelectedCurrencyPair] = useState<string>("");
  const [selectedInstrument, setSelectedInstrument] = useState<Coin | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [price, setPrice] = useState<string>("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleInstrumentSelect = (coin: Coin) => {
    setSelectedInstrument(coin);
  };

  // Define the API endpoint URL
  const HandleApi = () => {
    setIsOpen(!isOpen);
    fetchData();
  };

  const calculatePositionSize = () => {
    if (stopLossRange === 0) {
      setPositionSize("Stop loss cannot be zero.");
    } else {
      // Convert riskPercentage to a decimal
      const riskPercentageDecimal =
        parseFloat(riskPercentage.replace("%", "")) / 100;
      // Calculate the position size
      const stopLossAmount = parseFloat(accountBalance) * riskPercentageDecimal;
      const size = (
        stopLossAmount / parseFloat(stopLossRange as string)
      ).toFixed(4);
      setPositionSize(size);
      setMoneyRisk(parseFloat(accountBalance) * riskPercentageDecimal);
      localStorage.setItem("accountBalance", accountBalance);
      localStorage.setItem("riskPercentage", riskPercentage);
      localStorage.setItem("stopLossRange", stopLossRange as string);
    }
  };

  const handleRiskPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace("%", "");
    setRiskPercentage(value);
  };

  const loadUserInputFromLocalStorage = () => {
    const savedAccountBalance = localStorage.getItem("accountBalance");
    const savedRiskPercentage = localStorage.getItem("riskPercentage");
    const savedStopLossRange = localStorage.getItem("stopLossRange");

    if (savedAccountBalance) {
      setAccountBalance(savedAccountBalance);
    }

    if (savedRiskPercentage) {
      setRiskPercentage(savedRiskPercentage);
    }

    if (savedStopLossRange) {
      setStopLossRange(savedStopLossRange);
    }
  };

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredHistory, setFilteredHistory] = useState<Coin[]>(coin);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredHistory(
      coin.filter(
        (coin: Coin) =>
          coin.symbol.toLowerCase().includes(value.toLowerCase()) ||
          coin.name.toLowerCase().includes(value.toLowerCase()) ||
          coin.price.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  // Load data from localStorage when the component mounts
  useEffect(() => {
    loadUserInputFromLocalStorage();
  }, []);

  return (
    <div className="flex flex-col gap-12 md:w-full mx-3 text-start md:items-start justify-between">
      <div className="flex flex-col gap-3 text-start items-center justify-center">
        <div className="flex flex-col md:flex-row gap-3 text-start items-center justify-center w-full md:w-[40em]">
          <div className="bg-none flex-col flex w-full">
            <div className="label">
              <span className="label-text">Instrument</span>
            </div>
            <div className="py-3 px-3 w-full text-start rounded-md border-1 bg-white text-black items-start justify-center focus-within:ring-1 ring-primary-A1">
              <div
                onClick={HandleApi}
                className="flex flex-col gap-2.5 items-start justify-start w-auto">
                <div
                  className={`text-[13px] justify-center items-center gap-[5px] inline-flex cursor-pointer`}>
                  <div className="font-normal leading-[18px]">
                    {selectedInstrument ? (
                      <div className="flex flex-row justify-center items-center gap-3">
                        <img
                          src={selectedInstrument.iconUrl}
                          className="w-[20px] rounded-sm"
                          alt=""
                        />
                        {selectedInstrument.name} ({selectedInstrument.symbol})
                      </div>
                    ) : (
                      "Select Pair"
                    )}
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className="absolute bg-[white] h-[24em] w-[90%] md:w-[25em] z-50 mt-[1.5rem] ml-[-1rem] p-[10px] gap-3 overflow-y-auto border border-gray-300 rounded-md shadow-lg">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="px-3 border-none outline-none"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <hr />
                  {filteredHistory.map((coin, index) => (
                    <div
                      key={index + 1}
                      className="text-[13px] px-2 py-3 hover:bg-gray-100"
                      onClick={() => {
                        handleInstrumentSelect(coin);
                        setIsOpen(!isOpen);
                      }}>
                      <div className="flex flex-row gap-3 items-center justify-start hover:bg-gray-100">
                        <img
                          src={coin.iconUrl}
                          className="w-[25px] rounded-sm"
                          alt=""
                        />
                        <div className="py-1">
                          {coin.name} ({coin.symbol})
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <label className="w-full">
            <div className="">
              <span className="label-text">Deposit currency</span>
            </div>
            <select className="select mt-2 p-3 rounded-md select-bordered bg-white text-black w-full">
              <option disabled selected>
                Deposit currency
              </option>
              <option> </option>
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
              className="input text-black p-3 input-bordered rounded-md w-full"
            />
          </label>

          <label className="w-full">
            <div className="label">
              <span className="label-text">Risk Percentage</span>
            </div>
            <input
              type="text"
              placeholder="%"
              value={riskPercentage + "%"}
              onChange={handleRiskPercentageChange}
              className="input text-black p-3 input-bordered rounded-md w-full"
            />
          </label>
        </div>

        <div className="flex flex-col md:flex-row gap-3 text-start items-start justify-start w-full">
          <label className="w-full">
            <div className="label">
              <span className="label-text">Stop loss (Range)</span>
            </div>
            <input
              type="number"
              placeholder="Range"
              value={stopLossRange}
              onChange={(e) => setStopLossRange(e.target.value)}
              className="input text-black p-3 input-bordered rounded-md w-full"
            />
          </label>

          <label className="w-full">
            <div className="label">
              <span className="label-text">
                {selectedInstrument ? selectedInstrument.name : ""} Stop loss
                (Price)
              </span>
            </div>
            <input
              type="number"
              placeholder={price}
              value={selectedInstrument ? (selectedInstrument.price) : ""}
              onChange={handlePriceChange}
              className="input text-black p-3 input-bordered rounded-md w-full"
            />
          </label>
        </div>

        <button
          className="px-12 py-3 text-white rounded-full bg-primary-A1 w-full"
          onClick={calculatePositionSize}>
          Calculate
        </button>
      </div>
      <div>
        <Results positionSize={positionSize} moneyRisk={moneyRisk} forex={[]} />
      </div>
    </div>
  );
}

export default CryptoCal;