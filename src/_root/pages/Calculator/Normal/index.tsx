import React, { useState, ChangeEvent, useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

interface Props {}

const PercentageCalculator: React.FC<Props> = () => {
  const { mode } = useUserContext();
  const [value, setValue] = useState<string>("");
  const [percentage, setPercentage] = useState<string>("");
  const [result, setResult] = useState<string>("0");

  const numberWithCommas = (x: string): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const calculateHandle = () => {
    const val = parseFloat(value.replace(/,/g, ""));
    const percent = parseFloat(percentage.replace(/,/g, ""));

    if (!isNaN(val) && !isNaN(percent)) {
      const calculatedResult = val - percent;
      setResult(numberWithCommas(calculatedResult.toFixed(3))); // Format result with commas and keep 2 decimal places
    } else {
      setResult("0");
    }
  };

  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^\d.]/g, ""); // Allowing only digits and a dot for decimal
    setValue(input);
  };

  const handlePercentageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^\d.]/g, ""); // Allowing only digits and a dot for decimal
    setPercentage(input);
  };

  const handleButtonClick = (buttonValue: string) => {
    if (buttonValue === "C") {
      // Clear values
      setValue("");
      setPercentage("");
    } else if (buttonValue === "←") {
      // Backspace
      setValue(value.slice(0, -1));
    } else {
      // Append digit or dot to the appropriate input
      if (isNaN(parseFloat(percentage))) {
        setValue((prev) => prev + buttonValue);
      } else {
        setPercentage((prev) => prev + buttonValue);
      }
    }
  };

  const renderCalculatorButtons = () => {
    const buttons = [
      "7", "8", "9", "/",
      "4", "5", "6", "*",
      "1", "2", "3", "-",
      "0", ".", "=", "+",
      "C", "←"
    ];

    return buttons.map((button) => (
      <button
        key={button}
        className="calculator-button"
        onClick={() => handleButtonClick(button)}
      >
        {button}
      </button>
    ));
  };

  const loadUserInputFromLocalStorage = () => {
    const savedValue = localStorage.getItem("value1");
    const savedPercentage = localStorage.getItem("value2");
    const savedResult = localStorage.getItem("results");

    if (savedValue) {
      setValue(savedValue);
    }

    if (savedPercentage) {
      setPercentage(savedPercentage);
    }

    if (savedResult) {
      setResult(savedResult);
    }
  };

  useEffect(() => {
    loadUserInputFromLocalStorage();
  }, []);

  return (
    <div
      className={`flex flex-col p-3 md:w-[550px] mx-auto items-center justify-center ${
        mode === "dark" ? "white" : ""
      }`}
    >
      <div className="text-2xl text-left font-bold mb-4 w-full">
        Percentage Calculator
      </div>

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

      <div className="calculator-buttons">
        {renderCalculatorButtons()}
      </div>

      <div className="my-4 md:my-8 p-3 border-1 border-black bg-white text-black rounded-md w-full">
        <p>
          Result: <span className="font-bold">{result}</span>
        </p>
      </div>

      <button
        className="px-12 py-3 mb-[16em] text-white rounded-full bg-primary-A1 w-full"
        onClick={calculateHandle}
      >
        Calculate
      </button>
    </div>
  );
};

export default PercentageCalculator;
