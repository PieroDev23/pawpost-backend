import serverlessExpress from "@codegenie/serverless-express";
import { bodyParser } from "@koa/bodyparser";
import Router from "@koa/router";
import Koa from "koa";
import morgan from "koa-morgan";

const pawpost = new Koa();
const router = new Router({
  prefix: "/live",
});

// middlewares
pawpost.use(bodyParser());
pawpost.use(morgan("dev"));

// routes
router.get("/health", (ctx) => {
  ctx.response.body = {
    ok: true,
    msg: "all good :)",
  };
});

// finish setup
pawpost.use(router.routes());

// serverless
const app = pawpost.callback();
export const handler = serverlessExpress({ app });
