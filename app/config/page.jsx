"use client";

import Title from "../ui/Title";
import React, { useState, useEffect } from "react";
import WeeklySchedule from "@/app/ui/WeeklySchedule";
import { insertSchedule, clearSchedules, getSchedule } from "@/app/lib/serverActionEndpoint";
import { toast, Toaster } from "sonner";

const Page = () => {
  const [schedule, setSchedule] = useState({
    lundi: [], mardi: [], mercredi: [], jeudi: [], vendredi: [], samedi: [],
  });
  const [currentDBSchedule, setCurrentDBSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSchedule();
        setCurrentDBSchedule(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des horaires:", error);
      }
    };

    fetchSchedule();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await clearSchedules();
      for (const day in schedule) {
        const hours = schedule[day];
        if (hours.length > 0) {  
          await insertSchedule(day, hours);
        }
      }
      toast.success("Les horaires ont été enregistrés avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des horaires.");
    }
  };

  return (
    <div className="p-8">
      <Title title="Horraire d'arret" />

      {/* Displaying the current database schedule */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">Horaires actuels dans la base de données :</h2>
        <ul className="list-disc pl-5 mt-2">
          {currentDBSchedule.map((item, index) => (
            <li key={index}>
              {item.day}: {item.hours.join(", ")}h
            </li>
          ))}
        </ul>
      </div>

      <WeeklySchedule schedule={schedule} setSchedule={setSchedule} />
      <button onClick={handleSubmit} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Valider les horaires
      </button>
      <Toaster theme="dark" richColors position="top-center" expand />
    </div>
  );
};

export default Page;
