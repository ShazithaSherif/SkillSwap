import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  const goToHowItWorks = () => {
    setCurrentPage('home');
    setTimeout(() => {
      const section = document.getElementById('how-it-works');
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }, 650);
  };

  return (
    <nav className="navbar">
      {/* Custom SkillSwap Logo (logo.jpg from public folder) */}
      <div className="logo" onClick={() => setCurrentPage('home')}>
        <img
          src="/logo.jpg"
          alt="SkillSwap Logo"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '10px',
            objectFit: 'cover',
            border: '2px solid #facc15'
          }}
        />
        Skill<span>Swap</span>
      </div>

      {/* Navigation Buttons */}
      <div className="nav-links">
        <button
          className={`nav-link ${currentPage === 'match' ? 'active' : ''}`}
          onClick={() => setCurrentPage('match')}
        >
          Find a Swap
        </button>

        <button className="nav-link" onClick={goToHowItWorks}>
          How it Works
        </button>

        <button
          className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          My Swaps
        </button>

        <button
          className={`nav-link ${currentPage === 'about' ? 'active' : ''}`}
          onClick={() => setCurrentPage('about')}
        >
          Creator
        </button>

        <button
          className="btn-green"
          onClick={() => setCurrentPage('profile')}
        >
          Join Free
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
