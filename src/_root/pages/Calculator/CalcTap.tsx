import React, { useState } from "react";
import Forex from "./Forex/index";
import Crypto from "./Crypto/index";
import Percentage from "./Percentage/index";

const SettingsHeader = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [sideNav, setSideNav] = useState(false);
  const [more, setMore] = useState(false);

  const handleTabClick = (tabNumber: React.SetStateAction<number>) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="">
      <div className="flex border-b gap-5 mb-12 my-4 mx-auto items-start justify-between">
        <button
          className={`py-2 text-[17px] h-[40px] focus:outline-none w-[60%]
          ${
            activeTab === 1
              ? "border-primary-A1 border-t-none border-b-[4px] "
              : ""
          }`}
          onClick={() => handleTabClick(1)}>
          <div className="flex flex-col gap-0.5 items-center justify-center px-3">
            <div className="text-[17px] w-auto">Percentage</div>
          </div>
        </button>

        <div className="mx-auto items-center justify-center w-[60%]">
          <div
            onClick={() => setSideNav(!sideNav)}
            tabIndex={0}
            role="button"
            className={`py-2 text-[17px] h-[40px] focus:outline-none text-center justify-center
            ${
              activeTab === 2 || activeTab === 3
                ? "border-primary-A1 border-t-none border-b-[4px]"
                : ""
            }`}>
            PositionSize
          </div>
          {sideNav && (
            <ul className="z-[1] gap-3 bg-white md:ml-[5em] absolute rounded-md w-32">
              <button
                className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                  activeTab === 2 ? "text-primary-A2" : "text-black"
                }`}
                onClick={() => {handleTabClick(2); setSideNav(!sideNav)}}>
                <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                  <div className="text-[17px] w-auto">Forex</div>
                </div>
              </button>

              <button
                className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                  activeTab === 3 ? "text-primary-A2" : "text-black"
                }`}
                onClick={() => {handleTabClick(3); setSideNav(!sideNav)}}>
                <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                  <div className="text-[17px] w-auto">Crypto</div>
                </div>
              </button>
            </ul>
          )}
        </div>

        <div className="dropdown dropdown-end dropdown-bottom pr-5 w-[60%]">
          <div
           onClick={() => setMore(!more)}
            tabIndex={0}
            role="button"
            className={`py-2 text-[17px] h-[40px] focus:outline-none text-center
    ${
      activeTab === 4 || activeTab === 5
        ? "border-primary-A1 border-t-none border-b-[4px]"
        : ""
    }`}>
            More...
          </div>
          {more && (
            <ul className="shadow-3 absolute md:ml-[5em] gap-3 bg-white rounded-md w-32">
              <button
                className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                  activeTab === 4 ? "text-primary-A2" : "text-black"
                }`}
                onClick={() => {handleTabClick(4); setMore(!more)}}>
                <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                  <div className="text-[17px] w-auto">Item 1</div>
                </div>
              </button>

              <button
                className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                  activeTab === 5 ? "text-primary-A2" : "text-black"
                }`}
                onClick={() => {handleTabClick(5); setMore(!more)}}>
                <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                  <div className="text-[17px] w-auto">Item 2</div>
                </div>
              </button>
            </ul>
          )}
        </div>
      </div>

      {/* Content for each tab */}
      {activeTab === 1 && (
        <div>
          <Percentage />
        </div>
      )}
      {activeTab === 2 && (
        <div>
          <Forex positionSize={0} moneyRisk={0} forexLists={0}  />
        </div>
      )}
      {activeTab === 3 && (
        <div>
          <Crypto />
        </div>
      )}
      {activeTab === 4 && (
        <div>
          <Crypto />
        </div>
      )}
      {activeTab === 5 && (
        <div>
          <Crypto />
        </div>
      )}
    </div>
  );
};

export default SettingsHeader;
