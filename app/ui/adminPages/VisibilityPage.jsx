"use client";

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { getAnnouncements } from "../../lib/getAnnouncements";
import {
  fetchComponentVisibility,
  toggleComponentVisibility,
  updateComponentOrder,
} from "../../lib/serverActionVisibility";
import Announce from "../announcements/display/AnnouncementsDisplay";

import Button from "../../ui/Button";
import Schedule from "../../ui/Schedule";
import { SortableItem } from "../../ui/SortableItem"; // On crée un composant réutilisable pour chaque élément triable
import Weather from "../../ui/Weather";
import Dashboard from "../../ui/Dashboard";
import Title from "../../ui/Title";

const VisibilityPage = () => {
  const [components, setComponents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fonction pour charger les annonces
  const fetchAnnouncements = async () => {
    const announcementsData = await getAnnouncements();
    setAnnouncements(announcementsData);

    if (announcementsData.length === 0) {
      setComponents((prevComponents) =>
        prevComponents.map((component) =>
          component.component_name === "Announce"
            ? { ...component, is_visible: false }
            : component,
        ),
      );
    }
  };

  // Charger la visibilité des composants
  const fetchVisibilityData = async () => {
    const visibilityData = await fetchComponentVisibility();
    setComponents(visibilityData.sort((a, b) => a.order_index - b.order_index));
  };

  // Basculer la visibilité
  const handleToggleVisibility = async (id, isVisible, component_name) => {
    if (
      component_name === "Announce" &&
      !isVisible &&
      announcements.length === 0
    ) {
      toast.error(
        "Impossible d'afficher 'Announce' : aucune annonce n'est disponible. Vous pouvez ajouter une annonce depuis le panneau admin.",
      );
      return;
    }

    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id
          ? { ...component, is_visible: !isVisible }
          : component,
      ),
    );

    await toggleComponentVisibility(id, !isVisible);
  };

  // Réorganiser la liste via drag-and-drop
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = components.findIndex((item) => item.id === active.id);
    const newIndex = components.findIndex((item) => item.id === over.id);

    const updatedComponents = arrayMove(components, oldIndex, newIndex);

    // Réassigner les order_index
    updatedComponents.forEach((comp, idx) => {
      comp.order_index = idx;
    });

    setComponents(updatedComponents);

    // Mettre à jour l'ordre dans la base
    await Promise.all(
      updatedComponents.map((comp) =>
        updateComponentOrder(comp.id, comp.order_index),
      ),
    );
  };

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

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Déplace la souris d'au moins 5px avant de déclencher le drag-and-drop
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Gestion des actions clavier pour les boutons
  const handleKeyPress = (event, action) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // Évite les comportements par défaut
      action();
    }
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <div className="p-8 flex flex-col flex-grow text-white">
      <Title title="Gestion de Visibilité" />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={components.map((item) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className="flex flex-col flex-grow">
            {components.map(({ id, component_name, is_visible }, index) => (
              <SortableItem key={id} id={id}>
                <li className="flex flex-col flex-grow items-center mb-4 bg-gray-100 p-4 rounded-lg shadow-md">
                  {/* Header avec bouton et actions */}
                  <div className="w-full flex flex-col items-center">
                    <div className="flex flex-col items-center gap-4">
                      <span className="text-lg flex flex-col font-semibold text-gray-700">
                        {component_name}
                      </span>
                      <div className="flex gap-1">
                        {index > 0 && (
                          <button
                            className="text-sm text-gray-500 hover:text-gray-800"
                            onClick={() =>
                              handleDragEnd({
                                active: { id },
                                over: { id: components[index - 1].id },
                              })
                            }
                            onKeyDown={(event) =>
                              handleKeyPress(event, () =>
                                handleDragEnd({
                                  active: { id },
                                  over: { id: components[index - 1].id },
                                }),
                              )
                            }
                          >
                            ↑ Monter
                          </button>
                        )}
                        {index < components.length - 1 && (
                          <button
                            className="text-sm text-gray-500 hover:text-gray-800"
                            onClick={() =>
                              handleDragEnd({
                                active: { id },
                                over: { id: components[index + 1].id },
                              })
                            }
                            onKeyDown={(event) =>
                              handleKeyPress(event, () =>
                                handleDragEnd({
                                  active: { id },
                                  over: { id: components[index + 1].id },
                                }),
                              )
                            }
                          >
                            ↓ Descendre
                          </button>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        handleToggleVisibility(id, is_visible, component_name)
                      }
                      onKeyDown={(event) =>
                        handleKeyPress(event, () =>
                          handleToggleVisibility(
                            id,
                            is_visible,
                            component_name,
                          ),
                        )
                      }
                      isVisible={is_visible}
                    >
                      {is_visible ? "Rendre invisible" : "Rendre visible"}
                    </Button>
                  </div>

                  {/* Rendu conditionnel des composants en "thumbnail" */}
                  {/* {is_visible && (
                    <div className="mt-4 w-full h-48 overflow-hidden bg-white rounded-lg shadow-lg flex justify-center items-center">
                      <div className="thumbnail">
                        {component_name === "Weather" && <Weather />}
                        {component_name === "Schedule" && <Schedule />}
                        {component_name === "Announce" && <Announce />}
                        {component_name === "Dashboard" && <Dashboard />}
                      </div>
                    </div>
                  )} */}
                </li>
              </SortableItem>
            ))}
          </ul>
        </SortableContext>
      </DndContext>

      <Toaster />
    </div>
  );
};
export default VisibilityPage;
