// utils/roomManager.js

const rooms = new Map();
/*
rooms structure:
{
  roomId: {
    tracker: socketId,
    users: Set(socketId)
  }
}
*/

export const getRoomUsers = (roomId) => {
  const room = rooms.get(roomId);
  if (!room) return [];
  return [...room.users];
};

export const createOrJoinRoom = (roomId, socketId, role) => {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      tracker: null,
      users: new Set()
    });
  }

  const room = rooms.get(roomId);

  // Prevent multiple trackers
  if (role === "tracker") {
    if (room.tracker && room.tracker !== socketId) {
      return { error: "Tracker already exists in this room." };
    }
    room.tracker = socketId;
  }

  room.users.add(socketId);

  return { success: true };
};

export const removeUserFromRoom = (socketId) => {
  for (const [roomId, room] of rooms.entries()) {
    if (room.users.has(socketId)) {
      room.users.delete(socketId);

      const wasTracker = room.tracker === socketId;

      if (wasTracker) {
        room.tracker = null;
      }

      // Cleanup empty room
      if (room.users.size === 0) {
        rooms.delete(roomId);
      }

      return { roomId, wasTracker };
    }
  }

  return null;
};

export const isTracker = (roomId, socketId) => {
  const room = rooms.get(roomId);
  if (!room) return false;
  return room.tracker === socketId;
};