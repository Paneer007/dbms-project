// Import the framework and instantiate it
import { fastify, FastifyInstance } from "fastify";
import fastifyStatic from "@fastify/static";
import config from "./config/config";
import { db, connectSQLDatabase } from "./database/mysql";
import connectMongoDatabase from "./database/mongo";
import { rootRouter } from "./router/root.router";

const app: FastifyInstance = fastify({
  logger: config.logger,
});

// connecting Mongo
connectMongoDatabase("dbms_project", config.mongodburi);
connectSQLDatabase();

rootRouter(app);

app.listen({ port: config.port, host: config.host }, (): void => {
  console.log(`Server running at http://localhost:${config.port}`);
});
