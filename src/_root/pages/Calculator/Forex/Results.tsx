import React, { useContext } from "react";
import myContext from "@/context/data/myContext";

interface CryptoCalResultsProps {
  positionSize: number;
  moneyRisk: number;
}

const ForexCalResults: React.FC<CryptoCalResultsProps> = ({ positionSize, moneyRisk }) => {
  const context = useContext(myContext);
  const { mode }: { mode: string } = context;

  return (
    <div className={`md:flex md:flex-col grid grid-cols-2 mb-[5em] gap-3 text-start items-center justify-center`} style={{ color: mode === "dark" ? "white" : "" }}>
      <div className="">
        <div className="text-xs font-normal leading-[18px]">Money at risk</div>
        <input
          className="ml-[-13px] font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(moneyRisk * 1).toFixed(2)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Position Size (units)</div>
        <input
          className="ml-[-13px] font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize * 10002.777).toFixed(4)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Standard Lots</div>
        <input
          className="ml-[-13px] font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize / 10).toFixed(4)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Mini Lots</div>
        <input
          className="ml-[-13px] font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize * 1).toFixed(4)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Micro Lots</div>
        <input
          className="ml-[-13px] font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize * 10).toFixed(4)}
        />
      </div>
    </div>
  );
}

export default ForexCalResults;
