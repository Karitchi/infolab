"use server";
import { pgQuery } from "./database";

const isFormDataValid = (formData) => {
  const requiredFields = ["title", "body", "author"];
  for (const field of requiredFields) {
    if (!formData.get(field)) {
      console.error(`The '${field.slice()}' field is required`);
      return false;
    }
  }
  return true;
};

const addFormDataToDatabase = async (formData) => {
  pgQuery(
    "INSERT INTO announcements (user_id, title, body, author) VALUES ($1, $2, $3, $4)",
    [1, formData.get("title"), formData.get("body"), formData.get("author")]
  );
};

export async function addAnnoucement(formData) {
  if (!isFormDataValid(formData)) {
    return;
  }

  try {
    await addFormDataToDatabase(formData);
    console.log("New announcement added to the database");
    return { success: true };
  } catch (error) {
    console.error("Failed to add new announcement to the database");
    return { success: false, error };
  }
}
