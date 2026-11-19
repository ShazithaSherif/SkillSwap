import React, { useState } from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (page) => {
    setMenuOpen(false);
    setCurrentPage(page);
  };

  const goToHowItWorks = () => {
    setMenuOpen(false);
    setCurrentPage('home');
    setTimeout(() => {
      const section = document.getElementById('how-it-works');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 650);
  };

  return (
    <nav className="navbar">
      <div className="nav-top-row">
        {/* Custom SkillSwap Logo */}
        <div className="logo" onClick={() => handleNav('home')}>
          <img
            src="/logo.jpg"
            alt="SkillSwap Logo"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              objectFit: 'cover',
              border: '2px solid #facc15'
            }}
          />
          Skill<span>Swap</span>
        </div>

        {/* Mobile Hamburger Button (Hidden on Laptop, Shown on Phone) */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Navigation Links */}
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <button
          className={`nav-link ${currentPage === 'match' ? 'active' : ''}`}
          onClick={() => handleNav('match')}
        >
          Find a Swap
        </button>

        <button className="nav-link" onClick={goToHowItWorks}>
          How it Works
        </button>

        <button
          className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => handleNav('dashboard')}
        >
          My Swaps
        </button>

        <button
          className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => handleNav('about')}
        >
          Creator
        </button>

        <button
          className="btn-green"
          onClick={() => handleNav('profile')}
        >
          Join Free
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
