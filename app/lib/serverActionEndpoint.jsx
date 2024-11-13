"use server";

import { pgQuery } from "@/app/lib/database";

// adding the user's inpute into the data base
export const insertSchedule = async (day, hours) => {
  const query = `
    INSERT INTO raspberry_schedules (day, hours)
    VALUES ($1, $2)
    ON CONFLICT (day) DO UPDATE
    SET hours = EXCLUDED.hours;
  `;
  const params = [day, hours];
  await pgQuery(query, params);
};

//reset our table raspberry_schedules
export const clearSchedules = async () => {
  const query = `DELETE FROM raspberry_schedules`;
  await pgQuery(query);
};

// gathering our information
export const getSchedule = async () => {
  const query = `SELECT day, hours FROM raspberry_schedules`;
  const result = await pgQuery(query);
  return result.rows;
};
