"use client";

import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { getAnnouncements } from "../lib/getAnnouncements";
import {
  fetchComponentVisibility,
  toggleComponentVisibility,
} from "../lib/serverActionVisibility";
import Button from "../ui/Button";

const VisibilityPage = () => {
  const [components, setComponents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisibilityData = async () => {
    const visibilityData = await fetchComponentVisibility();
    setComponents(visibilityData.sort((a, b) => a.order_index - b.order_index));
  };

  const fetchAnnouncements = async () => {
    const announcementsData = await getAnnouncements();
    setAnnouncements(announcementsData);

    // Si aucune annonce, rendre "Announcements" invisible
    if (announcementsData.length === 0) {
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.component_name === "Announcements"
            ? { ...component, is_visible: false }
            : component
        )
      );
    }
  };

  const handleToggleVisibility = async (id, isVisible, component_name) => {
    if (
      component_name === "Announcements" &&
      !isVisible &&
      announcements.length === 0
    ) {
      toast.error(
        "Impossible d'afficher 'Announcements' : aucune annonce n'est disponible."
      );
      return;
    }

    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id
          ? { ...component, is_visible: !isVisible }
          : component
      )
    );

    await toggleComponentVisibility(id, !isVisible);
  };

  // polling for our data
  useEffect(() => {
    const loadData = async () => {
      await fetchVisibilityData();
      await fetchAnnouncements();
      setLoading(false);
    };
    loadData();

    const interval = setInterval(fetchAnnouncements, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="p-8 bg-gradient-to-b from-blue-900 to-blue-700 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Gestion de Visibilité</h1>

      {/* Gestion de Visibilité */}
      <div>
        <ul>
          {components.map(({ id, component_name, is_visible }) => (
            <li
              key={id}
              className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <span className="text-lg font-semibold text-gray-700">
                {component_name}
              </span>
              <Button
                onClick={() =>
                  handleToggleVisibility(id, is_visible, component_name)
                }
                isVisible={is_visible}
              >
                {is_visible ? "Rendre invisible" : "Rendre visible"}
              </Button>
            </li>
          ))}
        </ul>
      </div>

      {/* Gestion des Annonces */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Gestion Annonces</h2>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          {announcements.length > 0 ? (
            <ul>
              {announcements.map(({ announcement_id, title, body, author }) => (
                <li
                  key={announcement_id}
                  className="flex justify-between items-center mb-4 bg-gray-200 p-4 rounded shadow"
                >
                  <div>
                    <p className="font-bold">{title}</p>
                    <p className="text-sm">{body}</p>
                    <p className="text-xs text-gray-500">Auteur : {author}</p>
                  </div>
                  {/* Bouton placeholder */}
                  <Button onClick={() => {}}>Gérer</Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Aucune annonce disponible.</p>
          )}
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default VisibilityPage;
