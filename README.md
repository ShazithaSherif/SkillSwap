# SkillSwap

A responsive peer-to-peer skill-exchange web application built with React and Vite. SkillSwap enables learners to match based on complementary skills, collaborate inside a structured 60-minute virtual classroom, and track learning milestones without backend friction.

Live Application: https://netlify.app

___________________________________________________________________________________________________________________________________________________________________

## Core Architecture & Features

- Bidirectional Skill Matching Engine: Evaluates mutual compatibility between user-offered and requested skills (supporting both preset categories and custom user-entered skills via HTML5 datalist), dynamically scoring and filtering peers.
- Interactive Swap Studio: Simulates a two-phase 60-minute learning session (30 minutes teaching / 30 minutes learning) complete with a countdown timer, role-switching spotlight, interactive session roadmap, real-time chat simulation, and a shared scratchpad.
- Client-Side State & Gamification: Persists user profiles, custom SVG initials avatars, Swap Coin balances, and completed session counts in localStorage with tier progression (Beginner, Pro, Master Swapper).
- Print-Ready Credential Generation: Dynamically renders a verifiable session completion certificate styled with print media rules for clean browser-to-PDF export.
- Responsive UI & Custom Motion: Built with pure CSS3 keyframe animations, responsive CSS Grid and Flexbox layouts, and a collapsible mobile navigation drawer.

___________________________________________________________________________________________________________________________________________________________________

## Tech Stack

- Frontend Framework: React, Vite
- Languages: JavaScript (ES6+), HTML5
- Styling: CSS3 (Custom Properties, Keyframe Animations, Media Queries)
- State & Persistence: React Hooks (useState, useEffect), Web Storage API (localStorage)
- CI/CD & Deployment: GitHub, Netlify

___________________________________________________________________________________________________________________________________________________________________

## Local Development

```bash
# Clone the repository
git clone https://github.com

# Navigate into the project directory
cd SkillSwap

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

___________________________________________________________________________________________________________________________________________________________________

## Author

Shazitha Sherif
- Email: shazithasherif@gmail.com
- LinkedIn:https://linkedin.com/in/shazitha04 
- GitHub:https://github.com/ShazithaSherif 
