import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import signToken from "../middleware/auth";
import { getProfile } from "../controller/user/user.controller";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/profile",
    preHandler: [signToken],
    handler: getProfile.handler,
  },
];

const userRouter = (app: FastifyInstance) => {
  router(app, routes, "/user");
};

export { userRouter };
