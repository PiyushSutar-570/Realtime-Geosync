import { useState } from "react";

const JoinSession = ({ onJoin }) => {
  const [roomId, setRoomId] = useState("");
  const [role, setRole] = useState("tracker");
  const [name, setName] = useState("");

  const handleJoin = () => {
    if (!roomId.trim()) return;
    onJoin(roomId, role, name);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          GeoSync Session
        </h2>

        <input
          type="text"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />


        <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-3 border rounded-lg mb-4"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        >
          <option value="tracker">Tracker</option>
          <option value="tracked">Tracked</option>
        </select>

        <button
            onClick={handleJoin}
            disabled={!roomId.trim() || !name.trim()}
            className={`w-full p-3 rounded-lg transition ${
                !roomId.trim() || !name.trim()
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            >
            Join Session
            </button>
      </div>
    </div>
  );
};

export default JoinSession;