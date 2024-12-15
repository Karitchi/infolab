"use server";

import { pgQuery } from "./database";

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

export const deleteDaySchedule = async (day) => {
  const query = `DELETE FROM raspberry_schedules WHERE day = $1`;
  const values = [day];
  await pgQuery(query, values);
};

// gathering our information
export const getSchedule = async () => {
  const query = `SELECT day, hours FROM raspberry_schedules`;
  const result = await pgQuery(query);
  return result.rows;
};

export const fetchAllSchedules = async () => {
  const query = `
    SELECT day, hours 
    FROM raspberry_schedules
  `;
  const result = await pgQuery(query);
  return result.rows.reduce((acc, { day, hours }) => {
    acc[day] = hours;
    return acc;
  }, {});
};
