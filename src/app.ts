import { bodyParser } from "@koa/bodyparser";
import Router from "@koa/router";
import "dotenv/config";
import Koa from "koa";

export default class App {
  app: Koa;

  constructor() {
    this.app = new Koa();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(bodyParser());
  }

  routes() {
    const router = new Router({
      prefix: "/live",
    });

    router.get("/health", async ({ response }) => {
      response.body = {
        ok: true,
        message: "GOOD",
      };
    });
  }

  async dbConnection() {}

  run() {
    const port = process.env.APP_PORT;
    this.app.listen(port, () => {
      console.log(`✅ Application running on port ${port}.`);
    });
  }
}
