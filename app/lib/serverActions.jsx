"use server";
import { pgQuery } from "./database";
import Joi from "joi";

// Define your validation schema
const schema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  body: Joi.string().min(1).max(1000).required(),
  author: Joi.string().min(1).max(255).required(),
});

const addFormDataToDatabase = async (formData) => {
  await pgQuery(
    "INSERT INTO announcements (user_id, title, body, author) VALUES ($1, $2, $3, $4)",
    [1, formData.get("title"), formData.get("body"), formData.get("author")]
  );
};

export async function addAnnouncement(currentState, formData) {
  try {
    await schema.validateAsync(
      {
        title: formData.get("title"),
        body: formData.get("body"),
        author: formData.get("author"),
      },
      {
        abortEarly: false, // Return all errors
      }
    );
  } catch (error) {
    return { success: false, error: error.details };
  }

  try {
    await addFormDataToDatabase(formData);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.details };
  }
}
