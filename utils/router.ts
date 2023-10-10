import { FastifyInstance, RouteOptions } from "fastify";

const router = (app: FastifyInstance, routes: RouteOptions[], path: string) => {
  routes.forEach((route) => {
    route.url = path + route.url;
    app.route(route);
  });
};

export default router;
