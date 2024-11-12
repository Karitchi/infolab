import React from "react";
import HourButton from "./HourButton";
import { isToday, isBefore, setHours, addDays, startOfWeek, getDay } from "date-fns";

const WeeklySchedule = ({ schedule, setSchedule }) => {
  const days = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
  const today = new Date();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const todayIndex = getDay(today) - 1; // -1 pour correspondre à notre tableau de jours (lundi = 0)

  // Function to toggle hours
  const toggleHour = (day, hour) => {
    setSchedule((prev) => {
      const hours = prev[day];
      return {
        ...prev,
        [day]: hours.includes(hour) ? hours.filter((h) => h !== hour) : [...hours, hour],
      };
    });
  };

  // Function to check if the hour is in the past (for styling purposes only)
  const isHourInPast = (day, hour) => {
    const dayIndex = days.indexOf(day);
    const dayDate = addDays(startOfThisWeek, dayIndex);
    const hourDate = setHours(dayDate, hour);

    return isBefore(hourDate, today) || (isToday(hourDate) && hour < today.getHours());
  };

  return (
    <div className="overflow-auto w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
      <div className="grid grid-cols-6 gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className={`text-center font-semibold py-2 ${
              index === todayIndex ? "text-blue-500 underline" : "text-gray-700"
            }`}
          >
            {day.charAt(0).toUpperCase() + day.slice(1)}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-6 gap-2 mt-4">
        {days.map((day) => (
          <div key={day} className="grid grid-rows-[repeat(10,1fr)] gap-1">
            {[...Array(10).keys()].map((i) => {
              const hour = i + 8; // Display hours from 8 to 17
              return (
                <HourButton
                  key={`${day}-${hour}`}
                  isActive={schedule[day].includes(hour)}
                  isPast={isHourInPast(day, hour)}  // Pass a new isPast prop to HourButton
                  onClick={() => toggleHour(day, hour)}
                  hour={hour}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklySchedule;
