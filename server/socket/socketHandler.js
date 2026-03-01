// socket/socketHandler.js

import {
  createOrJoinRoom,
  removeUserFromRoom,
  isTracker,
  getRoomUsers
} from "../utils/roomManager.js";

export default function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("🔌 Connected:", socket.id);

    // JOIN ROOM
    socket.on("join-room", ({ roomId, role, name }) => {
        if (!roomId || !role || !name) {
            socket.emit("error-message", "Room ID, role and name required.");
            return;
        }
        if (!["tracker", "tracked"].includes(role)) {
            socket.emit("error-message", "Invalid role.");
            return;
        }

    const result = createOrJoinRoom(roomId, socket.id, role);

      if (result.error) {
        socket.emit("error-message", result.error);
        return;
      }

      // Save user metadata
      socket.data.name = name;
      socket.data.role = role;

      socket.join(roomId);

      socket.emit("joined-success", { roomId, role });

      console.log(`📍 ${name} joined ${roomId} as ${role}`);

      // Send updated participants list
      const users = getRoomUsers(roomId).map((id) => {
        const s = io.sockets.sockets.get(id);
        return {
          id,
          name: s?.data.name || "Unknown",
          role: s?.data.role || "tracked"
        };
      });

      io.to(roomId).emit("participants-update", users);
    });

    //MAP MOVE (TRACKER ONLY)
    socket.on("map-move", ({ roomId, data }) => {

        //Validate roomId and data existence
        if (!roomId || !data) return;

        //Validate map data structure
        if (
            typeof data.lat !== "number" ||
            typeof data.lng !== "number" ||
            typeof data.zoom !== "number"
        ) {
            return;
        }

        //Ensure only tracker can emit
        if (!isTracker(roomId, socket.id)) return;

        socket.to(roomId).emit("sync-map", data);
    });
    // DISCONNECT
    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);

      const result = removeUserFromRoom(socket.id);
      if (!result) return;

      const { roomId, wasTracker } = result;

      // Notify if tracker left
      if (wasTracker) {
        io.to(roomId).emit("tracker-disconnected");
      }

      // Update participant list
      const users = getRoomUsers(roomId).map((id) => {
        const s = io.sockets.sockets.get(id);
        return {
          id,
          name: s?.data.name || "Unknown",
          role: s?.data.role || "tracked"
        };
      });

      io.to(roomId).emit("participants-update", users);
    });
  });
}