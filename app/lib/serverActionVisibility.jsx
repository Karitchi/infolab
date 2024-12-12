"use server";

import { pgQuery } from "@/app/lib/database";

export const initializeComponents = async () => {
  const query = `
    INSERT INTO component_visibility (component_name, is_visible)
    VALUES
      ('Weather', true),
      ('Announce', true),
      ('Schedule', true)
    ON CONFLICT (component_name) DO NOTHING;
  `;
  await pgQuery(query);
};

export const fetchComponentVisibility = async () => {
  await initializeComponents();

  const query = `
    SELECT id, component_name, is_visible
    FROM component_visibility
    ORDER BY created_at ASC;
  `;
  const result = await pgQuery(query);
  return result.rows;
};

export const toggleComponentVisibility = async (id, isVisible) => {
  const query = `
    UPDATE component_visibility
    SET is_visible = $1
    WHERE id = $2;
  `;
  await pgQuery(query, [isVisible, id]);
};

export const insertComponent = async (componentName, parentId = null) => {
  const query = `
    INSERT INTO component_visibility (component_name, parent_id)
    VALUES ($1, $2)
    ON CONFLICT (component_name) DO NOTHING;
  `;
  await pgQuery(query, [componentName, parentId]);
};

export const updateComponentOrder = async (order) => {
  const query = `
      UPDATE component_visibility
      SET order_index = $1
      WHERE id = $2
    `;
  for (const { id, order_index } of order) {
    await pgQuery(query, [order_index, id]);
  }
};
