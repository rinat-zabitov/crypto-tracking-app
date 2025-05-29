import { createContext, useEffect, useState } from 'react';

export const CoinContext = createContext();

export const CoinContextProvider = ({ children }) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    currency: 'usd',
    symbol: '$',
  });

  const fetchAllCoin = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'x-cg-demo-api-key': 'CG-3TBfcQJNmwG5b7PdS2rsH4ik',
        },
      };

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        options
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAllCoins(data);
    } catch (err) {
      console.error('Error fetching coins:', err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  return (
    <CoinContext.Provider value={{ allCoins, currency, setCurrency }}>
      {children}
    </CoinContext.Provider>
  );
};
