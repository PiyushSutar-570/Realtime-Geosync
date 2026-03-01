const HUD = ({ lat, lng, zoom, status }) => {
  return (
    <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-md text-sm">
      <p><strong>Lat:</strong> {lat.toFixed(6)}</p>
      <p><strong>Lng:</strong> {lng.toFixed(6)}</p>
      <p><strong>Zoom:</strong> {zoom}</p>
      <p>
        <strong>Status:</strong>{" "}
        <span className={status === "Connected" ? "text-green-600" : "text-red-600"}>
          {status}
        </span>
      </p>
    </div>
  );
};

export default HUD;