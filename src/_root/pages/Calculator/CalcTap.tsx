import React, { useContext, useState } from "react";
import Forex from "./Forex/index";
import Crypto from "./Crypto/index";
import Percentage from "./Percentage/index";
import myContext from "@/context/data/myContext";

const SettingsHeader = () => {
  const context = useContext(myContext);
  const { mode } = context;
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber: React.SetStateAction<number>) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="w-full mt-[-6em]">
      <div
        className="flex border-b gap-5 mb-2 mx-auto items-center justify-between"
        style={{ color: mode === "dark" ? "white" : "" }}
      >
        <button
          className={`py-2 text-[17px] h-[40px] focus:outline-none w-full
          ${
            mode === "dark"
              ? "border-primary-A1 text-primary-A2"
              : "border-primary-A2 text-primary-A1"
          } 
          ${
            activeTab === 1
              ? "border-primary-A1 border-t-none border-b-[4px] "
              : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          <div className="flex flex-col gap-0.5 items-center justify-center px-3">
            <div
              className="text-[17px] w-auto"
            >
              Percentage
            </div>
          </div>
        </button>

        <div className="dropdown dropdown-end dropdown-bottom w-full">
          <div
            tabIndex={0}
            role="button"
            className={`py-2 text-[17px] h-[40px] focus:outline-none
            ${
              mode === "dark"
                ? "border-primary-A1 text-primary-A2"
                : "border-primary-A2 text-primary-A1"
            } 
            ${
              activeTab === 2 || activeTab === 3
                ? "border-t-none border-b-[4px]"
                : ""
            }`}
          >
            PositionSize
          </div>
          <ul className="shadow menu dropdown-content z-[1] gap-3 bg-white rounded-box w-32">
            <button
              className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                activeTab === 2 ? "text-primary-A2" : "text-black"
              }`}
              onClick={() => handleTabClick(2)}
            >
              <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                <div
                  className="text-[17px] w-auto"
                >
                  Forex
                </div>
              </div>
            </button>

            <button
              className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                activeTab === 3 ? "text-primary-A2" : "text-black"
              }`}
              onClick={() => handleTabClick(3)}
            >
              <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                <div
                  className="text-[17px] w-auto"
                >
                  Crypto
                </div>
              </div>
            </button>
          </ul>
        </div>

        <div className="dropdown dropdown-end dropdown-bottom pr-5">
          <div
            tabIndex={0}
            role="button"
            className={`py-2 text-[17px] h-[40px] focus:outline-none
    ${
      mode === "dark"
        ? "border-primary-A1 text-primary-A2"
        : "border-primary-A2 text-primary-A1"
    } 
    ${
      activeTab === 2 || activeTab === 3 ? "border-t-none border-b-[4px]" : ""
    }`}
          >
            More...
          </div>
          <ul className="shadow menu dropdown-content z-[1] gap-3 bg-white rounded-box w-32">
            <button
              className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                activeTab === 2 ? "text-primary-A2" : "text-black"
              }`}
              onClick={() => handleTabClick(2)}
            >
              <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                <div
                  className="text-[17px] w-auto"
                >
                  Item 1
                </div>
              </div>
            </button>

            <button
              className={`py-2 text-[17px] h-[40px] focus:outline-none ${
                activeTab === 3 ? "text-primary-A2" : "text-black"
              }`}
              onClick={() => handleTabClick(3)}
            >
              <div className="flex flex-col gap-0.5 items-center justify-center px-3">
                <div
                  className="text-[17px] w-auto"
                >
                  Item 2
                </div>
              </div>
            </button>
          </ul>
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
          <Forex />
        </div>
      )}
      {activeTab === 3 && (
        <div>
          <Crypto />
        </div>
      )}
    </div>
  );
};

export default SettingsHeader;
