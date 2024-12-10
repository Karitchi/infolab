"use server";

import { pgQuery } from "@/app/lib/database";

// gathering our information
export const getUser = async () => {
    const query = `SELECT email, password FROM users`;
    const result = await pgQuery(query);
    return result.rows;
};