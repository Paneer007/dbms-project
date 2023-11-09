// Import the framework and instantiate it
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import { fastify, FastifyInstance } from "fastify";
import config from "./config/config";
import { connectSQLDatabase } from "./database/mysql";
import connectMongoDatabase from "./database/mongo";
import { rootRouter } from "./router/root.router";
import { userRouter } from "./router/user.router";
import { questionRouter } from "./router/question.router";
import { adminRouter } from "./router/admin.router";
import cors from "@fastify/cors";

const app: FastifyInstance = fastify({});

app.register(cors, {
  origin: "*",
});

// connecting Mongo
connectMongoDatabase("dbms_project", config.mongodburi);
connectSQLDatabase();

rootRouter(app);
userRouter(app);
questionRouter(app);
adminRouter(app);

app.listen({ port: config.port, host: config.host }, (): void => {
  console.log(`Server running at http://localhost:${config.port}`);
});
