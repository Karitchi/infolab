const { PostgreSqlContainer } = require("@testcontainers/postgresql");
const {
  getSchedule,
  insertSchedule,
  clearSchedules,
  deleteDaySchedule,
} = require("../serverActionEndpoint");

describe("serverActionEndpoint", () => {
  let pgContainer;
  let dbConfig;

  beforeAll(async () => {
    // Démarrer le conteneur PostgreSQL
    pgContainer = await new PostgreSqlContainer()
      .withDatabase("testdb")
      .withUsername("testuser")
      .withPassword("testpassword")
      .start();

    dbConfig = {
      connectionString: pgContainer.getConnectionUri(),
    };

    process.env.PG_CONNECTION_STRING = dbConfig.connectionString;

    // Initialiser la table
    const { pgQuery } = require("../database");
    await pgQuery(
      `
      CREATE TABLE IF NOT EXISTS raspberry_schedules (
        schedule_id SERIAL PRIMARY KEY,
        day VARCHAR(10) UNIQUE NOT NULL,
        hours INT[] NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `,
    );
  });

  afterAll(async () => {
    // Arrêter le conteneur PostgreSQL
    await pgContainer.stop();
  });

  beforeEach(async () => {
    // Nettoyer la table avant chaque test
    await clearSchedules();
  });

  test("should insert and retrieve a schedule", async () => {
    const day = "lundi";
    const hours = [8, 12, 16]; // Tableau d'entiers

    await insertSchedule(day, hours);

    const schedules = await getSchedule();
    expect(schedules).toEqual([{ day: "lundi", hours }]);
  });

  test("should update an existing schedule", async () => {
    const day = "mardi";
    const initialHours = [9, 13];
    const updatedHours = [10, 14];

    await insertSchedule(day, initialHours);
    await insertSchedule(day, updatedHours);

    const schedules = await getSchedule();
    expect(schedules).toEqual([{ day: "mardi", hours: updatedHours }]);
  });

  test("should clear all schedules", async () => {
    await insertSchedule("mercredi", [7, 11]);
    await insertSchedule("jeudi", [8, 12]);

    await clearSchedules();

    const schedules = await getSchedule();
    expect(schedules).toEqual([]);
  });

  test("should delete a specific day schedule", async () => {
    const day = "vendredi";
    const hours = [8, 12];

    await insertSchedule(day, hours);
    await deleteDaySchedule(day);

    const schedules = await getSchedule();
    expect(schedules).toEqual([]);
  });

  test("should handle empty schedules gracefully", async () => {
    const schedules = await getSchedule();
    expect(schedules).toEqual([]);
  });
});
