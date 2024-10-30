import { pgQuery } from "../lib/database";

export async function addAnnouncementToDatabase(formData) {
  const { title, description, author } = formData;

  try {
    const result = await pgQuery(
      "INSERT INTO announcements (title, description, author) VALUES ($1, $2, $3) RETURNING *",
      [title, description, author]
    );
    return result.rows[0]; // Return the newly created announcement
  } catch (error) {
    console.error("Database error:", error);
    throw new Error("Could not save announcement");
  }
}
