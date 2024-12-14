"use server";
import { pgQuery } from "@/app/lib/database";
import Joi from "joi";

// Validation schema
const schema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  body: Joi.string().min(1).max(1000).required(),
  author: Joi.string().min(1).max(255).required(),
});

// Insert form data into the database
const addFormDataToDatabase = async (formData) => {
  const query = `
    INSERT INTO announcements (user_id, title, body, author)
    VALUES ($1, $2, $3, $4)
  `;
  const params = [
    1,
    formData.get("title"),
    formData.get("body"),
    formData.get("author"),
  ];
  await pgQuery(query, params);
};

// Handle announcement submission
export async function addAnnouncement(currentState, formData) {
  try {
    console.log("hello");
    // Validate form data
    await schema.validateAsync(
      {
        title: formData.get("title"),
        body: formData.get("body"),
        author: formData.get("author"),
      },
      { abortEarly: false } // Collect all errors
    );

    // Add the validated data to the database
    await addFormDataToDatabase(formData);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.details };
  }
}

export async function deleteAnnouncement(announcementId, event) {
  try {
    const query = `
      DELETE FROM announcements
      WHERE announcement_id = $1
    `;
    const params = [announcementId];
    await pgQuery(query, params);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.details };
  }
}
