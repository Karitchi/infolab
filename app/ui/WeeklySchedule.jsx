import HourButton from "./HourButton";

const WeeklySchedule = ({ schedule, setSchedule, currentDBSchedule }) => {
  const days = Object.keys(schedule);
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  const handleClick = (day, hour) => {
    setSchedule((prev) => {
      const daySchedule = prev[day];
      return {
        ...prev,
        [day]: daySchedule.includes(hour)
          ? daySchedule.filter((h) => h !== hour) // Décocher
          : [...daySchedule, hour], // Cocher
      };
    });
  };

  return (
    <div className="flex flex-col flex-grow">
      {days.map((day) => (
        <div key={day} className="flex flex-grow">
          <h3 className="font-bold mt-4">{day}</h3>
          <div className="flex flex-grow p-3 space-x-3">
            {hours.map((hour) => {
              const isPast = new Date().getHours() > hour; // Boutons dans le passé
              const isSelectedInDB = currentDBSchedule[day]?.includes(hour); // Dans la DB
              const isActive = schedule[day].includes(hour); // En cours de sélection

              return (
                <HourButton
                  key={`${day}-${hour}`}
                  hour={hour}
                  isPast={isPast}
                  isSelectedInDB={isSelectedInDB}
                  isActive={isActive}
                  onClick={() => handleClick(day, hour)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklySchedule;
