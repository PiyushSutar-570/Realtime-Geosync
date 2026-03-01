import { useEffect, useState } from "react";

const Sidebar = ({ roomId, name, role, participants, onLeave, myId }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute right-0 top-0 h-screen w-80 bg-white/90 backdrop-blur-md shadow-2xl border-l p-6 flex flex-col">
      
      {/* Header */}
      <h2 className="text-2xl font-bold mb-6">Session Info</h2>

      {/* Room Info */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span><strong>Room:</strong> {roomId}</span>
          <button
            onClick={() => navigator.clipboard.writeText(roomId)}
            className="text-blue-600 hover:underline text-xs"
          >
            Copy
          </button>
        </div>

        <p><strong>Name:</strong> {name}</p>
        <p>
          <strong>Role:</strong>{" "}
          <span
            className={`px-2 py-1 rounded text-white text-xs ${
              role === "tracker"
                ? "bg-red-500"
                : "bg-green-500"
            }`}
          >
            {role}
          </span>
        </p>

        <p className="text-gray-500 text-xs">
          {time.toLocaleTimeString()}
        </p>
      </div>

      <hr className="my-5" />

      {/* Participants */}
      <h3 className="font-semibold mb-3">Participants</h3>

      <div className="flex-1 overflow-y-auto space-y-2">
        {participants.map((p) => (
          <div
            key={p.id}
            className={`flex justify-between items-center p-2 rounded-lg ${
              p.id === myId ? "bg-gray-100" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">{p.name}</span>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded text-white ${
                p.role === "tracker"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            >
              {p.role}
            </span>
          </div>
        ))}
      </div>

      {/* Leave Button */}
      <button
        onClick={onLeave}
        className="mt-6 bg-gray-900 text-white py-2 rounded-lg hover:bg-black transition"
      >
        Leave Room
      </button>
    </div>
  );
};

export default Sidebar;