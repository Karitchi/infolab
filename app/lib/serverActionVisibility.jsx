"use server";

import { pgQuery } from "./database";
import { getAnnouncements } from "./getAnnouncements";

// Initialisation des composants si la table est vide
export const initializeComponents = async () => {
  const result = await pgQuery("SELECT COUNT(*) FROM component_visibility;");
  const isTableEmpty = parseInt(result.rows[0].count, 10) === 0;

  if (isTableEmpty) {
    const announcements = await getAnnouncements();
    const hasAnnouncements = announcements.length > 0;

    const query = `
      INSERT INTO component_visibility (component_name, is_visible, order_index)
      VALUES
        ('Announce', $1, 1),
        ('Dashboard', true, 2),
        ('Schedule', true, 4),
        ('Calendar', true, 3);
    `;
    await pgQuery(query, [hasAnnouncements]);
  }
};

// Récupération des composants avec un tri par order_index
export const fetchComponentVisibility = async () => {
  await initializeComponents();

  const query = `
    SELECT id, component_name, is_visible, order_index
    FROM component_visibility
    ORDER BY order_index ASC;
  `;
  const result = await pgQuery(query);
  return result.rows;
};

// Basculer la visibilité d'un composant
export const toggleComponentVisibility = async (id, isVisible) => {
  const query = `
    UPDATE component_visibility
    SET is_visible = $1
    WHERE id = $2;
  `;
  await pgQuery(query, [isVisible, id]);
};

// Mettre à jour l'ordre des composants
export const updateComponentOrder = async (id, newIndex) => {
  // Récupérer les composants pour recalculer les indices
  const query = `
    SELECT id
    FROM component_visibility
    ORDER BY order_index ASC;
  `;
  const result = await pgQuery(query);

  const components = result.rows;
  const currentIndex = components.findIndex((comp) => comp.id === id);

  if (currentIndex === -1) return; // Composant introuvable

  // Échanger les positions localement
  const [movedComponent] = components.splice(currentIndex, 1);
  components.splice(newIndex, 0, movedComponent);

  // Mettre à jour les order_index dans la base
  const updateQueries = components.map((comp, index) =>
    pgQuery(`UPDATE component_visibility SET order_index = $1 WHERE id = $2;`, [
      index,
      comp.id,
    ])
  );

  await Promise.all(updateQueries);
};
