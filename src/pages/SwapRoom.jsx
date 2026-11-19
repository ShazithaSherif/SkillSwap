import React, { useState, useEffect } from 'react';

function SwapRoom({ userProfile, setUserProfile, activePeer, setCurrentPage }) {
  const peer = activePeer || { name: "Priya S", teaches: "React", photo: "/priya.jpeg" };
  const myName = userProfile?.name || "You";
  const myPhoto = userProfile?.photo || "/arjun.jpeg";
  const myTeach = userProfile?.teaches || "Python";

  const [phase, setPhase] = useState("teach");
  const [secondsLeft, setSecondsLeft] = useState(30 * 60);
  const [isRunning, setIsRunning] = useState(false);

  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenSharing, setScreenSharing] = useState(false);

  const [tasks, setTasks] = useState([
    { id: 1, text: "Quick 2-min intro & learning goal", done: true },
    { id: 2, text: "Core concept explanation & live demo", done: false },
    { id: 3, text: "Hands-on mini challenge together", done: false },
    { id: 4, text: "Flip roles & swap skills", done: false }
  ]);

  const [activeTab, setActiveTab] = useState("chat");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { sender: peer.name, text: `Hey ${myName}! Excited to swap ${peer.teaches} for ${myTeach}!` }
  ]);
  const [notes, setNotes] = useState(`// Shared ${myTeach} ⇄ ${peer.teaches} Notes\n1. Key concept:\n2. Practice task:\n`);

  const [isCompleted, setIsCompleted] = useState(false);
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const secs = String(secondsLeft % 60).padStart(2, "0");

  const switchPhase = (newPhase) => {
    setIsRunning(false);
    setPhase(newPhase);
    setSecondsLeft(30 * 60);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { sender: "You", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: peer.name, text: "Great point! Let's try an example together." }
      ]);
    }, 800);
  };

  const handleCompleteSwap = () => {
    setIsRunning(false);
    setIsCompleted(true);
    if (userProfile) {
      const updated = {
        ...userProfile,
        swapCoins: (userProfile.swapCoins || 50) + 25,
        completedSwaps: (userProfile.completedSwaps || 0) + 1
      };
      localStorage.setItem("skillswap_user", JSON.stringify(updated));
      setUserProfile(updated);
    }
  };
  if (isCompleted) {
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });

    return (
      <div style={{ padding: "50px 6%", maxWidth: "760px", margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #ffffff 0%, #f5f3ff 100%)",
            padding: "42px 36px",
            borderRadius: "24px",
            textAlign: "center",
            boxShadow: "0 16px 40px rgba(109, 40, 217, 0.18)",
            border: "5px double #6d28d9",
            marginBottom: "28px"
          }}
        >
          <span
            style={{
              background: "#facc15",
              color: "#1e1b4b",
              padding: "6px 18px",
              borderRadius: "20px",
              fontSize: "0.82rem",
              fontWeight: "800",
              letterSpacing: "1px"
            }}
          >
            🏅 OFFICIAL PEER EXCHANGE CERTIFICATE
          </span>

          <h1 style={{ color: "#4c1d95", fontSize: "2.1rem", margin: "16px 0 6px" }}>
            Skill<span style={{ color: "#eab308" }}>Swap</span> Community
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.95rem", marginBottom: "22px" }}>
            Everyone Can Teach • Everyone Can Learn • Education Is Free
          </p>

          <p style={{ color: "#475569", fontSize: "1rem" }}>This proudly certifies that</p>
          <h2
            style={{
              color: "#1e1b4b",
              fontSize: "2rem",
              margin: "8px 0 16px",
              borderBottom: "2px solid #facc15",
              display: "inline-block",
              padding: "0 24px 4px"
            }}
          >
            {myName}
          </h2>

          <p style={{ color: "#334155", fontSize: "1.05rem", lineHeight: "1.7", maxWidth: "560px", margin: "0 auto 22px" }}>
            Successfully completed a 60-minute peer skill exchange with <strong>{peer.name}</strong> — teaching{" "}
            <strong style={{ color: "#6d28d9" }}>{myTeach}</strong> and learning{" "}
            <strong style={{ color: "#6d28d9" }}>{peer.teaches}</strong> — earning <strong>+25 Swap Coins</strong>.
          </p>

          <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "16px", borderTop: "1px solid #ddd6fe", paddingTop: "18px", fontSize: "0.9rem", color: "#475569" }}>
            <div>📅 <strong>Date:</strong> {today}</div>
            <div>🪙 <strong>Reward:</strong> +25 Swap Coins</div>
            <div>✅ <strong>Verified Peer Swap</strong></div>
          </div>
        </div>

        <div style={{ background: "#fff", padding: "26px", borderRadius: "18px", textAlign: "center", boxShadow: "0 6px 20px rgba(109, 40, 217, 0.08)" }}>
          <p style={{ color: "#1e1b4b", fontWeight: "700", marginBottom: "10px" }}>
            Rate your session with {peer.name}:
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "20px" }}>
            {Array.from({ length: 5 }, (_, i) => i + 1).map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                style={{ fontSize: "2.2rem", background: "none", border: "none", cursor: "pointer", color: star <= rating ? "#facc15" : "#cbd5e1" }}
              >
                ★
              </button>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
            <button className="btn-outline" onClick={() => window.print()}>
              🖨️ Download / Save Certificate (PDF)
            </button>
            <button className="btn-green" onClick={() => setCurrentPage("dashboard")}>
              Submit Rating & View My Swaps →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "32px 6%", maxWidth: "1120px", margin: "0 auto" }}>
      <div style={{ background: "linear-gradient(135deg, #4c1d95 0%, #6d28d9 100%)", color: "#fff", padding: "20px 26px", borderRadius: "18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px", boxShadow: "0 8px 24px rgba(109, 40, 217, 0.22)" }}>
        <div>
          <span style={{ background: "#facc15", color: "#1e1b4b", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "800" }}>
            ● LIVE SWAP STUDIO
          </span>
          <h2 style={{ marginTop: "6px", fontSize: "1.45rem" }}>
            {myTeach} ⇄ {peer.teaches} Exchange
          </h2>
        </div>

        <div style={{ display: "flex", gap: "8px", background: "rgba(255,255,255,0.12)", padding: "6px", borderRadius: "12px" }}>
          <button onClick={() => switchPhase("teach")} style={phase === "teach" ? roleActive : roleInactive}>
            🎓 You Teach ({myTeach})
          </button>
          <button onClick={() => switchPhase("learn")} style={phase === "learn" ? roleActive : roleInactive}>
            📚 You Learn ({peer.teaches})
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ background: "#1e1b4b", padding: "8px 16px", borderRadius: "12px", border: "2px solid #facc15", fontSize: "1.35rem", fontWeight: "800", color: "#facc15" }}>
            ⏱ {mins}:{secs}
          </div>
          <button className="btn-green" style={{ padding: "10px 16px" }} onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "⏸ Pause" : "▶ Start"}
          </button>
          <button
            onClick={() => setSecondsLeft(10)}
            style={{ background: "rgba(255,255,255,0.18)", color: "#fff", border: "none", padding: "10px 12px", borderRadius: "10px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "700" }}
          >
            10s Demo
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "24px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ background: "#1e1b4b", padding: "24px", borderRadius: "20px", color: "#fff", boxShadow: "0 8px 24px rgba(30, 27, 75, 0.2)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div style={{ ...videoTile, border: phase === "teach" ? "3px solid #facc15" : "2px solid #4c1d95" }}>
                {phase === "teach" && <span style={spotlightTag}>🎤 Teaching</span>}
                <img src={myPhoto} alt={myName} style={avatarStyle} />
                <strong style={{ fontSize: "1rem" }}>{myName} (You)</strong>
                <span style={{ fontSize: "0.8rem", color: "#ddd6fe", marginTop: "2px" }}>{myTeach}</span>
              </div>

              <div style={{ ...videoTile, border: phase === "learn" ? "3px solid #facc15" : "2px solid #4c1d95" }}>
                {phase === "learn" && <span style={spotlightTag}>🎤 Teaching</span>}
                <img src={peer.photo} alt={peer.name} style={avatarStyle} />
                <strong style={{ fontSize: "1rem" }}>{peer.name}</strong>
                <span style={{ fontSize: "0.8rem", color: "#ddd6fe", marginTop: "2px" }}>{peer.teaches}</span>
              </div>
            </div>

            {screenSharing && (
              <div style={{ background: "#312e81", border: "2px dashed #facc15", padding: "12px", borderRadius: "12px", textAlign: "center", marginBottom: "18px", fontSize: "0.88rem", color: "#fef08a" }}>
                🖥️ Screen Sharing Active — Presenting {phase === "teach" ? myTeach : peer.teaches}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
              <button onClick={() => setMicOn(!micOn)} style={micOn ? dockBtn : dockBtnOff}>
                {micOn ? "🎙️ Mic" : "🔇 Muted"}
              </button>
              <button onClick={() => setCamOn(!camOn)} style={camOn ? dockBtn : dockBtnOff}>
                {camOn ? "📹 Cam" : "🚫 Off"}
              </button>
              <button onClick={() => setScreenSharing(!screenSharing)} style={screenSharing ? dockBtnActive : dockBtn}>
                🖥️ {screenSharing ? "Stop Share" : "Share Screen"}
              </button>
              <button
                onClick={handleCompleteSwap}
                style={{ background: "#facc15", color: "#1e1b4b", border: "none", padding: "10px 16px", borderRadius: "10px", fontWeight: "800", cursor: "pointer" }}
              >
                ✅ Complete Swap
              </button>
            </div>
          </div>

          <div style={{ background: "#fff", padding: "22px", borderRadius: "18px", boxShadow: "0 6px 20px rgba(109, 40, 217, 0.08)" }}>
            <h3 style={{ marginBottom: "14px", color: "#1e1b4b", fontSize: "1.1rem" }}>🎯 Live Session Roadmap</h3>
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", background: task.done ? "#f5f3ff" : "#fff", cursor: "pointer", marginBottom: "8px", border: "1px solid #ede9fe" }}
              >
                <span>{task.done ? "✅" : "⬜"}</span>
                <span style={{ textDecoration: task.done ? "line-through" : "none", color: task.done ? "#6d28d9" : "#1e1b4b", fontWeight: "600", fontSize: "0.92rem" }}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>
          <div style={{ background: "#fff", padding: "24px", borderRadius: "20px", boxShadow: "0 6px 20px rgba(109, 40, 217, 0.08)", display: "flex", flexDirection: "column", minHeight: "480px" }}>
          <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
            <button onClick={() => setActiveTab("chat")} style={activeTab === "chat" ? tabActive : tabInactive}>
              💬 Live Peer Chat
            </button>
            <button onClick={() => setActiveTab("notes")} style={activeTab === "notes" ? tabActive : tabInactive}>
              📝 Shared Notes
            </button>
          </div>

          {activeTab === "chat" ? (
            <>
              <div style={{ flex: 1, maxHeight: "340px", overflowY: "auto", background: "#f5f3ff", padding: "16px", borderRadius: "14px", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "14px" }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      alignSelf: msg.sender === "You" ? "flex-end" : "flex-start",
                      background: msg.sender === "You" ? "#6d28d9" : "#fff",
                      color: msg.sender === "You" ? "#fff" : "#1e1b4b",
                      padding: "10px 14px",
                      borderRadius: "14px",
                      maxWidth: "80%",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
                    }}
                  >
                    <div style={{ fontSize: "0.75rem", fontWeight: "800", opacity: 0.85, marginBottom: "3px" }}>{msg.sender}</div>
                    <div style={{ fontSize: "0.94rem" }}>{msg.text}</div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  placeholder="Type a message or paste a resource link..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  style={{ flex: 1, padding: "12px", borderRadius: "10px", border: "1.5px solid #ddd6fe", outline: "none", fontSize: "0.95rem" }}
                />
                <button type="submit" className="btn-green" style={{ padding: "12px 20px" }}>
                  Send
                </button>
              </form>
            </>
          ) : (
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{ width: "100%", flex: 1, minHeight: "380px", padding: "16px", borderRadius: "12px", border: "1.5px solid #ddd6fe", fontFamily: "monospace", fontSize: "0.95rem", outline: "none", resize: "none" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const videoTile = {
  background: "#312e81",
  borderRadius: "16px",
  padding: "24px 12px 18px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  textAlign: "center"
};

const spotlightTag = {
  position: "absolute",
  top: "10px",
  background: "#facc15",
  color: "#1e1b4b",
  fontSize: "0.72rem",
  fontWeight: "800",
  padding: "3px 10px",
  borderRadius: "10px"
};

const avatarStyle = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  objectFit: "cover",
  objectPosition: "center top",
  border: "3px solid #facc15",
  marginTop: "14px",
  marginBottom: "8px"
};

const dockBtn = {
  background: "#312e81",
  color: "#fff",
  border: "1px solid #6d28d9",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const dockBtnOff = {
  background: "#991b1b",
  color: "#fff",
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const dockBtnActive = {
  background: "#6d28d9",
  color: "#facc15",
  border: "1px solid #facc15",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const roleActive = {
  background: "#facc15",
  color: "#1e1b4b",
  border: "none",
  padding: "8px 14px",
  borderRadius: "9px",
  fontWeight: "800",
  cursor: "pointer",
  fontSize: "0.85rem"
};

const roleInactive = {
  background: "transparent",
  color: "#ede9fe",
  border: "none",
  padding: "8px 14px",
  borderRadius: "9px",
  fontWeight: "600",
  cursor: "pointer",
  fontSize: "0.85rem"
};

const tabActive = {
  flex: 1,
  background: "#6d28d9",
  color: "#fff",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

const tabInactive = {
  flex: 1,
  background: "#f5f3ff",
  color: "#6d28d9",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  fontWeight: "700",
  cursor: "pointer"
};

export default SwapRoom;

