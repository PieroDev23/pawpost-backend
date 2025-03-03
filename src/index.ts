import "dotenv/config";
import { bodyParser } from "@koa/bodyparser";
import Router from "@koa/router";
import Koa from "koa";
import { db } from "./db";
import { sql } from "drizzle-orm";

const app = new Koa();
const router = new Router({
  prefix: "/live",
});

/**
 * Middlewares
 */
app.use(bodyParser());

/**
 * Health route
 */
router.get("/health", async ({ response }) => {
  try {
    (await db.getDb()).execute(sql`SELECT version()`);
    response.body = {
      msg: "healty app, everything its working!",
    };
  } catch (error) {
    if (error instanceof Error) {
      response.body = {
        msg: "unhealthy app, something went wrong",
      };
    }
  }
});

if (process.env.ENVIROMENT !== "development") {
  app.listen(3000);
  console.log("application running on port 3000");
} else {
  // setup serverless lambda
  // const cb = app.callback();
}
