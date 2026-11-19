import React from 'react';
import { liveSwaps } from '../data';
import './Home.css';

function Home({ setCurrentPage }) {
  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="hero-left">
          <span className="hero-badge">100% Free Peer-to-Peer Learning</span>
          <h1>
            You Know Something. <span>Someone Needs It.</span>
          </h1>
          <p>
            Skip expensive courses. Share what you've mastered, unlock what you're curious about!
          </p>
          <div className="hero-buttons">
            <button className="btn-green" onClick={() => setCurrentPage('profile')}>
              Start Swapping - It's Free
            </button>
            <button className="btn-outline" onClick={() => setCurrentPage('match')}>
              Find Your Match
            </button>
          </div>
        </div>

        <div className="hero-right">
          <div className="swap-person-card">
            <div className="concept-icon-circle">🎓</div>
            <h4>Your Skill</h4>
            <span className="skill-tag">Teach 30 Mins</span>
          </div>

          <div className="middle-swap-circle">⇄</div>

          <div className="swap-person-card">
            <div className="concept-icon-circle">🚀</div>
            <h4>New Skill</h4>
            <span className="skill-tag">Learn 30 Mins</span>
          </div>
        </div>
      </section>

      {/* 2. HOW SWAP WORKS */}
      <section id="how-it-works" className="section">
        <h2 className="section-title">How SkillSwap Works</h2>
        <p className="section-sub">Three simple steps to start learning for free today.</p>
        <div className="steps-container">
          <div className="step-box">
            <div className="step-number">1</div>
            <h3>Tell 2 Things</h3>
            <p>List 1 skill you can teach and 1 skill you want to learn.</p>
          </div>
          <div className="step-box">
            <div className="step-number">2</div>
            <h3>Find Perfect Match</h3>
            <p>Connect with someone who wants your skill and teaches yours.</p>
          </div>
          <div className="step-box">
            <div className="step-number">3</div>
            <h3>Learn Together</h3>
            <p>Hop into a 60-min Swap Room: 30 mins you teach, 30 mins you learn.</p>
          </div>
        </div>
      </section>

      {/* 3. LIVE SWAP WALL */}
      <section className="section" style={{ background: '#ffffff' }}>
        <h2 className="section-title">Live Swap Wall</h2>
        <p className="section-sub">Real peers swapping skills right now—join in!</p>
        <div className="grid-4">
          {liveSwaps.map((item) => (
            <div className="live-card" key={item.id}>
              <span className="live-badge">● {item.status}</span>
              <p className="live-pair">
                {item.user1} ({item.skill1}) ⇄ {item.user2} ({item.skill2})
              </p>
              <button
                className="btn-green"
                style={{ width: '100%', padding: '10px' }}
                onClick={() => setCurrentPage('match')}
              >
                Request Swap
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MISSION QUOTE */}
      <section className="quote-banner">
        <h2>"Education Should Be Free. Because Skill Belongs To Everyone."</h2>
      </section>

      {/* 5. FINAL CTA */}
      <section className="final-cta">
        <h2>Ready To Teach Your First Skill?</h2>
        <button className="btn-green" onClick={() => setCurrentPage('profile')}>
          Create My Free Profile
        </button>
      </section>
    </div>
  );
}

export default Home;
