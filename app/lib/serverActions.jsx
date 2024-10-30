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

export async function addAnnouncement(formData) {
  try {
    // Validate the form data
    const validatedData = await schema.validateAsync(
      {
        title: formData.get("title"),
        body: formData.get("body"),
        author: formData.get("author"),
      },
      {
        abortEarly: false, // Optional: allows all validation errors to be collected
      }
    );

    // Proceed with adding the announcement to the database
    await addFormDataToDatabase(formData);

    console.log("New announcement added to the database");
    return { success: true };
  } catch (error) {
    // Handle validation errors
    if (error.isJoi) {
      console.error("Validation Error:", error.details);
      return { success: false, errors: error.details };
    }

    // Handle other errors (like database errors)
    console.error("Failed to add new announcement to the database", error);
    return { success: false, error };
  }
}
