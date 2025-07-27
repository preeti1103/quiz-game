# Quiz Game

A simple **Quiz Game** built with **HTML, CSS, JavaScript** for the frontend and **Node.js, Express, MongoDB** for the backend.

---

## **Live Demo**
👉 [Click Here to Play](https://quiz-game-2wyv.onrender.com)

---

## **Features**
- Multiple-choice quiz with timer.
- Score calculation and best score tracking.
- Dark mode toggle.
- Persistent leaderboard stored in MongoDB Atlas.
- Fully responsive design for mobile and desktop.

---

## **Tech Stack**
**Frontend:** HTML, CSS, JavaScript  
**Backend:** Node.js, Express.js  
**Database:** MongoDB Atlas  
**Deployment:** Render (Free Tier)

---

## **API Endpoints**
- **POST /api/quiz/score** → Save a user score.
- **GET /api/quiz/scores** → Fetch leaderboard (Top 10 scores).

---

## **Setup Locally**
```bash
# Clone repository
git clone https://github.com/preeti1103/quiz-game.git
cd quiz-game

# Install dependencies
npm install

# Add MongoDB connection string to .env
MONGO_URI=your_connection_string

# Start server
npm run dev
---

**License**
This project is licensed under the MIT License.

