# 🌍 GeoSync – Real-Time Tracker & Follower Map Sync

🔗 **Live Demo**  
Link : https://realtime-geosync.onrender.com 

⚠️ Note: The backend is hosted on Render (free tier). It may take 30–60 seconds to wake up after inactivity due to cold start.

GitHub Repo:  
https://github.com/PiyushSutar-570/Realtime-Geosync

---

## 📌 Overview

GeoSync is a real-time collaborative map synchronization system built using:

- React (Vite)
- Node.js + Express
- Socket.io
- Leaflet.js
- Tailwind CSS

It enables two users to connect in a shared session where:

- **Tracker** controls the map
- **Tracked** follows the tracker’s movements in real time

All map movements (pan, zoom, and click location) are synchronized instantly using WebSockets.

---

# 🚀 Core Features

## 🔐 Room-Based Session System
- Join via unique Room ID
- Role selection (Tracker / Tracked)
- Server-enforced single tracker per room
- Live participants list
- Copy Room ID feature
- Leave room functionality

---

## 🔄 Real-Time Map Synchronization
- Tracker pan/zoom emits coordinates via Socket.io
- Tracked user receives updates instantly
- Marker updates on map click
- Smooth animated transitions
- Latency optimized under 100ms
- Server validates tracker before broadcasting

---

## 📍 Interactive Map Behavior
- Marker moves to clicked location (Tracker only)
- Click-based sync across users
- Marker reflects current shared state
- High precision float handling (6 decimal places display)

---

## 🖥️ Modern UI
- Floating HUD showing:
  - Latitude
  - Longitude
  - Zoom level
  - Connection status
- Role badge:
  - 🔴 Broadcasting
  - 🟢 Syncing
- Sidebar includes:
  - Room ID (copy option)
  - Username
  - Role indicator
  - Live clock
  - Active participants
  - Leave Room button

---

# ⚙️ Performance Optimizations

- Throttle (100ms) prevents socket flooding
- `moveend` used instead of continuous move events
- Stable throttle using `useRef`
- Proper socket listener cleanup
- Backend remains source of truth (frontend does not assume success)

---

#images :

<img width="1919" height="965" alt="image" src="https://github.com/user-attachments/assets/2d92057a-c1fb-4874-959a-7121f4f8afba" />

<img width="1919" height="916" alt="image" src="https://github.com/user-attachments/assets/6c9dc278-7e99-4484-9a23-c4a4da8de9a5" />

<img width="1919" height="919" alt="image" src="https://github.com/user-attachments/assets/8b2f7b79-44f9-421b-a1d9-8c3a638da264" />

<br>
#demo-videolink : https://drive.google.com/file/d/1z8tWco23yRd9_hCXCG3v98WsDNFpBNdW/view?usp=drivesdk

# 🛡️ Production-Ready Architecture

## Backend Authority
Frontend updates UI only after receiving:

```
joined-success
```

Server rejects:
- Multiple trackers
- Invalid roles
- Invalid map data

---

## Environment-Based Configuration

Frontend `.env`:
```
VITE_SOCKET_URL=https://your-backend.onrender.com
```

Backend `.env`:
```
PORT=5000
CLIENT_URL=https://your-frontend.vercel.app
```

---

# 🏗️ Tech Stack

## Frontend
- React (Vite)
- Tailwind CSS
- React-Leaflet
- Socket.io-client

## Backend
- Node.js
- Express
- Socket.io

## Map Tiles
- OpenStreetMap (Leaflet)

---

# 📂 Project Structure

```
Realtime-Geosync/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── JoinSession.jsx
│   │   │   ├── MapView.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── HUD.jsx
│   │   │   └── RoleBadge.jsx
│   │   ├── utils/
│   │   │   └── throttle.js
│   │   ├── App.jsx
│   │   └── main.jsx
│
├── server/
│   ├── socket/
│   │   └── socketHandler.js
│   ├── utils/
│   │   └── roomManager.js
│   ├── server.js
│
└── README.md
```

---

# 🧪 How It Works

### Real-Time Flow

```
Tracker moves or clicks map
        ↓
Map state extracted (lat, lng, zoom)
        ↓
Socket emits "map-move"
        ↓
Server validates tracker
        ↓
Broadcast to room
        ↓
Tracked updates map view with animation
```

---

# ⚙️ Local Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/PiyushSutar-570/Realtime-Geosync.git
cd Realtime-Geosync
```

---

## 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create `.env` inside `server/`:

```
PORT=5000
CLIENT_URL=http://localhost:5173
```

Start backend:

```bash
npm run dev
```

---

## 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

# 🌍 Deployment

## Backend (Render)
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Set `CLIENT_URL` to your frontend production URL

## Frontend (Vercel / Static Hosting)
- Root Directory: `client`
- Build Command:
  ```
  npm install && npm run build
  ```
- Publish Directory:
  ```
  dist
  ```
- Set:
  ```
  VITE_SOCKET_URL=https://your-backend.onrender.com
  ```

---

# Requirement Coverage

| Requirement | Status |
|------------|--------|
| Room-based join | ✅ |
| Role assignment | ✅ |
| Single tracker enforcement | ✅ |
| Real-time sync | ✅ |
| HUD overlay | ✅ |
| Role badge | ✅ |
| Throttle handling | ✅ |
| Tracker disconnect handling | ✅ |
| Precision handling | ✅ |
| Production deployment | ✅ |

# 🎯 Conclusion

GeoSync demonstrates:

- Real-time WebSocket architecture
- Server-authoritative role validation
- Optimized event handling
- Clean modular React structure
- Scalable room-based system
- Production deployment configuration

This project showcases strong understanding of real-time synchronization systems and modern full-stack architecture.
