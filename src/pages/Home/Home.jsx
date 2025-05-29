import './Home.css';
import { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
export const Home = () => {
  const { allCoins, currency } = useContext(CoinContext);
  const [dispalyCoin, setDisplayCoin] = useState([]);
  const [coinValue, setCoinValue] = useState('');

  const handleChange = e => {
    setCoinValue(e.target.value);
    if (e.target.value === '') {
      setDisplayCoin(allCoins);
    }
  };

  const handleSearch = async e => {
    e.preventDefault();

    const coins = await allCoins.filter(coin =>
      coin.name.toLowerCase().includes(coinValue.toLowerCase())
    );
    setDisplayCoin(coins);
  };

  useEffect(() => {
    setDisplayCoin(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypro Marketplace
        </h1>
        <p>
          Welcome to the worlds largest crypto marketplace, where you can buy and sell
          cryptocurrencies.
        </p>
        <form action="#" onSubmit={handleSearch}>
          <input
            list="coinlist"
            required
            type="text"
            placeholder="Search for crypto"
            value={coinValue}
            onChange={handleChange}
          />

          <datalist id="coinlist">
            {allCoins.map(coin => (
              <option key={coin.id} value={coin.name} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: 'center' }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {dispalyCoin &&
          dispalyCoin.slice(0, 10).map(coin => (
            <Link to={'/coin/' + coin.id} className="table-layout" key={coin.id}>
              <p>{coin.market_cap_rank}</p>
              <div>
                <img src={coin.image} alt={coin.name} />
                <span>
                  {coin.name} - {coin.symbol}
                </span>
              </div>
              <p>
                {currency.symbol}
                {coin.current_price.toFixed(2)}
              </p>
              <p
                style={{
                  textAlign: 'center',
                  color: coin.price_change_percentage_24h > 0 ? 'green' : 'red',
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
              <p className="market-cap">${coin.market_cap.toLocaleString()}</p>
            </Link>
          ))}
      </div>
    </div>
  );
};
