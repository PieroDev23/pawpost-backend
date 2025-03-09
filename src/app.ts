import "dotenv/config";
import { bodyParser } from "@koa/bodyparser";
import Router from "@koa/router";
import Koa from "koa";
import morgan from "koa-morgan";

export default class App {
  app: Koa;
  router: Router;

  constructor() {
    this.app = new Koa();
    this.router = new Router({
      prefix: "/live",
    });

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(bodyParser());
    this.app.use(morgan("dev"));
    this.app.use(this.router.routes());
  }

  routes() {
    this.router.get("/health", async ({ response }) => {
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
