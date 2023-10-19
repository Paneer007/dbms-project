import { FastifyInstance, RouteOptions } from "fastify";
import router from "../utils/router";
import signToken from "../middleware/auth";
import {
  dummyUser,
  getUsers,
  postQuestion,
} from "../controller/user/user.controller";

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/dummy",
    //  preHandler: [signToken],
    handler: dummyUser.handler,
  },
];

const userRouter = (app: FastifyInstance) => {
  router(app, routes, "/user");
};

export { userRouter };
