import React, { useState } from 'react';

function AboutCreator({ setCurrentPage }) {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [visitorMsg, setVisitorMsg] = useState("");
  const [imgError, setImgError] = useState(false);

  const handleSendNote = (e) => {
    e.preventDefault();
    if (!visitorMsg.trim()) return;
    setFeedbackSent(true);
    setVisitorMsg("");
  };

  const techSkills = [
    "React.js & Vite",
    "JavaScript (ES6+)",
    "HTML5 & Modern CSS3",
    "Python & AI/RAG",
    "UI/UX Design",
    "Git & GitHub"
  ];

  const milestones = [
    {
      icon: "🏅",
      title: "6th University Rank & Gold Medalist",
      desc: "Secured #6th Rank at Periyar University in B.Sc. Computer Science — the sole rank holder from the department."
    },
    {
      icon: "🌟",
      title: "Best Outgoing Student (UG)",
      desc: "Recognized as the Best Outgoing Student in Undergraduate studies for overall academic, leadership, and technical excellence."
    },
    {
      icon: "👑",
      title: "Chairperson — Gateway 2026",
      desc: "Coordinated 8 departments for Gateway 2026, our National Level Technical Symposium."
    },
    {
      icon: "🚀",
      title: "2nd Place — Smart India Hackathon (Internal)",
      desc: "Ranked 2nd out of 170 teams at PSG College of Arts and Science for building practical, real-world tech solutions."
    },
    {
      icon: "🏆",
      title: "National Conference Best Paper Award",
      desc: "Recognized at an AICTE-sponsored National Conference for research on AI-powered sustainable solutions."
    },
    {
      icon: "🎤",
      title: "Learning by Teaching Advocate",
      desc: "Led live hands-on coding seminars—turning complex web concepts into interactive peer learning sessions."
    }
  ];

  return (
    <div style={{ padding: "36px 6%", maxWidth: "1100px", margin: "0 auto" }}>
      {/* 1. SUPER FOUNDER SPOTLIGHT CARD */}
      <div
        className="founder-hero-card"
        style={{
          background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 60%, #7c3aed 100%)",
          borderRadius: "28px",
          padding: "42px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "36px",
          flexWrap: "wrap",
          boxShadow: "0 20px 50px rgba(109, 40, 217, 0.28)",
          border: "3px solid #facc15",
          marginBottom: "40px"
        }}
      >
        {/* Left: Framed Founder Photo */}
        <div style={{ flex: "0 0 auto", margin: "0 auto", textAlign: "center" }}>
          <div
            style={{
              width: "195px",
              height: "195px",
              borderRadius: "28px",
              padding: "6px",
              background: "linear-gradient(135deg, #facc15, #fde047, #a78bfa)",
              boxShadow: "0 14px 35px rgba(0, 0, 0, 0.35)",
              transform: "rotate(-2deg)",
              margin: "0 auto"
            }}
          >
            {!imgError ? (
              <img
                src="/shazitha.jpeg"
                alt="Shazitha Sherif"
                onError={() => setImgError(true)}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "22px",
                  objectFit: "cover",
                  objectPosition: "center top",
                  background: "#1e1b4b"
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "22px",
                  background: "#1e1b4b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "3.5rem",
                  fontWeight: "900",
                  color: "#facc15"
                }}
              >
                SS
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: "14px",
              background: "#facc15",
              color: "#1e1b4b",
              padding: "5px 14px",
              borderRadius: "20px",
              fontSize: "0.8rem",
              fontWeight: "800",
              display: "inline-block"
            }}
          >
            ✨ Founder &amp; Developer
          </div>
        </div>
        {/* Right: Founder Bio & Direct Links */}
        <div className="founder-bio-box" style={{ flex: 1, minWidth: "280px" }}>
          <span
            style={{
              background: "rgba(250, 204, 21, 0.18)",
              color: "#facc15",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "0.85rem",
              fontWeight: "700",
              display: "inline-block"
            }}
          >
            📍 Salem, Tamil Nadu 
          </span>

          <h1 style={{ fontSize: "2.6rem", margin: "12px 0 6px", lineHeight: "1.15" }}>
            Shazitha <span style={{ color: "#facc15" }}>Sherif</span>
          </h1>
          <p style={{ color: "#ede9fe", fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px" }}>
            Aspiring Full Stack Developer • Gold Medalist • Peer-Learning Builder
          </p>
          <p style={{ color: "#ddd6fe", lineHeight: "1.7", fontSize: "0.98rem", marginBottom: "24px" }}>
            &ldquo;I built <strong>SkillSwap</strong> with one belief: knowledge multiplies when shared. Whether you&apos;re mastering Python, React, UI Design, or Public Speaking, nobody should be held back by expensive paywalls. Everyone has something valuable to teach—and something exciting to learn.&rdquo;
          </p>

          {/* Direct Contact & Social Pills */}
          <div className="founder-social-row" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="mailto:shazithasherif@gmail.com" style={socialBtnGold}>
              ✉️ shazithasherif@gmail.com
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              style={socialBtnGlass}
            >
              💼 LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              style={socialBtnGlass}
            >
              💻 GitHub
            </a>
          </div>
        </div>
      </div>

      {/* 2. WHY I BUILT SKILLSWAP + TECH STACK */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        <div style={whiteCard}>
          <h3 style={{ color: "#4c1d95", fontSize: "1.35rem", marginBottom: "12px" }}>
            💡 The Story Behind SkillSwap
          </h3>
          <p style={{ color: "#475569", lineHeight: "1.7", marginBottom: "12px" }}>
            During college hackathons, seminars, and peer study sessions, I noticed something powerful: the best learning happens when students teach each other directly—without fear, hierarchy, or costly subscriptions.
          </p>
          <p style={{ color: "#475569", lineHeight: "1.7" }}>
            <strong>SkillSwap</strong> turns that exact spirit into a pure frontend experience: 30 minutes of teaching, 30 minutes of learning, gamified Swap Coins, and instant peer certificates.
          </p>
        </div>

        <div style={whiteCard}>
          <h3 style={{ color: "#4c1d95", fontSize: "1.35rem", marginBottom: "12px" }}>
            🛠️ Developer Stack &amp; Craft
          </h3>
          <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "16px" }}>
            Technologies I work with to turn real-world ideas into clean, interactive products:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "20px" }}>
            {techSkills.map((skill) => (
              <span
                key={skill}
                style={{
                  background: "#f5f3ff",
                  color: "#6d28d9",
                  border: "1.5px solid #ddd6fe",
                  padding: "7px 14px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  fontSize: "0.88rem"
                }}
              >
                {skill}
              </span>
            ))}
          </div>
          <button className="btn-green" onClick={() => setCurrentPage('match')}>
            Explore SkillSwap Matches ⇄
          </button>
        </div>
      </div>
      {/* 3. ACHIEVEMENTS & MILESTONES */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ textAlign: "center", color: "#1e1b4b", fontSize: "1.9rem", marginBottom: "8px" }}>
          Milestones &amp; Recognition
        </h2>
        <p style={{ textAlign: "center", color: "#64748b", marginBottom: "28px" }}>
          Academic excellence, hackathons, and community leadership
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {milestones.map((item, idx) => (
            <div key={idx} style={{ ...whiteCard, borderTop: "4px solid #facc15" }}>
              <div style={{ fontSize: "2.2rem", marginBottom: "10px" }}>{item.icon}</div>
              <h4 style={{ color: "#1e1b4b", fontSize: "1.05rem", marginBottom: "8px" }}>{item.title}</h4>
              <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: "1.6" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CONNECT / SAY HELLO CARD */}
      <div
        style={{
          background: "#fff",
          padding: "32px",
          borderRadius: "22px",
          boxShadow: "0 8px 25px rgba(109, 40, 217, 0.08)",
          borderTop: "5px solid #6d28d9",
          textAlign: "center"
        }}
      >
        <h3 style={{ color: "#1e1b4b", fontSize: "1.5rem", marginBottom: "8px" }}>
          🤝 Let&apos;s Connect &amp; Collaborate
        </h3>
        <p style={{ color: "#64748b", marginBottom: "20px" }}>
          Have feedback on SkillSwap or want to collaborate on a project? Drop a quick note below!
        </p>

        {feedbackSent ? (
          <div style={{ background: "#fef9c3", color: "#854d0e", padding: "14px 20px", borderRadius: "12px", fontWeight: "700", display: "inline-block" }}>
            🎉 Thank you for reaching out! Feel free to connect directly on LinkedIn or Email too.
          </div>
        ) : (
          <form onSubmit={handleSendNote} style={{ display: "flex", gap: "12px", maxWidth: "560px", margin: "0 auto", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Write a message for Shazitha..."
              value={visitorMsg}
              onChange={(e) => setVisitorMsg(e.target.value)}
              style={{ flex: 1, minWidth: "220px", padding: "12px 16px", borderRadius: "10px", border: "1.5px solid #ddd6fe", fontSize: "0.95rem", outline: "none" }}
            />
            <button type="submit" className="btn-green">
              Send Note ✉️
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const whiteCard = {
  background: "#fff",
  padding: "28px",
  borderRadius: "20px",
  boxShadow: "0 8px 24px rgba(109, 40, 217, 0.07)",
  borderTop: "4px solid #6d28d9"
};

const socialBtnGold = {
  background: "#facc15",
  color: "#1e1b4b",
  padding: "10px 18px",
  borderRadius: "10px",
  fontWeight: "800",
  textDecoration: "none",
  fontSize: "0.92rem",
  display: "inline-block"
};

const socialBtnGlass = {
  background: "rgba(255, 255, 255, 0.16)",
  color: "#fff",
  border: "1.5px solid rgba(255, 255, 255, 0.4)",
  padding: "10px 18px",
  borderRadius: "10px",
  fontWeight: "700",
  textDecoration: "none",
  fontSize: "0.92rem",
  display: "inline-block"
};

export default AboutCreator;
