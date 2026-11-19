import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CreateProfile from './pages/CreateProfile';
import FindMatch from './pages/FindMatch';
import Dashboard from './pages/Dashboard';
import SwapRoom from './pages/SwapRoom';
import AboutCreator from './pages/AboutCreator';
import './pages/Home.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showBoom, setShowBoom] = useState(true);
  const [showPageLoader, setShowPageLoader] = useState(false);

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('skillswap_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activePeer, setActivePeer] = useState(null);

  // Initial opening Boom Splash (plays once when website opens)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBoom(false);
    }, 2900);
    return () => clearTimeout(timer);
  }, []);

  // Falling Knowledge Rain + Letter-by-Letter "SkillSwap" Loader for all menu clicks
  const navigateWithRainLoader = (page) => {
    if (page === currentPage) return;
    setShowPageLoader(true);
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      setCurrentPage(page);
    }, 550);

    setTimeout(() => {
      setShowPageLoader(false);
    }, 1150);
  };

  const handleStartSwap = (peer) => {
    setActivePeer(peer);
    navigateWithRainLoader('room');
  };

  const brandLetters = ['S', 'k', 'i', 'l', 'l', 'S', 'w', 'a', 'p'];
  const fallingIcons = [
    { icon: '📚', left: '8%', delay: '0s' },
    { icon: '🎓', left: '20%', delay: '0.12s' },
    { icon: '💡', left: '33%', delay: '0.05s' },
    { icon: '🧠', left: '47%', delay: '0.18s' },
    { icon: '⚡', left: '60%', delay: '0.08s' },
    { icon: '🚀', left: '74%', delay: '0.15s' },
    { icon: '✨', left: '88%', delay: '0.04s' },
    { icon: '📖', left: '14%', delay: '0.25s' },
    { icon: '🎯', left: '53%', delay: '0.22s' },
    { icon: '🌟', left: '81%', delay: '0.28s' }
  ];

  return (
    <div>
      {/* 1. OPENING BOOM SPLASH */}
      {showBoom && (
        <div className="boom-overlay">
          <div className="boom-floating-icons">
            <span className="float-badge" style={{ top: '12%', left: '10%' }}>📚</span>
            <span className="float-badge" style={{ top: '18%', right: '14%' }}>💡</span>
            <span className="float-badge" style={{ bottom: '18%', left: '15%' }}>🧠</span>
            <span className="float-badge" style={{ bottom: '14%', right: '12%' }}>🎓</span>
            <span className="float-badge" style={{ top: '48%', left: '6%' }}>⚡</span>
            <span className="float-badge" style={{ top: '45%', right: '7%' }}>🚀</span>
          </div>

          <div className="boom-brand">
            Skill<span>Swap</span>
          </div>

          <div className="boom-stage">
            <div className="boom-concept-card card-left">
              <div className="concept-icon-circle">🎓</div>
              <h4>Teach What You Know</h4>
              <span className="boom-skill-pill">Share Your Skill</span>
            </div>

            <div className="boom-icon">⇄</div>

            <div className="boom-concept-card card-right">
              <div className="concept-icon-circle">💡</div>
              <h4>Learn What You Love</h4>
              <span className="boom-skill-pill">100% Free</span>
            </div>
          </div>

          <p className="boom-tagline">Give a skill, take a skill — grow together, zero bill!</p>
        </div>
      )}

      {/* 2. FALLING KNOWLEDGE RAIN + LETTER-BY-LETTER SKILLSWAP LOADER */}
      {showPageLoader && (
        <div className="rain-loader-overlay">
          {fallingIcons.map((item, idx) => (
            <span
              key={idx}
              className="rain-item"
              style={{ left: item.left, animationDelay: item.delay }}
            >
              {item.icon}
            </span>
          ))}

          <div className="word-drop-container">
            {brandLetters.map((char, idx) => (
              <span
                key={idx}
                className={`drop-letter ${idx >= 5 ? 'gold' : ''}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <Navbar currentPage={currentPage} setCurrentPage={navigateWithRainLoader} />

      {/* Page Switcher */}
      {currentPage === 'home' && (
        <Home setCurrentPage={navigateWithRainLoader} />
      )}

      {currentPage === 'profile' && (
        <CreateProfile
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          setCurrentPage={navigateWithRainLoader}
        />
      )}

      {currentPage === 'match' && (
        <FindMatch
          userProfile={userProfile}
          onStartSwap={handleStartSwap}
        />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard
          userProfile={userProfile}
          activePeer={activePeer}
          setCurrentPage={navigateWithRainLoader}
        />
      )}

      {currentPage === 'room' && (
        <SwapRoom
          userProfile={userProfile}
          setUserProfile={setUserProfile}
          activePeer={activePeer}
          setCurrentPage={navigateWithRainLoader}
        />
      )}

      {currentPage === 'about' && (
        <AboutCreator setCurrentPage={navigateWithRainLoader} />
      )}

      <footer style={{ background: '#1e1b4b', color: '#ede9fe', textAlign: 'center', padding: '22px', fontSize: '1.05rem', fontWeight: '600' }}>
        <p>
          <strong style={{ color: '#facc15' }}>SkillSwap</strong> ♾️ Everyone Can Teach &amp; Learn
        </p>
      </footer>
    </div>
  );
}

export default App;
