import { MapContainer, TileLayer, useMapEvents, Marker } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { throttle } from "../utils/throttle";

const icon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
});

const MapEvents = ({ role, socket, roomId, setMapState }) => {
  const throttledRef = useRef(null);

  const map = useMapEvents({
    moveend() {
      if (role !== "tracker") return;

      if (!throttledRef.current) {
        throttledRef.current = throttle((center, zoom) => {
          const data = {
            lat: center.lat,
            lng: center.lng,
            zoom,
          };

          setMapState(data);
          socket.emit("map-move", { roomId, data });
        }, 100);
      }

      const center = map.getCenter();
      const zoom = map.getZoom();

      throttledRef.current(center, zoom);
    },

  //NEW: Click support
      click(e) {
        if (role !== "tracker") return;

        const { lat, lng } = e.latlng;

        const data = {
          lat,
          lng,
          zoom: map.getZoom(),
        };

        setMapState(data);
        socket.emit("map-move", { roomId, data });

        // Optional: center map to clicked position
        map.setView([lat, lng], map.getZoom());
      },
  });

  useEffect(() => {
    const handleSync = (data) => {
      if (role === "tracker") return;

      map.setView([data.lat, data.lng], data.zoom, {
        animate: true,
        duration: 0.3,
      });

      setMapState(data);
    };

    socket.on("sync-map", handleSync);

    return () => {
      socket.off("sync-map", handleSync);
    };
  }, [socket, role, map, setMapState]);

  return null;
};

const MapView = ({ role, socket, roomId, mapState, setMapState }) => {
  return (
    <MapContainer
      center={[mapState.lat, mapState.lng]}
      zoom={mapState.zoom}
      className="h-screen w-full"
      zoomControl={true}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[mapState.lat, mapState.lng]} icon={icon} />

      <MapEvents
        role={role}
        socket={socket}
        roomId={roomId}
        setMapState={setMapState}
      />
    </MapContainer>
  );
};

export default MapView;