"use client";

import {
  clearSchedules,
  deleteDaySchedule,
  getSchedule,
  insertSchedule,
} from "@/app/lib/serverActionEndpoint";
import WeeklySchedule from "@/app/ui/WeeklySchedule";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import Title from "../Title";

const ConfigPage = () => {
  const [schedule, setSchedule] = useState({
    lundi: [],
    mardi: [],
    mercredi: [],
    jeudi: [],
    vendredi: [],
    samedi: [],
  });
  const [currentDBSchedule, setCurrentDBSchedule] = useState({});
  const [loading, setLoading] = useState(true);

  // Récupération des horaires depuis la DB
  const fetchSchedule = async () => {
    try {
      const data = await getSchedule();
      const formattedData = data.reduce((acc, { day, hours }) => {
        acc[day] = hours;
        return acc;
      }, {});
      setCurrentDBSchedule(formattedData);
      setLoading(false);
    } catch (error) {
      toast.error("Erreur lors de la récupération des horaires.");
      setLoading(false);
    }
  };

  // Initialisation
  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await clearSchedules(); // Efface les horaires existants

      for (const day in schedule) {
        const hours = schedule[day];
        if (hours.length > 0) {
          await insertSchedule(day, hours); // Insère les nouveaux horaires
        }
      }

      toast.success("Les horaires ont été enregistrés avec succès !");
      fetchSchedule();
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des horaires.");
    }
  };

  const handleDeleteDaySchedule = async (day) => {
    try {
      await deleteDaySchedule(day);
      toast.success(`Les horaires pour ${day} ont été supprimés !`);
      fetchSchedule();
    } catch (error) {
      toast.error(`Erreur lors de la suppression des horaires pour ${day}.`);
    }
  };

  return (
    <div className="p-8">
      <Title title="Horraire d'arrêt" />

      {/* Affichage des horaires actuels dans la base de données */}
      <div className="p-4">
        <h2 className="text-lg font-semibold">
          Horaires actuels dans la base de données :
        </h2>
        <ul className="list-disc pl-5 mt-2">
          {Object.entries(currentDBSchedule).map(([day, hours], index) => (
            <li key={index} className="flex justify-between items-center">
              <span>
                {day}:{" "}
                {Array.isArray(hours)
                  ? hours.sort((a, b) => a - b).join(", ") // Trie les heures par ordre croissant
                  : "Aucune donnée"}
                h
              </span>
              <button
                onClick={() => handleDeleteDaySchedule(day)}
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded text-sm"
              >
                Supprimer les horaires
              </button>
            </li>
          ))}
        </ul>
      </div>

      <WeeklySchedule
        schedule={schedule}
        setSchedule={setSchedule}
        currentDBSchedule={currentDBSchedule}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Valider les horaires
      </button>
      <button
        onClick={async () => {
          try {
            await clearSchedules();
            toast.success("Tous les horaires ont été supprimés !");
            fetchSchedule();
          } catch (error) {
            toast.error("Erreur lors de la suppression de tous les horaires.");
          }
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Supprimer tous les horaires
      </button>
      <Toaster theme="dark" richColors position="top-center" expand />
    </div>
  );
};

export default ConfigPage;
