import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "infolab" | process.env.PGUSER,
  password: "infolab" | process.env.PGPASSWORD,
  host: "infolab-postgres-1" | process.env.PGHOST,
  port: 5432 | process.env.PGPORT,
  database: "infolab" | process.env.PGDATABASE,
});

export const testDbConnection = async () => {
  const green = "\x1b[32m";
  const red = "\x1b[31m";
  const blue = "\x1b[34m";
  const reset = "\x1b[0m";

  try {
    console.log(`${blue}Trying to connect to the database...${reset}`);
    const client = await pgConnect();
    const res = await client.query("SELECT NOW()");
    console.log(`${green}Successfully connected to the database.${reset}`);
    client.release();
  } catch (error) {
    console.error(`${red}Failed to connect to the database: ${error.message}${reset}`);
    process.exit(1);
  }
};

export const pgQuery = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("executed query", { text, duration, rows: res.rowCount });
  return res;
};

export const pgConnect = async () => {
  const client = await pool.connect();
  const query = client.query;
  const release = client.release;
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error("A client has been checked out for more than 5 seconds!");
    console.error(
      `The last executed query on this client was: ${client.lastQuery}`
    );
  }, 5000);
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args;
    return query.apply(client, args);
  };
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout);
    // set the methods back to their old un-monkey-patched version
    client.query = query;
    client.release = release;
    return release.apply(client);
  };
  return client;
};
