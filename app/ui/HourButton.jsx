import React from "react";

const HourButton = ({ hour, isActive, isPast, onClick }) => {
  return (
    <button
      className={`w-full py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-500 text-white"                       // Background blue when active
          : "bg-gray-200 text-black"
      } ${isPast ? "border border-gray-600" : ""} cursor-pointer`}  // Gray border for past hours
      onClick={onClick}
    >
      {hour}h
    </button>
  );
};

export default HourButton;
