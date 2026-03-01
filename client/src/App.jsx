import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import JoinSession from "./components/JoinSession";
import MapView from "./components/MapView";
import HUD from "./components/HUD";
import RoleBadge from "./components/RoleBadge";
import Sidebar from "./components/Sidebar";

const socket = io(import.meta.env.VITE_SOCKET_URL);

function App() {
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState([]);
  const [joined, setJoined] = useState(false);
  const [role, setRole] = useState("");
  const [roomId, setRoomId] = useState("");
  const [status, setStatus] = useState("Searching");

  const [mapState, setMapState] = useState({
    lat: 20.5937,
    lng: 78.9629,
    zoom: 10,
  });

  // SOCKET LIFECYCLE
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      setStatus("Connected");
    });

    socket.on("disconnect", () => {
      setStatus("Disconnected");
    });

    socket.on("participants-update", (users) => {
      setParticipants(users);
    });

    socket.on("tracker-disconnected", () => {
      alert("Tracker disconnected!");
    });

    //WAIT FOR SERVER CONFIRMATION
    socket.on("joined-success", ({ roomId, role }) => {
      setRoomId(roomId);
      setRole(role);
      setJoined(true);
    });

    socket.on("error-message", (msg) => {
      alert(msg);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("participants-update");
      socket.off("tracker-disconnected");
      socket.off("joined-success");
      socket.off("error-message");
    };
  }, []);

  
  // JOIN ROOM
  const handleJoin = (room, selectedRole, username) => {
    setName(username); // safe to store locally

    socket.emit("join-room", {
      roomId: room,
      role: selectedRole,
      name: username,
    });
  };

  //leave room
  const handleLeave = () => {
    socket.disconnect();
    window.location.reload();
  };

  if (!joined) {
    return <JoinSession onJoin={handleJoin} />;
  }

  return (
    <div className="relative">
      <div className="pr-80">
        <MapView
          role={role}
          socket={socket}
          roomId={roomId}
          mapState={mapState}
          setMapState={setMapState}
        />
      </div>

      <Sidebar
        roomId={roomId}
        name={name}
        role={role}
        participants={participants}
        onLeave={handleLeave}
        myId={socket.id}
      />

      <HUD
        lat={mapState.lat}
        lng={mapState.lng}
        zoom={mapState.zoom}
        status={status}
      />

      <RoleBadge role={role} />
    </div>
  );
}

export default App;