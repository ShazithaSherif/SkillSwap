import React, { useState } from 'react';
import { mockUsers } from '../data';

function FindMatch({ userProfile, onStartSwap }) {
  const myTeach = userProfile?.teaches || "Python";
  const myLearn = userProfile?.wantsToLearn || "React";

  const [connectingPeer, setConnectingPeer] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [onlyPerfect, setOnlyPerfect] = useState(false);

  const skillFilters = Array.from(
    new Set(["Python", "React", "Design", "DSA", "Photography", "Guitar", "English", myTeach, myLearn])
  );

  const getMatchBadge = (peer) => {
    const theyTeachWhatIWant = peer.teaches.toLowerCase() === myLearn.toLowerCase();
    const theyWantWhatITeach = peer.wantsToLearn.toLowerCase() === myTeach.toLowerCase();

    if (theyTeachWhatIWant && theyWantWhatITeach) {
      return { label: "🔥 Perfect Match 98%", bg: "#fef9c3", color: "#854d0e", isPerfect: true };
    }
    if (theyTeachWhatIWant || theyWantWhatITeach) {
      return { label: "✨ Good Match 70%", bg: "#ede9fe", color: "#6d28d9", isPerfect: false };
    }
    return { label: "🤝 Community Peer", bg: "#f1f5f9", color: "#475569", isPerfect: false };
  };

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.teaches.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.wantsToLearn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.bio.toLowerCase().includes(searchQuery.toLowerCase());

    const skillTerm = selectedSkill.trim().toLowerCase();
    const matchesSkill =
      !skillTerm ||
      skillTerm === "all" ||
      user.teaches.toLowerCase().includes(skillTerm) ||
      user.wantsToLearn.toLowerCase().includes(skillTerm);

    const matchInfo = getMatchBadge(user);
    const matchesPerfectToggle = !onlyPerfect || matchInfo.isPerfect;

    return matchesSearch && matchesSkill && matchesPerfectToggle;
  });

  const handleRequestSwap = (peer) => {
    setConnectingPeer(peer);
    setTimeout(() => {
      setConnectingPeer(null);
      onStartSwap(peer);
    }, 2200);
  };

  return (
    <div style={{ padding: "28px 5%" }}>
      {/* Connecting Modal */}
      {connectingPeer && (
        <div style={modalOverlay}>
          <div style={modalBox}>
            <div style={{ fontSize: "3rem", marginBottom: "12px" }}>
              🧑‍💻 <span style={{ color: "#facc15" }}>⇄</span> 👩‍💻
            </div>
            <h2 style={{ color: "#facc15", marginBottom: "8px" }}>Match Connected!</h2>
            <p style={{ color: "#ede9fe" }}>
              Connecting you with <strong>{connectingPeer.name}</strong>...
            </p>
            <p style={{ marginTop: "10px", fontSize: "0.95rem", color: "#ddd6fe" }}>
              You teach <strong>{myTeach}</strong> • They teach <strong>{connectingPeer.teaches}</strong>
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "1.9rem", marginBottom: "8px", color: "#1e1b4b" }}>Find Your SkillSwap Match</h2>
        <p style={{ color: "#64748b", fontSize: "0.98rem" }}>
          Your Profile: Teaching <strong style={{ color: "#6d28d9" }}>{myTeach}</strong> | Learning <strong style={{ color: "#1e1b4b" }}>{myLearn}</strong>
        </p>
      </div>

      {/* Interactive Search + Dropdown/Type Skill Filter */}
      <div style={{ background: "#fff", padding: "18px", borderRadius: "18px", boxShadow: "0 6px 20px rgba(109, 40, 217, 0.07)", marginBottom: "24px" }}>
        <datalist id="filter-skill-options">
          {skillFilters.map((skill) => (
            <option key={skill} value={skill} />
          ))}
        </datalist>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
          <input
            type="text"
            placeholder="🔍 Search by peer name or bio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, minWidth: "200px", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #ddd6fe", fontSize: "0.92rem", outline: "none" }}
          />

          <input
            type="text"
            list="filter-skill-options"
            placeholder="🎯 Select or type any skill..."
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            style={{ flex: 1, minWidth: "200px", padding: "11px 14px", borderRadius: "10px", border: "1.5px solid #ddd6fe", fontSize: "0.92rem", outline: "none" }}
          />

          <button
            onClick={() => setOnlyPerfect(!onlyPerfect)}
            style={{
              background: onlyPerfect ? "#facc15" : "#f5f3ff",
              color: onlyPerfect ? "#1e1b4b" : "#6d28d9",
              border: "2px solid #facc15",
              padding: "9px 16px",
              borderRadius: "10px",
              fontWeight: "800",
              fontSize: "0.88rem",
              cursor: "pointer"
            }}
          >
            {onlyPerfect ? "🔥 Showing Perfect Matches" : "🔥 Perfect Matches Only"}
          </button>
        </div>

        {/* Quick Click Skill Pills */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button
            onClick={() => setSelectedSkill("")}
            style={{
              background: selectedSkill === "" ? "#6d28d9" : "#f5f3ff",
              color: selectedSkill === "" ? "#fff" : "#6d28d9",
              border: "none",
              padding: "6px 13px",
              borderRadius: "20px",
              fontWeight: "700",
              fontSize: "0.82rem",
              cursor: "pointer"
            }}
          >
            All
          </button>
          {skillFilters.map((skill) => (
            <button
              key={skill}
              onClick={() => setSelectedSkill(skill)}
              style={{
                background: selectedSkill.toLowerCase() === skill.toLowerCase() ? "#6d28d9" : "#f5f3ff",
                color: selectedSkill.toLowerCase() === skill.toLowerCase() ? "#fff" : "#6d28d9",
                border: "none",
                padding: "6px 13px",
                borderRadius: "20px",
                fontWeight: "700",
                fontSize: "0.82rem",
                cursor: "pointer"
              }}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Filtered Results Grid */}
      {filteredUsers.length === 0 ? (
        <div style={{ textAlign: "center", padding: "36px", background: "#fff", borderRadius: "16px" }}>
          <h3>No matching swappers found 😅</h3>
          <p style={{ color: "#64748b", margin: "8px 0 16px" }}>Try clearing your search or selecting "All" skills.</p>
          <button className="btn-green" onClick={() => { setSearchQuery(""); setSelectedSkill(""); setOnlyPerfect(false); }}>
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="match-grid-mobile" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "24px" }}>
          {filteredUsers.map((user) => {
            const match = getMatchBadge(user);
            return (
              <div key={user.id} className="match-card-mobile" style={cardStyle}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "4px", flexWrap: "wrap", marginBottom: "10px" }}>
                  <span style={{ background: match.bg, color: match.color, padding: "3px 8px", borderRadius: "10px", fontSize: "0.72rem", fontWeight: "800" }}>
                    {match.label}
                  </span>
                  <span style={{ fontSize: "0.72rem", color: "#6d28d9", fontWeight: "700" }}>
                    🏅 {user.badge}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <img
                    src={user.photo}
                    alt={user.name}
                    style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "3px solid #6d28d9", flexShrink: 0 }}
                  />
                  <div>
                    <h3 style={{ margin: 0, color: "#1e1b4b", fontSize: "1.05rem" }}>{user.name}</h3>
                    <span style={{ fontSize: "0.78rem", color: "#64748b" }}>⭐ {user.rating} • {user.swapScore}</span>
                  </div>
                </div>

                <p style={{ fontSize: "0.86rem", color: "#475569", marginBottom: "12px", lineHeight: "1.4" }}>{user.bio}</p>

                <div style={{ background: "#f5f3ff", padding: "9px 10px", borderRadius: "10px", marginBottom: "12px", fontSize: "0.82rem" }}>
                  <div>🎓 <strong>Teaches:</strong> <span style={{ color: "#6d28d9", fontWeight: "800" }}>{user.teaches}</span></div>
                  <div style={{ marginTop: "3px" }}>📚 <strong>Wants:</strong> {user.wantsToLearn}</div>
                </div>

                <button className="btn-green" style={{ width: "100%", padding: "9px 10px", fontSize: "0.85rem" }} onClick={() => handleRequestSwap(user)}>
                  Request Swap ⇄
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const cardStyle = {
  background: "#fff",
  padding: "22px",
  borderRadius: "18px",
  boxShadow: "0 6px 20px rgba(109, 40, 217, 0.08)",
  borderTop: "4px solid #6d28d9",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between"
};

const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(30, 27, 75, 0.88)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
zIndex: 999
};
const modalBox = {
background: "#4c1d95",
border: "3px solid #facc15",
padding: "36px",
borderRadius: "22px",
textAlign: "center",
color: "#fff",
margin: "0 16px",
boxShadow: "0 0 45px rgba(250, 204, 21, 0.55)"
};
export default FindMatch;