import React from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <Link to="/" className="nav-logo">
            🌤️ Weather Forecast       
          </Link>
          
          <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
            <Link to="/" className="nav-item" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/search" className="nav-item" onClick={() => setIsOpen(false)}>
              Search
            </Link>
            <Link to="/forecast" className="nav-item" onClick={() => setIsOpen(false)}>
              Forecast
            </Link>
            <Link to="/history" className="nav-item" onClick={() => setIsOpen(false)}>
              History
            </Link>
            <Link to="/settings" className="nav-item" onClick={() => setIsOpen(false)}>
              Settings
            </Link>
          </div>

          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
