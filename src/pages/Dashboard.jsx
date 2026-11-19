import React from 'react';
import { mockUsers } from '../data';

function Dashboard({ userProfile, activePeer, setCurrentPage }) {
  const userName = userProfile?.name || "Guest Swapper";
  const myTeach = userProfile?.teaches || "Python";
  const myLearn = userProfile?.wantsToLearn || "React";
  const coins = userProfile?.swapCoins || 50;
  const completed = userProfile?.completedSwaps || 1;

  let level = "🌱 Beginner Swapper";
  let progress = 35;
  if (completed >= 5) {
    level = "👑 Master Swapper";
    progress = 100;
  } else if (completed >= 2) {
    level = "🚀 Pro Swapper";
    progress = 70;
  }

  const topSwappers = [...mockUsers]
    .sort((a, b) => b.swapScore - a.swapScore)
    .slice(0, 5);

  return (
    <div style={{ padding: "50px 8%" }}>
      {/* Top Violet & Yellow Stats Banner */}
      <div style={{ background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)", color: "#fff", padding: "30px", borderRadius: "20px", marginBottom: "30px", boxShadow: "0 10px 28px rgba(109, 40, 217, 0.25)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <span style={{ background: "rgba(250, 204, 21, 0.22)", color: "#facc15", padding: "6px 14px", borderRadius: "20px", fontWeight: "800", fontSize: "0.85rem" }}>
              {level}
            </span>
            <h2 style={{ marginTop: "10px", fontSize: "1.9rem" }}>Welcome back, {userName}!</h2>
            <p style={{ color: "#ede9fe" }}>Swaps Completed: {completed} • Keep sharing skills to reach Master Swapper!</p>
          </div>

          <div style={{ background: "rgba(255,255,255,0.12)", padding: "16px 26px", borderRadius: "16px", border: "2px solid #facc15", textAlign: "center" }}>
            <div style={{ fontSize: "0.85rem", color: "#ede9fe" }}>My Swap Coins</div>
            <div style={{ fontSize: "2rem", fontWeight: "800", color: "#facc15" }}>🪙 {coins}</div>
          </div>
        </div>

        {/* Golden Yellow Progress Bar */}
        <div style={{ marginTop: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#ede9fe", marginBottom: "6px", fontWeight: "600" }}>
            <span>Beginner Swapper</span>
            <span>Pro Swapper</span>
            <span>Master Swapper</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.2)", height: "12px", borderRadius: "10px", overflow: "hidden" }}>
            <div style={{ width: `${progress}%`, background: "#facc15", height: "100%", transition: "width 0.5s" }} />
          </div>
        </div>
      </div>

      {/* Teaching & Learning Swaps */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "40px" }}>
        <div style={boxStyle}>
          <h3 style={{ marginBottom: "14px", color: "#6d28d9" }}>🎓 My Teaching Swaps</h3>
          <div style={swapItemStyle}>
            <div>
              <strong style={{ color: "#1e1b4b" }}>Teaching: {myTeach}</strong>
              <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Partner: {activePeer?.name || "Priya S"}</p>
            </div>
            <button className="btn-green" style={{ padding: "8px 14px", fontSize: "0.85rem" }} onClick={() => setCurrentPage("room")}>
              Enter Room
            </button>
          </div>
        </div>

        <div style={boxStyle}>
          <h3 style={{ marginBottom: "14px", color: "#1e1b4b" }}>📚 My Learning Swaps</h3>
          <div style={swapItemStyle}>
            <div>
              <strong style={{ color: "#1e1b4b" }}>Learning: {myLearn}</strong>
              <p style={{ fontSize: "0.85rem", color: "#64748b" }}>Mentor: {activePeer?.name || "Arjun K"}</p>
            </div>
            <button className="btn-outline" style={{ padding: "8px 14px", fontSize: "0.85rem" }} onClick={() => setCurrentPage("room")}>
              Enter Room
            </button>
          </div>
        </div>
      </div>

      {/* Top 5 Leaderboard */}
      <div style={boxStyle}>
        <h3 style={{ marginBottom: "16px", color: "#1e1b4b" }}>🏆 Top 5 Community Swappers</h3>
        {topSwappers.map((person, index) => (
          <div key={person.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f5f3ff" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <strong style={{ color: "#6d28d9", width: "26px", fontSize: "1.05rem" }}>#{index + 1}</strong>
              <img
                src={person.photo}
                alt={person.name}
                style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "2px solid #6d28d9" }}
              />
              <div>
                <strong style={{ color: "#1e1b4b" }}>{person.name}</strong>
                <div style={{ fontSize: "0.85rem", color: "#64748b" }}>Teaches {person.teaches} ⇄ Learns {person.wantsToLearn}</div>
              </div>
            </div>
            <span style={{ background: "#fef9c3", color: "#854d0e", padding: "5px 14px", borderRadius: "12px", fontWeight: "800", fontSize: "0.85rem" }}>
              Score: {person.swapScore}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const boxStyle = {
  background: "#fff",
  padding: "24px",
  borderRadius: "18px",
  boxShadow: "0 6px 20px rgba(109, 40, 217, 0.07)"
};

const swapItemStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  background: "#f5f3ff",
  padding: "14px",
  borderRadius: "12px",
  borderLeft: "4px solid #6d28d9"
};

export default Dashboard;
