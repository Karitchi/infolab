const HourButton = ({ hour, isActive, isPast, isSelectedInDB, onClick }) => {
  return (
    <button
      className={`w-full py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-500 text-white" // Actif (en cours de sélection)
          : isSelectedInDB
            ? "bg-green-500 text-white" // Déjà sélectionné dans la DB
            : "bg-gray-200 text-black"
      } ${isPast ? "border border-gray-600" : ""} cursor-pointer`}
      onClick={onClick}
    >
      {hour}h
    </button>
  );
};

export default HourButton;
