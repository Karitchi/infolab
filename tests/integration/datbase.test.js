const fs = require("fs");
const path = require("path");
const { PostgreSqlContainer } = require("testcontainers");
const { Pool } = require("pg");
const fetch = require("node-fetch");


//creation de notre docker de test avec Testcontainer (copie de notre db)
describe("API Integration Tests", () => {
  let postgresContainer;
  let pool;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer()
      .withDatabase("infolab")
      .withUsername("infolab")
      .withPassword("infolab")
      .withExposedPorts(5433)
      .start();

    pool = new Pool({
      host: postgresContainer.getHost(),
      port: postgresContainer.getMappedPort(5432),
      user: "infolab",
      password: "infolab",
      database: "infolab",
    });

    const initDbPath = path.resolve(__dirname, "../../initialize_db.sql");
    const initDbSql = fs.readFileSync(initDbPath, "utf-8");
    try {
      await pool.query(initDbSql);
    } catch (error) {
      console.error("Erreur lors de l'exécution de initialize_db.sql:", error);
      throw error;
    }
  });

  afterAll(async () => {
    await pool.end();
    await postgresContainer.stop();
  });

  //test d'integration; il vérifie que tout est ok pour l'api get et qu'il récupere correctement les données
  it("should return a valid schedule JSON", async () => {
    try {
      const insertQuery = `
        INSERT INTO raspberry_schedules (day, hours)
        VALUES 
          ('mardi', '{8}'),
          ('mercredi', '{9}'),
          ('jeudi', '{10,12}'),
          ('samedi', '{14,16}');
      `;
      await pool.query(insertQuery);
    } catch (error) {
      console.error("Erreur lors de l'insertion des données de test:", error);
      throw error;
    }

    try {
      const apiResponse = await fetch("http://localhost:3000/api/raspberry-schedule");
      expect(apiResponse.status).toBe(200)
      const data = await apiResponse.json();

      console.log("API Response Data:", data);
      const validDays = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
      const validHours = (hours) => hours.every((hour) => hour >= 8 && hour <= 17);

      data.forEach((entry) => {
        expect(Object.keys(entry)).toEqual(["day", "hours"]);
        expect(validDays).toContain(entry.day);
        expect(validHours(entry.hours)).toBe(true);
      });
    } catch (error) {
      console.error("Erreur lors de l'appel API ou de la validation:", error);
      throw error;
    }
  });
});
