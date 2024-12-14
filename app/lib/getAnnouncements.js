"use server";

import { pgQuery } from "@/app/lib/database";

export async function getAnnouncements() {
  const query = `
    SELECT announcement_id, title, body, author
    FROM announcements
  `;
  const { rows } = await pgQuery(query);
  return rows;
}
