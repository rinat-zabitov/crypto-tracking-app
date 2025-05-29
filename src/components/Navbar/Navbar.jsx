import './Navbar.css';
import logo from '../../assets/logo.png';
import arrow_icon from '../../assets/arrow_icon.png';
import { useContext } from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';
export const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const handleCurrencyChange = e => {
    switch (e.target.value) {
      case 'usd':
        setCurrency({ currency: 'usd', symbol: '$' });
        break;

      case 'eur':
        setCurrency({ currency: 'eur', symbol: '€' });
        break;

      case 'inr':
        setCurrency({ currency: 'inr', symbol: '₹' });
        break;

      default:
        setCurrency({ currency: 'usd', symbol: '$' });
        break;
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="Logo" />
      </Link>
      <ul className="nav-list">
        <Link to={'/'} className="nav-list-item">
          Home
        </Link>
        <li className="nav-list-item">Features</li>
        <li className="nav-list-item">Pricing</li>
        <li className="nav-list-item">Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={handleCurrencyChange}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign up <img src={arrow_icon} alt="Arrow" />
        </button>
      </div>
    </nav>
  );
};
