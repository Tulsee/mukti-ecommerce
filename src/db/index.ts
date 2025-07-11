import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const checkDbConnection = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully.");
    client.release();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

export const db = drizzle(pool, { schema });

export { pool };
