import pg from "pg";
const { Pool } = pg;

const db = new Pool({
  user: "tmsdb_stli_user",
  password: "e9xMpaWVMWOG6mepVfFQd8uY6XaUDv4F",
  host: "dpg-cof58cocmk4c7380j3l0-a.oregon-postgres.render.com",
  database: "tmsdb_stli",
  ssl: true,
});

let client;

export const dbConnect = async () => {
  if (client) return client;
  client = await db.connect();
  return client;
};

// setTimeout(() => {
//   if (client) client.end()
// }, 10000)
