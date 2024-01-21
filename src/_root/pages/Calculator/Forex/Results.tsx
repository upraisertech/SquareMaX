import { FC, ReactElement } from "react";
import { IListsProps } from ".";


interface CryptoCalResultsProps {
  forex: IListsProps[];
  positionSize: any;
  moneyRisk: any;
}
  const ForexCalResults: FC<CryptoCalResultsProps> = ({positionSize, moneyRisk}): ReactElement => {

  return (
    <div className={`grid grid-cols-2 lg:grid-cols-1 mb-[5em] gap-3 text-start items-center justify-center`}>
      <div className="">
        <div className="text-xs font-normal leading-[18px]">Money at risk</div>
        <input
          className="font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(moneyRisk * 1).toFixed(2)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Position Size (units)</div>
        <input
          className="font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize * 10002.777).toFixed(4)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Standard Lots</div>
        <input
          className="font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize / 10).toFixed(4)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Mini Lots</div>
        <input
          className="font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize * 1).toFixed(4)}
        />
      </div>

      <div className="">
        <div className="text-xs font-normal leading-[18px]">Micro Lots</div>
        <input
          className="font-bold bg-transparent focus:outline-none border-none"
          type="text"
          readOnly
          value={(positionSize * 10).toFixed(4)}
        />
      </div>
    </div>
  );
}

export default ForexCalResults;
