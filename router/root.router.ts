import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import { ping } from "../controller/user/user.controller";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/ping",
    handler: ping.handler,
  },
];

const rootRouter = (app: FastifyInstance) => {
  router(app, routes, "");
};

export { rootRouter };
