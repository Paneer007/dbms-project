import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import checkLoggedIn from "../middleware/auth";
import {
  banProfile,
  unBanProfile,
  closeQuestion,
} from "../controller/admin/admin.controller";

const routes: RouteOptions[] = [
  {
    method: "POST",
    url: "/banprofile",
    preHandler: [checkLoggedIn],
    handler: banProfile.handler,
  },
  {
    method: "POST",
    url: "/unbanprofile",
    preHandler: [checkLoggedIn],
    handler: unBanProfile.handler,
  },
  {
    method: "POST",
    url: "/closequestion",
    preHandler: [checkLoggedIn],
    handler: closeQuestion.handler,
  },
];

const adminRouter = (app: FastifyInstance) => {
  router(app, routes, "/admin");
};

export { adminRouter };
