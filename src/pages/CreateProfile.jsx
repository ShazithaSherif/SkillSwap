import React, { useState } from 'react';

const makeInitialsBadge = (userName) => {
  const initial = (userName?.trim()?.charAt(0) || "S").toUpperCase();
  return `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns="http://w3.org" viewBox="0 0 120 120">
      <rect width="120" height="120" rx="60" fill="#6d28d9"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#facc15" font-family="Segoe UI, sans-serif" font-size="52" font-weight="800">${initial}</text>
    </svg>`
  )}`;
};

function CreateProfile({ userProfile, setUserProfile, setCurrentPage }) {
  const skillsList = ["Python", "React", "Design", "DSA", "Photography", "Guitar", "English", "Video Editing", "Public Speaking"];

  const [name, setName] = useState(userProfile?.name || "");
  const [photo, setPhoto] = useState(
    userProfile?.photo && userProfile.photo !== "/arjun.jpeg" ? userProfile.photo : ""
  );
  const [teaches, setTeaches] = useState(userProfile?.teaches || "");
  const [wantsToLearn, setWantsToLearn] = useState(userProfile?.wantsToLearn || "");
  const [time, setTime] = useState(userProfile?.time || "Evening");
  const [bio, setBio] = useState(userProfile?.bio || "");

  const handleFileUpload = (e) => {
    const file = e.target.files.item(0);
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();

    if (!name.trim() || !teaches.trim() || !wantsToLearn.trim()) {
      alert("Please enter your Name, Skill to Teach, and Skill to Learn!");
      return;
    }

    const finalPhoto = photo.trim() ? photo.trim() : makeInitialsBadge(name);

    const newProfile = {
      name: name.trim(),
      photo: finalPhoto,
      teaches: teaches.trim(),
      wantsToLearn: wantsToLearn.trim(),
      time,
      bio,
      swapCoins: userProfile?.swapCoins || 50,
      completedSwaps: userProfile?.completedSwaps || 0
    };

    localStorage.setItem("skillswap_user", JSON.stringify(newProfile));
    setUserProfile(newProfile);
    setCurrentPage("match");
  };

  return (
    <div style={{ padding: "50px 8%", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ background: "#fff", padding: "35px", borderRadius: "20px", boxShadow: "0 10px 30px rgba(109, 40, 217, 0.1)", borderTop: "5px solid #6d28d9" }}>
        <h2 style={{ marginBottom: "8px", color: "#1e1b4b" }}>Create Your Free SkillSwap Profile</h2>
        <p style={{ color: "#64748b", marginBottom: "24px" }}>Start building your network by sharing what you can teach and want to learn!</p>

        {/* Shared Datalist for Dropdown + Custom Typing */}
        <datalist id="skills-suggestions">
          {skillsList.map((skill) => (
            <option key={skill} value={skill} />
          ))}
        </datalist>

        <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ fontWeight: "700", display: "block", marginBottom: "6px", color: "#1e1b4b" }}>Your Name </label>
            <input
              type="text"
              placeholder="e.g., Hariharan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ fontWeight: "700", display: "block", marginBottom: "6px", color: "#1e1b4b" }}>
              Profile Photo (Optional — Upload or Paste Link)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              style={{ marginBottom: "8px", fontSize: "0.9rem" }}
            />
            
          </div>

          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: "210px" }}>
              <label style={{ fontWeight: "700", display: "block", marginBottom: "6px", color: "#1e1b4b" }}>I Can Teach </label>
              <input
                type="text"
                list="skills-suggestions"
                placeholder="Select or type any skill"
                value={teaches}
                onChange={(e) => setTeaches(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div style={{ flex: 1, minWidth: "210px" }}>
              <label style={{ fontWeight: "700", display: "block", marginBottom: "6px", color: "#1e1b4b" }}>I Want To Learn </label>
              <input
                type="text"
                list="skills-suggestions"
                placeholder="Select or type any skill"
                value={wantsToLearn}
                onChange={(e) => setWantsToLearn(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={{ fontWeight: "700", display: "block", marginBottom: "6px", color: "#1e1b4b" }}>Available Time </label>
            <select value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle}>
              <option value="Morning">Morning (6 AM - 12 PM)</option>
              <option value="Evening">Evening (5 PM - 10 PM)</option>
              <option value="Night">Night (10 PM - 2 AM)</option>
              <option value="Weekend">Weekend (Sat & Sun)</option>
              <option value="Anytime">Anytime</option>
            </select>
          </div>

          <div>
            <label style={{ fontWeight: "700", display: "block", marginBottom: "6px", color: "#1e1b4b" }}>Short Bio</label>
            <textarea
              rows="3"
              placeholder="Tell peers about your skill level and goals"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={inputStyle}
            />
          </div>

          <button type="submit" className="btn-green" style={{ marginTop: "10px", fontSize: "1.05rem" }}>
            Save Profile & Find My Match ⇄
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1.5px solid #ddd6fe",
  fontSize: "1rem",
  outline: "none"
};

export default CreateProfile;
