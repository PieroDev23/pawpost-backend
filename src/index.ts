import PawPostApp from "./app";
import serverlessExpress from "@codegenie/serverless-express";

const pawpostApp = new PawPostApp();
const app = pawpostApp.app.callback();

pawpostApp.run();

// setup the lambda code
export const handler = serverlessExpress({ app });
