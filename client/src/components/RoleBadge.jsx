const RoleBadge = ({ role }) => {
  return (
    <div
      className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md ${
        role === "tracker"
          ? "bg-red-600"
          : "bg-green-600"
      }`}
    >
      {role === "tracker" ? "Broadcasting" : "Syncing"}
    </div>
  );
};

export default RoleBadge;