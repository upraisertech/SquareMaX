import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

interface Coin {
  symbol: string;
  full_name: string;
  description: string;
  // ... other properties
}
const IncomeHistory = () => {
  // const apiUrl = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  // let navigate = useNavigate();

  const [coin, setCoin] = useState([]);

  // Define the API endpoint URL
  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.coinranking.com/v2/coins?vs_currency=usd&order=market_cap_desc&per_page=4&page=1&sparkline=false`
      );
      if (!response.ok) {
        setLoading(true);
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCoin(data.data.coins);
      console.log(data.data.coins);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredHistory, setFilteredHistory] = useState<Coin[]>(coin);
  
  useEffect(() => {
    setFilteredHistory(coin);
  }, []);
  
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilteredHistory(
      coin.filter(
        (coinItem) =>
          coinItem.symbol.toLowerCase().includes(value.toLowerCase()) ||
          coinItem.full_name.toLowerCase().includes(value.toLowerCase()) ||
          coinItem.description.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const getColor = (name: string) => {
    if (name === "Me") return { background: "#FDF9F6" };
    else return { color: "#545454", background: "bg-white_A200 " };
  };

  return (
    <div className="mb-9">
      <br />
      <br />
      <br />
      <div className="flex flex-row gap-10 items-center justify-between w-full">
        <div className="text-orange_A200 w-auto">
          History
        </div>
        <input
          onChange={(e) => handleSearch(e.target.value)}
          value={searchTerm}
          className="text-black text-[15px] border border-grey_80 p-3 rounded-md font-normal w-[20em] focus-within:ring-2 ring-orange_A200"
          type="text"
          placeholder="Enter a name, email or phone number"
        />
      </div>
      <br />
      <div className="overflow-x-auto ">
        <div className="flex flex-row mx-auto gap-[42px] items-center justify-center">
          <div className="bg-orange_A200 py-4 px-8 z-50 rounded-t-md w-[100%]">
            <div className="font-medium font-satoshivariable text-white_A700 grid grid-cols-4 gap-8">
              <h1>Name</h1>
              <h1>Type</h1>
              <h1>Amount</h1>
              <h1>Time</h1>
            </div>
          </div>
        </div>
        <div className="bg-[white] shadow-bs9 rounded-b-md overflow-y-auto h-[350px] pt-5 mt-[-5px]">
          {!loading ? (
            <>
              {filteredHistory.length > 0 ? (
                filteredHistory.map(({ id, name, Amount, Time, type }) => {
                  return (
                    <div key={id} style={{ ...getColor(name) }}>
                      <div className="py-4 px-[30px] font-medium font-satoshivariable text-black_A700 gap-8 grid grid-cols-4">
                        <h1>{name}</h1>
                        <span className="grid leading-[21px] grid-cols-5 md:grid-cols-5">
                          <h1>{type}</h1>
                        </span>
                        <h1>{Amount}</h1>
                        <h1>{Time}</h1>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="w-[full] h-[158px] flex-col justify-center items-center gap-6 inline-flex">
                  <div className="text-zinc-400 text-xs font-normal tracking-tight">
                    Account not found
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="w-full p-1 mt-12 flex-col justify-center items-center gap-6 inline-flex">
              <img className="" src="/social-03.svg" />
              <div className="text-zinc-400 text-xs font-normal">
                No Transactions yet
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncomeHistory;