import React, { useState, ChangeEvent } from "react";
import {useUserContext} from "@/context/AuthContext";

interface Props {}

const PercentageCalculator: React.FC<Props> = () => {
  const { mode } = useUserContext();
  const [value, setValue] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [result, setResult] = useState<string>("0");

  const numberWithCommas = (x: string): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculatePercentage = () => {
    const val = parseFloat(value.replace(/,/g, ""));
    const percent = parseFloat(percentage.replace(/,/g, ""));

    if (!isNaN(val) && !isNaN(percent)) {
      const calculatedResult = (val * percent) / 100;
      setResult(numberWithCommas(calculatedResult.toFixed(2))); // Format result with commas and keep 2 decimal places
    } else {
      setResult("0");
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "").replace(/^0+/, ""); // Remove non-digits and leading zeroes
    setValue(numberWithCommas(input));
  };

  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "").replace(/^0+/, ""); // Remove non-digits and leading zeroes
    setPercentage(numberWithCommas(input));
  };

  return (
    <div className={`flex flex-col p-3 md:w-[550px] mx-auto items-center justify-center ${mode === "dark" ? "white" : ""}`}>
      <div className="text-2xl text-left font-bold mb-4 w-full">Percentage Calculator</div>

      <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-start items-start justify-start w-full">
        <label className="w-full">
          <div className="label">
            <span className="label-text">Enter value</span>
          </div>
          <input
            type="number"
            placeholder="Enter value"
            value={value}
            onChange={handleValueChange}
            className="input p-3 input-bordered rounded-md bg-[white] text-black w-full"
          />
        </label>

        <label className="w-full">
          <div className="label">
            <span className="label-text">Percentage (%)</span>
          </div>
          <input
            type="number"
            placeholder="Enter percentage"
            value={percentage}
            onChange={handlePercentageChange}
            className="input p-3 input-bordered rounded-md bg-[white] text-black w-full"
          />
        </label>
      </div>

      <div className="my-4 md:my-8 p-3 border-1 border-black bg-white text-black rounded-md w-full">
        <p>
          Result: <span className="font-bold">{result}</span>
        </p>
      </div>

      <button
        className="px-12 py-3 mb-[16em] text-white rounded-full bg-primary-A1 w-full"
        onClick={calculatePercentage}
      >
        Calculate
      </button>
    </div>
  );
};

export default PercentageCalculator;
