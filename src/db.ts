import "dotenv/config";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const db = {
  async getDb(): Promise<NodePgDatabase> {
    const pool = new Pool({
      host: "localhost",
      database: "pawpost",
      user: process.env.DB_USER || "",
      password: process.env.DB_PASSWORD || "",
    });
    return drizzle(pool, { logger: false });
  },
};
